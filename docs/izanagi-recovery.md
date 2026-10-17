# Izanagi — Controlled Recovery and Reconstruction

## Purpose

Izanagi is the recovery counterpart to Izanami. Where Izanami exposes a repeated or contradictory path, Izanagi restores the ability to make progress by choosing among a verified checkpoint, an approved compensation, or a reconstructed plan based on the actual current state.

The analogy is intentionally constrained: the system must never alter the audit record or rewrite observed reality to make a plan appear successful.

## Recovery hierarchy

1. **Pause and freeze:** stop new side-effecting actions; allow already-issued actions to reconcile.
2. **Read the ledger:** establish the last verified state, outstanding operations, and uncertainty.
3. **Checkpoint restore:** use only if the checkpoint is valid, compatible with current external state, and restoration itself is safe.
4. **Compensation:** when rollback is impossible, perform approved compensating actions (for example, revoke a staged change or revert a deployment).
5. **Reconstruction:** rebuild the future plan from current verified state; preserve the old plan and failure evidence.
6. **Escalation:** ask a human to decide when state is ambiguous, recovery is irreversible, or policy requires approval.
7. **Safe termination:** stop and report what is known when no safe recovery path exists.

## Recovery object

A `RecoveryPlan` should include:

- trigger and Izanami evidence;
- target checkpoint and its provenance;
- current observed state and differences from the checkpoint;
- actions to cancel, reconcile, restore, or compensate;
- data-loss or side-effect risk;
- approval requirements;
- post-recovery verification predicate;
- alternative if recovery fails;
- owner and expiry.

## Yin-yang relationship: Izanami + Izanagi

| Izanami — constraint | Izanagi — reconstruction |
|---|---|
| Says “this path is repeating or contradicted by reality” | Says “here is a safe way to resume from verified reality” |
| Prevents denial, spin, and infinite retries | Prevents one failure from becoming permanent paralysis |
| Requires a changed hypothesis or justified stop | Requires a checkpoint/compensation/replan with explicit risk |
| Preserves negative evidence | Preserves the old history while creating a new branch of action |

The two form a single control cycle: **detect → pause → reconcile → recover → verify → resume or stop**.

## Invariants

- Audit records are append-only or versioned, never rewritten by the recovering agent.
- A rollback is not complete until independent evidence verifies the resulting external state.
- Recovery cannot broaden permissions or reset budgets without the governing policy allowing it.
- A failed recovery transitions to escalation or safe stop; it does not recurse forever.
