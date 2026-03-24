import {BaseEntity} from "./base";

export type MatchStatus = 'exact' | 'heuristic' | 'manual' | 'unmatched' | 'ambiguous';

export type MatchMethod = 'canonical_id' | 'dictionary_name' | 'alias_exact'
    | 'alias_provider_scoped' | 'alias_runtime_scoped' | 'date_stripped'
    | 'revision_stripped' | 'quantization_stripped' | 'channel_stripped'
    | 'structured_query' | 'override' | 'none';

export interface MatchCandidate {
    dictionaryId: string;
    canonicalId: string;
    score: number;
}

interface BaseMatchMetadata {
    overrideId?: string;
    aliasId?: string;
    dateStripped?: boolean;
    hints?: Record<string, string>;
    explanation?: string;
}

export interface AmbiguousMatchMetadata extends BaseMatchMetadata {
    competingCandidates: MatchCandidate[];
}

export interface ResolvedMatchMetadata extends BaseMatchMetadata {
    competingCandidates?: MatchCandidate[];
}

export type MatchMetadata = AmbiguousMatchMetadata | ResolvedMatchMetadata;

interface BaseModelMatchResult {
    method: MatchMethod;
    confidence: number;
    normalizedInput: string;
    candidateIds: string[];
    explanation?: string;
}

interface AmbiguousModelMatchResult extends BaseModelMatchResult {
    status: 'ambiguous';
    dictionaryId?: string;
    canonicalId?: string;
    matchMetadata: AmbiguousMatchMetadata;
}

interface ResolvedModelMatchResult extends BaseModelMatchResult {
    status: 'exact' | 'heuristic' | 'manual' | 'unmatched';
    dictionaryId?: string;
    canonicalId?: string;
    matchMetadata?: ResolvedMatchMetadata;
}

export type ModelMatchResult = AmbiguousModelMatchResult | ResolvedModelMatchResult;

export interface ModelMatchOverride extends BaseEntity {
    organization_id?: string;
    source_type: string;
    source_key?: string;
    provider_id?: string;
    raw_name: string;
    normalized_name: string;
    dictionary_id: string;
    reason?: string;
    active: boolean;
    created_by?: string;
}
