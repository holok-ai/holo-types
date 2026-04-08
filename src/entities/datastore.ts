import type {AuditFieldMapping} from "../plugin";

export interface Datastore {
    id: string;
    name: string;
    plugin_id: string;
    organization_id?: string;
    connection_config: Record<string, any>;
    mapping: AuditFieldMapping;
    enabled: boolean;
    active: boolean;
    created_at: string;
    updated_at: string;
}
