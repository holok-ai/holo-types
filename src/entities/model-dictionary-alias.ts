import {BaseEntity} from "./base";

export type ModelAliasType = 'official' | 'provider_api' | 'reseller' | 'runtime' | 'display' | 'shorthand' | 'legacy' | 'heuristic';

export interface ModelDictionaryAlias extends BaseEntity {
    dictionary_id: string;
    alias: string;
    alias_normalized: string;
    alias_type: ModelAliasType;
    provider_family?: string;
    runtime_family?: string;
    source?: string;
    source_key?: string;
    weight: number;
    active: boolean;
}
