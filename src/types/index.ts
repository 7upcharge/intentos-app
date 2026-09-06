export type GoalCategory = 'flat_hunt' | 'laptop_buy' | 'sink_leak' | 'goa_trip' | 'custom';

export interface UserContext {
  id: string;
  name: string;
  budgetRange: string;
  preferredLocation: string;
  parkingRequired: boolean;
  roommatesCount: number;
  furnishedPreference: string;
  pastDecisions: string[];
  customTraits: Record<string, string>;
}

export type NodeStatus = 'pending' | 'running' | 'completed' | 'refined' | 'error';

export interface TaskNode {
  id: string;
  title: string;
  agentRole: string;
  description: string;
  dependencies: string[];
  status: NodeStatus;
  outputSummary?: string;
  data?: Record<string, any>;
}

export interface DynamicGraph {
  goalId: string;
  intentRaw: string;
  category: GoalCategory;
  title: string;
  nodes: TaskNode[];
  edges: { from: string; to: string }[];
}

export interface AgentStructuredMessage {
  agentName: string;
  role: 'orchestrator' | 'research' | 'preference' | 'collaboration' | 'communication' | 'vision' | 'evaluator' | 'action';
  timestamp: string;
  phase: 'PLAN' | 'ACT' | 'OBSERVE' | 'VERIFY' | 'EVALUATE' | 'REFINE';
  findings: string;
  structuredPayload: Record<string, any>;
  confidenceDelta: number;
}

export interface SharedSystemState {
  intent: string;
  goalCategory: GoalCategory;
  userContext: UserContext;
  tasks: TaskNode[];
  evidence: Record<string, any>;
  confidenceScore: number;
  blockers: string[];
  nextAction: string;
  activePhase: 'IDLE' | 'PLANNING' | 'EXECUTING' | 'EVALUATING' | 'WORKSPACE_READY';
  logs: AgentStructuredMessage[];
}

export interface FlatItem {
  id: string;
  title: string;
  rent: number;
  distanceKm: number;
  matchScore: number;
  hasParking: boolean;
  isFurnished: boolean;
  deposit: number;
  locationName: string;
  roommateApproval: 'Approved' | 'Pending' | 'Rejected';
  image: string;
  perks: string[];
  contactOwner: string;
  ownerName: string;
}

export interface OwnerMessage {
  id: string;
  sender: 'agent' | 'owner';
  senderName: string;
  text: string;
  timestamp: string;
  attachedPhotos?: { url: string; label: string }[];
}

export interface VisionAnalysis {
  id: string;
  roomType: string;
  status: 'Verified' | 'Uncertain' | 'Warning';
  imageUrl: string;
  findings: string[];
  confidence: number;
}

export interface TripData {
  destination: string;
  totalBudgetPerPerson: number;
  groupSize: number;
  dates: string;
  transportOptions: { mode: string; costPerPerson: number; duration: string; recommended: boolean }[];
  stays: { name: string; costPerNight: number; rating: number; location: string; tags: string[]; image: string }[];
  itinerary: { day: number; title: string; activities: string[] }[];
  groupSplit: { name: string; share: number; paid: boolean }[];
}

export interface ExamData {
  subject: string;
  daysRemaining: number;
  targetScore: string;
  weakTopics: string[];
  studyPlan: { day: number; topic: string; durationHours: number; completed: boolean }[];
  mockTests: { testName: string; score?: string; status: 'Ready' | 'Completed' | 'Pending' }[];
}
