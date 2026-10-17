# Roadmap

## Phase 0 — Design lock (this repository)

- Write component boundaries and invariants.
- Keep architecture diagrams in source control.
- Define test vectors and success semantics.

**Exit gate:** reviewers agree on contracts, audit semantics, authority boundaries, and the difference between recovery and history rewriting.

## Phase 1 — Deterministic control skeleton

- Run state machine, mission contract, event ledger, budget envelope.
- Mock executor and deterministic verifier.
- Cancellation, timeouts, policy denies, and approval pauses.

**Exit gate:** state-transition and policy tests pass with no model calls required.

## Phase 2 — Planner and decision diagnosis

- Add Itachi and Shisui behind typed provider adapters.
- Require schema-validated outputs, explicit assumptions, and alternatives.
- Add a replay dataset.

**Exit gate:** held-out evaluation shows useful improvement over the baseline at an acceptable cost.

## Phase 3 — KOTO intervention proposals

- Add transparent evidence/reframing/option-expansion workflow.
- Add owner approval and intervention outcome measurement.
- Reject covert manipulation and refusal bypass in adversarial tests.

**Exit gate:** approval and agency guarantees are enforced by code, not prompt text alone.

## Phase 4 — Izanami and Izanagi

- Exact and semantic recurrence signals.
- Progress-delta tracking and oscillation detection.
- Checkpoint/compensation/reconstruction workflow with post-recovery verification.

**Exit gate:** repeated-failure benchmarks and recovery drills meet agreed thresholds; audit integrity holds.

## Phase 5 — Controlled pilot

- Start in read-only/dry-run mode.
- Enable low-risk reversible writes behind narrow allowlists.
- Add operational dashboards, incident runbooks, and cost monitoring.
- Require human approval for higher-impact actions.

**Exit gate:** security, reliability, privacy, and human-approval reviews pass.

## Phase 6 — Scale only when justified

Consider separate worker processes, durable queues, or event-driven deployment only when measured throughput, isolation, or recovery requirements justify added complexity.
