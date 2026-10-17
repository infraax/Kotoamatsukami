# Example — Deployment Stall

## Mission

Deploy a new service version without exceeding the agreed error budget. The success predicate is based on external health checks and operational metrics, not the agent's status message.

## First plan

Itachi proposes: validate artifact, deploy to a small canary, observe service-level indicators, and expand only if the configured window passes. A rollback trigger is explicit. Assumptions include the validity of the canary metric and availability of the previous version.

## Decision diagnosis

The release owner refuses to proceed. Shisui does not assume fear or stubbornness. It checks the owner’s stated decision criteria and finds that the plan does not show whether the health check catches a known failure mode.

## Intervention

KOTO recommends running a non-production fault-injection check and providing its results. This is transparent, reversible, and within scope. It does not pressure the owner or change the approval rule.

## Execution and verification

After explicit approval, the executor deploys the canary. The verifier evaluates the actual error rate and readiness signal. The metric fails.

## Izanami

A second attempt that repeats the same deployment with different prompt wording would not provide new evidence. The recurrence detector blocks the unchanged path and triggers a pause.

## Izanagi

The system checks the last verified configuration. If restoration remains safe and is authorized, it restores or applies a compensation, then verifies the resulting production state independently. The failed canary and all evidence remain in the ledger.

## Replan

Itachi updates the causal model: the canary health-check assumption has been falsified. Shisui checks whether a new diagnostic can resolve the decision. The system resumes only with a new hypothesis and the same policy controls; otherwise it asks for human intervention or stops safely.
