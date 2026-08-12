// ============================================================
// POLITRACK — Core Type Definitions
// Based on SRS §7 Data Requirements
// ============================================================

export type VerificationStatus =
  | "verified"
  | "partially_verified"
  | "needs_review"
  | "unverified"
  | "rejected";

export type PromiseStatus =
  | "not_started"
  | "in_progress"
  | "partially_realized"
  | "realized"
  | "not_realized"
  | "unverifiable";

export type SourceType =
  | "government"
  | "state_institution"
  | "public_document"
  | "media"
  | "civil_society"
  | "candidate_statement"
  | "other";

export type ReportReason =
  | "incorrect_info"
  | "invalid_source"
  | "outdated"
  | "misleading"
  | "privacy_violation"
  | "needs_verification";

// ---- Entities ----

export interface Source {
  id: string;
  name: string;
  url: string;
  sourceType: SourceType;
  publisher?: string;
  publishedAt?: string;
  accessedAt: string;
  reliabilityNote?: string;
}

export interface Claim {
  id: string;
  candidateId: string;
  title: string;
  description: string;
  category: string;
  periodStart?: string;
  periodEnd?: string;
  verificationStatus: VerificationStatus;
  verificationNote?: string;
  sources: Source[];
  verifiedAt?: string;
}

export interface Evidence {
  id: string;
  promiseId: string;
  title: string;
  description: string;
  source: Source;
  evidenceDate: string;
  verificationStatus: VerificationStatus;
}

export interface Promise {
  id: string;
  candidateId: string;
  title: string;
  description: string;
  sector: string;
  target?: string;
  status: PromiseStatus;
  source: Source;
  evidences: Evidence[];
  createdAt: string;
  updatedAt: string;
}

export interface PerformanceMetric {
  id: string;
  candidateId: string;
  label: string;
  value: string;
  description?: string;
  period?: string;
  source: Source;
  verificationStatus: VerificationStatus;
}

export interface TimelineEvent {
  id: string;
  candidateId: string;
  year: number;
  title: string;
  description: string;
  category: "jabatan" | "program" | "kebijakan" | "pendidikan" | "organisasi";
  periodStart: string;
  periodEnd?: string;
  sources: Source[];
  verificationStatus: VerificationStatus;
}

export interface Party {
  id: string;
  name: string;
  shortName: string;
  color: string;
  logoUrl?: string;
}

export interface Election {
  id: string;
  name: string;
  type: string;
  year: number;
  region?: string;
}

export interface Constituency {
  id: string;
  name: string;
  province: string;
  city?: string;
  electionId: string;
}

export interface VerifiedNews {
  id: string;
  title: string;
  media: string;
  url: string;
  publishedAt: string;
  snippet: string;
  verificationStatus: VerificationStatus;
}

export interface IssueStance {
  id: string;
  issueId: string; // matches StrategicIssue id e.g. "isu-01" or slug "transisi-energi"
  issueTitle: string;
  category: string;
  stance: string; // e.g. "Pro-Transisi Berkeadilan", "Hilirisasi Komoditas", "Evaluasi Total"
  description: string;
  verifiedNews: VerifiedNews[];
}

export interface Candidate {
  id: string;
  name: string;
  slug: string;
  photoUrl: string;
  party: Party;
  election: Election;
  constituency: Constituency;
  biography: string;
  education: string[];
  occupation: string[];
  publicPositions: string[];
  organizations: string[];
  visionMission: string;
  programs: string[];
  claims: Claim[];
  promises: Promise[];
  timeline: TimelineEvent[];
  performanceMetrics: PerformanceMetric[];
  issueStances?: IssueStance[];
  updatedAt: string;
}

export interface LiteracyArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  relatedTerms?: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  timestamp: string;
}
