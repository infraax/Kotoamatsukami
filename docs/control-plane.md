# Runtime Governor and Control Plane

## Why it is independent

Agents may propose strategies and operations, but a separate governor decides whether the runtime may perform them. The governor must be enforced in code and tool adapters, not only stated in system prompts.

## Responsibilities

- validate mission contract and policy version;
- maintain a finite-state machine for each run;
- enforce deadlines, token/cost/action ceilings, concurrency, and rate limits;
- check each action against scoped permissions;
- require approval for configured high-impact or irreversible operations;
- apply idempotency and duplicate-action protection;
- pause on cancellation, policy violation, contradictory observations, or serious recurrence;
- invoke the independent verifier and recovery pathway;
- terminate on verified success, safe failure, cancellation, or exhausted limits.

## Suggested run states

`CREATED → CONTRACT_VALIDATED → OBSERVING → PLANNING → DECISION_REVIEW → POLICY_CHECK → EXECUTING → VERIFYING`

From `VERIFYING`, transition to `SUCCEEDED` only when the success predicate is independently met. Otherwise transition to `RECURRENCE_CHECK`, which may lead to `PLANNING`, `RECOVERY`, `NEEDS_HUMAN`, or `FAILED_SAFE`.

Terminal states are immutable. Resuming a terminal run creates a new run linked to the prior one rather than changing its history.

## Permission model

Apply least privilege by default:

- read-only before write-capable tools;
- path/resource scoped permissions;
- time-limited grants where supported;
- explicit allowlists for operations;
- approval tokens bound to a specific action digest and expiry;
- separate credentials and network boundaries for production tools;
- no tool credential in prompts, agent state, or audit text.

## Human approvals

An approval request should describe exact action, target, expected effects, risk, reversibility, evidence, alternatives, and expiry. Approval is not a general-purpose “run freely” token. Any material action change invalidates the previous approval.

## Fail-safe defaults

Deny on missing authorization, ambiguous target, unverifiable action status, expired approval, integrity failure, or missing safety evidence. Provide an actionable explanation and preserve the evidence needed to resume manually.
