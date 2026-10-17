# Shinobi Agent Architecture

**A governed architecture for long-horizon planning, decision-state analysis, stagnation detection, and controlled recovery.**

Shinobi Agent Architecture (SAA) translates five Naruto-inspired concepts into engineering roles for agentic AI:

- **Itachi** — long-horizon causal planning and contingencies.
- **Shisui** — decision-state analysis: why an agent or stakeholder is choosing, refusing, or repeating a path.
- **Kotoamatsukami (KOTO)** — a bounded, transparent intervention layer that updates decisions through evidence, options, and authorized policy changes.
- **Izanami** — a recurrence and stagnation detector that forces the system to confront repeated failure or unsupported progress claims.
- **Izanagi** — controlled recovery: restore a verified checkpoint or reconstruct a plan from verified state without altering the historical evidence.

These names are **design metaphors**, not claims that the fictional abilities map literally to AI. In particular, KOTO is not covert persuasion or human mind control, and Izanagi must not rewrite audit history.

## The central thesis

Strong agents need more than clever planning. They need a control system that knows when to intervene, how to recognize that a strategy is failing, and how to recover without pretending failure did not happen.

- Itachi asks: **What future states are possible, and what authorized actions today improve the odds of the desired future?**
- Shisui asks: **What belief, incentive, constraint, or missing piece of evidence is driving this decision?**
- KOTO asks: **What is the smallest transparent and authorized intervention that may improve the decision?**
- Izanami asks: **Are we repeating ourselves, oscillating, or claiming progress without new evidence?**
- Izanagi asks: **What safe state can we restore, or what plan can we reconstruct from verified reality?**

The independent control plane governs all five. Agents cannot grant themselves permissions, waive approval gates, erase evidence, or extend their own budgets.

## Start here

1. [Architecture overview](docs/architecture-overview.md)
2. [Interaction model](docs/interactions.md)
3. [Implementation blueprint](docs/implementation-blueprint.md)
4. [Safety and governance](docs/security-and-governance.md)
5. [Evaluation plan](docs/evaluation-plan.md)
6. [System architecture diagram](diagrams/system-architecture.mmd)

## Repository map

```text
docs/       Component contracts, design principles, scenarios, roadmap, and implementation guidance
diagrams/  Mermaid source for architecture, sequence, and recovery diagrams
adr/       Architecture decision records
src/       Reference TypeScript contracts and pure policy helpers
examples/  Walkthrough of a representative run
tests/     Lightweight contract checks and test vectors
```

## Status and scope

This is a **reference design and early implementation scaffold**, not a production-ready autonomous system. The TypeScript files define contracts and small deterministic policy helpers; they do not implement model calls, tool adapters, a database, durable queues, or deployment. The evaluation plan identifies the gates required before operational use.

## Design stance

1. Evidence is different from a model's explanation of evidence.
2. Success is a verified external state, not a confident completion message.
3. Repetition must be measured across tool actions and semantic intent, not only identical prompts.
4. Recovery changes future execution, not historical truth.
5. High-impact and irreversible actions require explicit approval according to policy.
6. Human decisions are addressed through transparent evidence and choice, never covert manipulation.
7. Every run is bounded by time, token/cost, action count, tool permissions, and a stop condition.

## License

No license has been selected. Add one before public reuse or distribution.
