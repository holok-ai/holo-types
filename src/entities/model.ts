import {BaseEntity} from "./base";
import {MatchMetadata, MatchMethod, MatchStatus} from "./model-match";

export interface Model extends BaseEntity {
    name: string;
    access_model?: string;
    provider_id: string;
    organization_id: string;
    version: string;
    description?: string;
    context_length?: number;
    modality?: string;
    input_modalities: string[];
    output_modalities: string[];
    supported_parameters: string[];
    parameters: Record<string, any>;
    metadata: Record<string, any>;
    pricing_per_tokens?: Record<string, any>;
    benchmarks?: Record<string, any>;
    customization?: Record<string, any>;
    enabled: boolean;
    available: boolean;
    deleted: boolean;
    dictionary_id?: string;
    raw_name?: string;
    normalized_name?: string;
    match_status?: MatchStatus;
    match_confidence?: number;
    match_method?: MatchMethod;
    match_metadata?: MatchMetadata;
    matched_at?: string;
    source_type?: string;
    source_key?: string;
    family_detected?: string;
    active: boolean;
}
