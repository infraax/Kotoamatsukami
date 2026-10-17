# Design Principles

1. **Long horizon, bounded action.** Plan across future states; execute one authorized step at a time.
2. **Reality over narrative.** External observations outrank a model's confident story.
3. **Progress requires evidence.** Count verified deltas, not tokens, tool calls, or new wording.
4. **Transparent intervention.** Improve decision quality with evidence, explicit trade-offs, options, and consent—not covert influence.
5. **Acceptance plus recovery.** Izanami makes contradictions unavoidable; Izanagi creates a bounded new path without erasing the contradiction.
6. **Separation of duties.** Planner, executor, verifier, and governor have distinct responsibilities.
7. **Least privilege.** Authority is granted per tool, resource, operation, and time window.
8. **Reversibility.** Prefer reversible probes when uncertainty or impact is high.
9. **Explicit uncertainty.** Every consequential assumption names evidence, confidence, alternatives, and invalidation conditions.
10. **Finite operation.** Every run has time, action, cost, retry, and escalation limits.
11. **Human agency.** Human refusals, approvals, and decision rights cannot be covertly bypassed.
12. **Traceable recovery.** A recovery records the prior failure and verifies the new state independently.
13. **Minimal coordination overhead.** Use separate agents only when role separation materially improves quality.
14. **No silent policy mutation.** A changed objective, permission, success criterion, or risk threshold requires an explicit policy-controlled event.
15. **Safe stop is a valid result.** A transparent, evidence-backed stop is better than invented completion.
