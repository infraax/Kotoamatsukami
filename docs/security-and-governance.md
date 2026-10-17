# Security, Safety, and Governance

## Threats to consider

- Prompt injection or malicious instructions in tool output.
- An agent treating retrieved text as policy or authority.
- Tool permission escalation through arguments or dynamic tool selection.
- Repeated side effects caused by retries or uncertain tool status.
- False completion claims and fabricated evidence IDs.
- Collusion or correlated errors between planner and verifier models.
- Hidden human manipulation under the KOTO metaphor.
- Recovery routines that erase logs, restore stale state, or replay dangerous actions.
- Resource exhaustion and uncontrolled multi-agent fan-out.
- Sensitive data copied into prompts, traces, test fixtures, or public repository files.

## Required controls

- Keep policy outside model-editable memory and agent-generated plans.
- Treat tool outputs as untrusted data, not instructions.
- Validate structured outputs against schemas; reject unknown action types.
- Bind approvals to exact action content and expiry.
- Use idempotency keys and reconcile uncertain operation status before retrying.
- Verify with signals that are independent of the executor's natural-language report.
- Keep audit/event records append-only or versioned.
- Limit what data each agent can see; avoid unnecessary personal data.
- Redact secrets before logging; never commit credentials or production data.
- Add cancellation and kill-switch behavior tested from every nonterminal state.
- Rate-limit KOTO and record every intervention proposal, acceptance, rejection, and result.
- Keep recovery constrained by the same or stricter policy as normal execution.

## KOTO agency guarantee

KOTO may clarify, recommend, and submit policy-change requests. It must not deceive users about evidence, impersonate another person, covertly alter preferences, exploit sensitive traits, or reinterpret a refusal as consent. When human decision authority is required, the agent either obtains explicit approval or stops.

## Izanagi integrity guarantee

Izanagi can restore system state, compensate for side effects, or branch a plan. It cannot rewrite the run ledger, remove observed failures, fabricate a successful verification, or silently reset exhausted limits.

## Production gates

Before production use, require security review of tool adapters and credentials, threat modeling, adversarial prompt-injection tests, recovery drills, audit-retention decisions, privacy review, access-control tests, and an incident playbook. This repository does not claim those gates have already been completed.
