# Izanami — Recurrence, Stagnation, and Reality Acceptance

## Purpose

Izanami is the loop-detection and stagnation layer. It prevents an agent from mistaking repeated activity for progress. It is inspired by the fictional loop that cannot be exited merely by changing surface actions; the engineering translation is to make repeated failed assumptions visible and require a meaningful model update or an explicit stop.

## Signals

Detect at least four forms of non-progress:

1. **Exact recurrence:** same tool/action signature under the same relevant state.
2. **Semantic recurrence:** different wording, same intent, same preconditions, same failure.
3. **Oscillation:** cycling between strategies or state values without net improvement.
4. **Evidence-free progress:** completion claims change, but the external success predicate and evidence remain unchanged.

Additional signals can include retry storms, repeated schema repairs, repeated tool errors, stalled metrics, rising cost with flat outcomes, and contradictions between the world model and observations.

## Recurrence record

For each iteration retain:

- canonical action signature and normalized semantic intent;
- relevant precondition fingerprint;
- observed result and error class;
- evidence added or changed;
- progress metric delta;
- time/cost consumed;
- strategy/model version;
- next permitted response.

Do not rely on exact string matching alone. Semantic similarity is probabilistic, so combine it with deterministic state fingerprints, tool receipt IDs, and explicit progress metrics.

## State machine

- `CLEAR`: no repeated failure pattern detected; proceed under normal budget.
- `WATCH`: similar action is recurring; allow only a bounded retry if there is a justified change.
- `STAGNANT`: recurrence is material and no useful evidence/progress is appearing; stop the current strategy.
- `RECONCILE`: ask Izanagi to restore/rebuild from verified state.
- `ESCALATE`: request a human decision or end safely.

## What “accept reality” means operationally

The system must preserve observations that contradict its plan. It should update its belief, change its hypothesis, reduce scope, restore a checkpoint, or stop. It must not explain away conflicting telemetry without evidence, suppress negative results, or change the success criteria after the fact.

## Defaults to tune per workload

Illustrative baseline: after two materially equivalent failed attempts without new evidence, block another attempt unless an explicit retry policy justifies it. Three repeated tool errors, cost increasing without success-metric improvement, or a violated invariant can trigger immediate escalation. These are starting values, not universal constants.
