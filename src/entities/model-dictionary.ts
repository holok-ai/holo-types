import {BaseEntity} from "./base";

export type ModelDictionaryStatus = 'active' | 'preview' | 'deprecated' | 'shutdown';

export type ModelKind = 'chat' | 'completion' | 'reasoning' | 'embedding' | 'image' | 'audio' | 'moderation' | 'rerank' | 'transcription' | 'tts';

export interface ModelDictionary extends BaseEntity {
    canonical_id: string;
    canonical_id_normalized: string;
    name: string;
    normalized_name?: string;
    family?: string;
    provider_family: string;
    version_label?: string;
    variant?: string;
    size_label?: string;
    architecture_family?: string;
    description?: string;
    context_length?: number;
    modality?: string;
    input_modalities: string[];
    output_modalities: string[];
    supported_parameters: string[];
    default_parameters: Record<string, any>;
    capabilities: Record<string, unknown>;
    tokenizer?: string;
    kind: ModelKind;
    status: ModelDictionaryStatus;
    is_open_source?: boolean;
    release_date?: string;
    shutdown_date?: string;
    base_input_cost?: number;
    base_output_cost?: number;
    base_cache_read_cost?: number;
    base_cache_write_cost?: number;
    aliases: string[];
    sources: string[];
    last_synced_at?: string;
}
