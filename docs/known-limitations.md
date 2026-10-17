# Known Limitations and Open Questions

- The five roles are conceptual boundaries; their empirical value is not yet demonstrated by this repository.
- LLM semantic recurrence detection can be noisy. It needs deterministic fingerprints, progress metrics, thresholds, and calibrated evaluation.
- An “independent” verifier may still share the same model, data, or biases. Independence must be designed and measured, not assumed from a different prompt.
- Checkpoint restoration may not reverse external side effects. Some workflows need compensation or human intervention instead.
- Human approval UX, identity, authorization, expiry, and audit requirements depend on the deployment environment.
- There is no configured model provider, tool adapter, database, telemetry backend, CI pipeline, deployment, or production security review in this reference scaffold.
- No license is selected.
- Values and thresholds in examples are illustrative; tune them with workload-specific tests and risk analysis.

## Open design questions

1. What is the canonical event schema and retention policy?
2. Which success predicates can be independently verified for each target tool?
3. How should semantic action signatures be versioned as models change?
4. How can verifier independence be quantified for a given deployment?
5. What classes of action are automatically reversible, compensatable, approval-gated, or forbidden?
6. When does the architecture benefit from multiple models versus multiple structured calls to one model?
