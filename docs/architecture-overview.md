# Architecture Overview

## 1. System shape

The recommended first implementation is a **modular orchestrator** with independently testable roles. Keep agent reasoning separate from authority to execute actions. A role may initially be a prompt/model call in one process; it does not need to become a separately deployed microservice.

### Core roles

| Element | Responsibility | Must not do |
|---|---|---|
| Mission Contract | Defines objective, scope, success evidence, constraints, deadline, budget, and stop conditions | Quietly change the objective mid-run |
| Runtime Governor | Owns state transitions, budgets, permissions, timeouts, approvals, cancellation, and stopping | Delegate its authority to an agent |
| Itachi | Models future states, dependencies, causal assumptions, action sequences, and contingencies | Treat a forecast as a fact or bypass policy |
| Shisui | Models decision state, conflicting goals, blockers, evidence gaps, and legitimate stakeholder constraints | Infer private motives as certainty or manipulate covertly |
| KOTO | Selects the least intrusive authorized intervention to improve decision quality | Hide intervention, impersonate consent, or override human agency |
| Executor | Runs approved, scoped tool actions with idempotency and observable outputs | Execute an unapproved high-impact action |
| Independent Verifier | Checks external outcome evidence against success criteria | Trust the executor's self-report as sole proof |
| Izanami | Detects exact repetition, semantic recurrence, oscillation, stagnation, and unsupported progress | Label every retry as failure without context |
| Izanagi | Restores a verified checkpoint or rebuilds a plan from current evidence; creates compensations where possible | Delete or rewrite history to pretend the failure never happened |
| Run Ledger | Stores assumptions, evidence references, interventions, approvals, actions, costs, outcomes, and recovery events | Store secrets or unnecessary private data |

## 2. Shared state

Agents coordinate through a typed **Run State**, not unconstrained shared memory. Each proposed action should include the objective it serves, its expected observation, its risk, and its authorization requirements. Every material claim records provenance and confidence.

Recommended state categories:

- `mission`: immutable goal contract and policy version for this run.
- `world_model`: current observations, dependencies, actors/systems, and confidence.
- `uncertainties`: assumptions, confidence, evidence needed, and invalidation conditions.
- `plan`: options, chosen strategy, expected outcomes, and contingency branches.
- `decision_state`: documented decision criteria, stated constraints, and known evidence gaps.
- `execution`: action intents, tool receipts, idempotency keys, and observed results.
- `recurrence`: recent action signatures, semantic plan signatures, oscillation markers, and progress evidence.
- `recovery`: checkpoint references, compensation options, restore status, and the revised hypothesis.
- `audit`: append-only event references.

## 3. Architectural boundaries

**Reasoning plane:** Itachi, Shisui, and KOTO propose models and choices.

**Execution plane:** The executor operates approved actions through narrowly scoped adapters.

**Control plane:** Runtime Governor, approval broker, policy engine, limits, cancellation, and rollback/compensation controls. The control plane must be independent of model-generated instructions.

**Evidence plane:** independent verifier plus append-only audit ledger. Evidence is referenced by hash/ID and origin; large payloads can stay in a controlled artifact store.

## 4. Operating cycle

1. Validate the mission contract and permissions.
2. Observe external reality; build an initial uncertainty ledger.
3. Itachi proposes a long-horizon plan with predicted outcomes and contingencies.
4. Shisui independently analyzes blockers and decision state, including whether a decision intervention is useful.
5. If needed, KOTO proposes a minimal, transparent intervention. The policy gate checks its authority and impact.
6. The governor selects only an allowed next action; high-impact actions pause for approval.
7. The executor acts, and the system captures external evidence.
8. The independent verifier evaluates the actual outcome.
9. Izanami checks for repetition, oscillation, stagnation, and unsupported progress.
10. If the path is stuck or the world diverges from expectations, Izanagi chooses a verified checkpoint/compensation/reconstruction path.
11. Replan with an explicit changed hypothesis, or request a human decision. Stop on verified success, a safe terminal failure, cancellation, or budget exhaustion.

## 5. Two deployment concepts

### Concept A — Single-process reference system (recommended first)

One orchestrator invokes typed modules sequentially, stores the run ledger, and calls tool adapters behind policy checks. This is easier to test, debug, and secure. Modules can be moved behind service boundaries later if scale or isolation demands it.

### Concept B — Event-driven multi-agent runtime

The roles become isolated workers coordinated through durable events and a state store. This offers stronger failure isolation and asynchronous work but introduces ordering, duplicate delivery, reconciliation, tracing, and more expensive coordination. Only adopt it after benchmarks show that the simple system is insufficient.

## 6. Non-goals

- Covert control of users or stakeholders.
- Agents modifying their own access controls or spending limits.
- Treating the Naruto narrative as scientific evidence.
- Infinite loops or autonomous persistence after cancellation.
- Replacing legal, safety, or human approval obligations with model confidence.
