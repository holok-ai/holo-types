import type {AuditFieldMapping} from "../plugin";

export interface AuditDatastore {
    id: string;
    name: string;
    plugin_id: string;
    organization_id?: string;
    connection_config: Record<string, any>;
    mapping: AuditFieldMapping;
    enabled: boolean;
    is_default: boolean;
    created_at: string;
    updated_at: string;
}
