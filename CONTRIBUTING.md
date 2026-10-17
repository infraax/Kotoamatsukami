# Contributing

## Before proposing a change

- Keep component roles distinct and update `docs/interactions.md` if the flow changes.
- Preserve separation between agent proposals and control-plane authority.
- Do not add covert human influence or consent-bypass behavior to KOTO.
- Do not let Izanagi modify prior audit events or redefine success after execution.
- Add a test vector for every new policy decision or recurrence/recovery condition.
- Update diagrams and the relevant ADR when architecture decisions change.
- Label illustrative values and unverified claims as such.

## Review checklist

- Does this change preserve mission scope and least privilege?
- Are assumptions, evidence provenance, and stop conditions explicit?
- Is a success claim independently verifiable?
- Are retries bounded and idempotent where possible?
- Are irreversible/high-impact actions approval-gated?
- Does recovery preserve history and verify the recovered state?
- Are docs and diagrams consistent with code?

## Current implementation status

This repository is a reference scaffold. The project does not yet have a configured CI pipeline or automated test runner. Do not describe test vectors as executed tests until a test harness is added and run.
