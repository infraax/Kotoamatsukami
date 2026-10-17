# ADR 0001: Start with a Modular Orchestrator and Independent Control Plane

- **Status:** Proposed
- **Date:** 2026-10-17

## Context

The architecture has multiple reasoning roles plus loops for verifying progress, detecting recurrence, and recovering. Beginning with distributed workers adds message ordering, duplicate delivery, partial failure, and reconciliation problems before the usefulness of the roles has been established.

## Decision

Begin with a modular single-process orchestrator. Preserve explicit interfaces between Itachi, Shisui, KOTO, executor, verifier, Izanami, and Izanagi. Keep policy enforcement, budgets, approvals, and cancellation outside agent-generated instructions. Store a versioned or append-only run event ledger.

## Consequences

### Benefits

- Easier deterministic testing and replay.
- Clear separation between proposing an action and executing it.
- Lower operational overhead during evaluation.
- Straightforward tracing of the full loop.

### Costs

- A single runtime can become a throughput or isolation bottleneck.
- Long-running tasks need careful persistence and recovery behavior.

## Revisit when

Measured workload requires independent scaling or fault isolation and a durable queue/event bus can be introduced without weakening state and approval invariants.
