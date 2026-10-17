import type { PlannedAction, RunBudget, RecurrenceResult } from "./contracts";

export type AuthorizationDecision =
  | { kind: "ALLOW"; scopedGrant: string }
  | { kind: "APPROVAL_REQUIRED"; reason: string }
  | { kind: "DENY"; reason: string };

export interface PolicyContext {
  allowedActionKinds: string[];
  allowedTargets: string[];
  requireApprovalForHighRisk: boolean;
  requireApprovalForIrreversible: boolean;
}

/** A fail-closed example. Production policy must authenticate grants and bind them to action hashes. */
export function authorizeAction(action: PlannedAction, policy: PolicyContext): AuthorizationDecision {
  if (!policy.allowedActionKinds.includes(action.kind)) {
    return { kind: "DENY", reason: `Action kind is not allowlisted: ${action.kind}` };
  }
  if (!policy.allowedTargets.includes(action.target)) {
    return { kind: "DENY", reason: `Target is not allowlisted: ${action.target}` };
  }
  if (action.risk === "high" && policy.requireApprovalForHighRisk) {
    return { kind: "APPROVAL_REQUIRED", reason: "High-risk action requires explicit approval." };
  }
  if (!action.reversible && policy.requireApprovalForIrreversible) {
    return { kind: "APPROVAL_REQUIRED", reason: "Irreversible action requires explicit approval." };
  }
  if (action.requiresApproval) {
    return { kind: "APPROVAL_REQUIRED", reason: "Action-specific approval is required." };
  }
  return { kind: "ALLOW", scopedGrant: `prototype-grant:${action.id}` };
}

export function budgetExceeded(
  budget: RunBudget,
  limits: { maxActions: number; maxCostUnits: number; maxDurationSeconds: number },
  nowMs = Date.now(),
): boolean {
  const elapsedSeconds = Math.max(0, (nowMs - Date.parse(budget.startedAtIso)) / 1000);
  return budget.actionsUsed >= limits.maxActions
    || budget.costUnitsUsed >= limits.maxCostUnits
    || elapsedSeconds >= limits.maxDurationSeconds
    || nowMs >= Date.parse(budget.deadlineIso);
}

/** Starter guard: do not continue blindly when the recurrence layer flags stagnation. */
export function requiresRecovery(result: RecurrenceResult): boolean {
  return result.level === "stagnant" || result.level === "invariant_violation"
    || result.recommendedNextStep === "recover" || result.recommendedNextStep === "human_review";
}
