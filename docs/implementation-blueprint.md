# Implementation Blueprint

## Recommended first stack

Start with a single-process TypeScript service and a durable relational state store. This keeps role contracts testable and avoids prematurely distributing the control loop. Use model/provider adapters behind interfaces; tool execution must be an allowlisted adapter layer. Add a queue only when tasks need durable asynchronous work.

Possible pieces (choose rather than blindly adding all):

- TypeScript runtime for typed orchestration and policy checks.
- PostgreSQL for run state, event metadata, and audit references.
- Object storage for larger evidence artifacts, content-addressed and access-controlled.
- OpenTelemetry-compatible tracing/metrics for per-run latency, cost, failures, and action outcomes.
- A queue for long-running jobs after single-process reliability limits are understood.

This is a proposed stack, not a claim that any external service is configured.

## Main interfaces

`src/contracts.ts` contains provider-neutral contracts for mission, evidence, plan, action, verifier result, recurrence result, recovery plan, and run state.

`src/policies.ts` contains deterministic starter rules for budget checks, exact recurrence, and basic safe-stop decisions. It is intentionally not an LLM or production policy engine.

## Orchestration pseudocode

```ts
async function runMission(mission: MissionContract) {
  const run = await store.createRun(mission);
  try {
    governor.validateMission(mission);
    while (!isTerminal(run.state)) {
      governor.assertWithinBudget(run);
      const observation = await observer.collect(mission.scope);
      await ledger.append({ type: 'OBSERVATION', payload: observation });

      const plan = await itachi.plan({ mission, run, observation });
      const diagnosis = await shisui.diagnose({ mission, plan, observation, run });
      const intervention = diagnosis.requiresIntervention
        ? await koto.propose({ diagnosis, mission, run })
        : undefined;

      const intent = governor.selectNextIntent({ plan, diagnosis, intervention });
      const decision = policy.authorize(intent, mission.policy);
      if (decision.kind === 'DENY') return await stopSafely(run, decision.reason);
      if (decision.kind === 'APPROVAL_REQUIRED') {
        return await pauseForHumanApproval(run, intent, decision);
      }

      const receipt = await executor.execute(intent, decision.scopedGrant);
      await ledger.append({ type: 'ACTION_RECEIPT', payload: receipt });
      const verification = await verifier.verify(mission.successPredicate, receipt, observation);
      await ledger.append({ type: 'VERIFICATION', payload: verification });
      if (verification.verified) return await commitSuccess(run, verification);

      const recurrence = izanami.evaluate(await ledger.recentWindow(run.id));
      if (recurrence.stagnant || recurrence.invariantViolated) {
        governor.pauseSideEffects(run);
        const recovery = await izanagi.proposeRecovery({ run, recurrence, ledger });
        const recoveryDecision = policy.authorizeRecovery(recovery, mission.policy);
        if (!recoveryDecision.allowed) return await escalateOrStop(run, recoveryDecision);
        await performAndVerifyRecovery(recovery, recoveryDecision);
      }
      await itachi.updateBeliefs({ observation, verification, recurrence });
    }
  } finally {
    await ledger.flush(run.id);
  }
}
```

This is design pseudocode; exact transaction boundaries, retries, data races, and error handling must be implemented and tested for a specific executor.

## Implementation sequence

1. Implement `MissionContract`, `RunState`, and append-only event storage.
2. Implement a deterministic governor state machine and dry-run executor.
3. Implement independent success predicates and evidence references.
4. Add Itachi planning; require assumptions and contingencies in schema.
5. Add Shisui diagnosis; require alternatives and evidence provenance.
6. Add KOTO only as transparent intervention proposals; enforce approvals externally.
7. Add Izanami action fingerprints, semantic similarity signal, and progress metrics.
8. Add Izanagi recovery planning, with a sandbox adapter before real writes.
9. Add trace collection, replay fixtures, fault injection, and budget accounting.
10. Benchmark quality and cost before moving roles into separate workers.

## Idempotency and uncertain outcomes

If a tool call times out, first query the tool or target system for actual status. Do not replay a non-idempotent action just because the response was lost. Use operation IDs and idempotency keys where supported. If the outcome cannot be reconciled, pause and escalate.
