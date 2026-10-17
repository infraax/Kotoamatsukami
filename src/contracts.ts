/** Provider-neutral contracts for a Shinobi Agent Architecture prototype. */
export type RunId = string;
export type EvidenceId = string;
export type ActionId = string;

export interface MissionContract {
  id: string;
  objective: string;
  scope: string[];
  successPredicate: string;
  constraints: string[];
  policyVersion: string;
  deadlineIso: string;
  budget: { maxActions: number; maxCostUnits: number; maxDurationSeconds: number; maxRetriesPerSignature: number };
}

export interface EvidenceReference {
  id: EvidenceId;
  source: string;
  observedAtIso: string;
  contentHash?: string;
  summary: string;
  trust: "untrusted" | "corroborated" | "verified";
}

export interface Assumption {
  claim: string;
  confidence: number;
  evidenceIds: EvidenceId[];
  invalidateIf: string;
  alternatives: string[];
}

export interface PlannedAction {
  id: ActionId;
  kind: string;
  target: string;
  args: Record<string, unknown>;
  expectedObservation: string;
  risk: "low" | "medium" | "high";
  reversible: boolean;
  requiresApproval: boolean;
  idempotencyKey: string;
}

export interface StrategicPlan {
  strategyId: string;
  objective: string;
  assumptions: Assumption[];
  nextAction: PlannedAction;
  contingencies: Array<{ trigger: string; action: string; approvalRequired: boolean }>;
  terminalCondition: string;
}

export type DecisionBlocker =
  | "evidence_gap"
  | "conflicting_objectives"
  | "policy_constraint"
  | "risk_mismatch"
  | "coordination_failure"
  | "capability_gap"
  | "unknown";

export interface DecisionDiagnosis {
  blockerType: DecisionBlocker;
  observations: EvidenceReference[];
  alternativeExplanations: Array<{ explanation: string; confidence: number }>;
  smallestUsefulNextStep: string;
  requiresIntervention: boolean;
  improvementPredicate: string;
  sideEffectsToMonitor: string[];
}

export interface InterventionProposal {
  kind: "evidence_addition" | "transparent_reframing" | "option_expansion" | "negotiated_commitment" | "policy_update_request";
  rationale: string;
  evidenceIds: EvidenceId[];
  recipient: string;
  expectedBenefit: string;
  risks: string[];
  expiryIso: string;
  requiresHumanApproval: boolean;
  reversible: boolean;
}

export interface VerificationResult {
  verified: boolean;
  predicate: string;
  evidenceIds: EvidenceId[];
  rationale: string;
  missingEvidence: string[];
  sideEffects: string[];
}

export interface RecurrenceResult {
  level: "clear" | "watch" | "stagnant" | "invariant_violation";
  exactRepeatCount: number;
  semanticRepeatCount: number;
  oscillationDetected: boolean;
  evidenceDelta: number;
  progressDelta: number;
  rationale: string;
  recommendedNextStep: "continue" | "changed_retry" | "recover" | "human_review" | "stop";
}

export interface RecoveryPlan {
  trigger: string;
  strategy: "restore_checkpoint" | "compensate" | "reconstruct" | "escalate" | "safe_stop";
  checkpointId?: string;
  steps: PlannedAction[];
  risk: string;
  approvalRequired: boolean;
  postRecoveryPredicate: string;
  fallback: string;
  expiryIso: string;
}

export type RunStatus =
  | "created" | "contract_validated" | "observing" | "planning" | "decision_review"
  | "policy_check" | "executing" | "verifying" | "recurrence_check" | "recovery"
  | "needs_human" | "succeeded" | "failed_safe" | "cancelled";

export interface RunBudget {
  actionsUsed: number;
  costUnitsUsed: number;
  startedAtIso: string;
  deadlineIso: string;
}

export interface RunSnapshot {
  id: RunId;
  missionId: string;
  status: RunStatus;
  iteration: number;
  budget: RunBudget;
  lastVerifiedEvidenceIds: EvidenceId[];
  currentStrategyId?: string;
  terminalReason?: string;
}

export interface AuditEvent<T = unknown> {
  id: string;
  runId: RunId;
  sequence: number;
  type: string;
  occurredAtIso: string;
  actor: string;
  payload: T;
  payloadHash?: string;
}
