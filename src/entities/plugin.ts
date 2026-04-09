import {BaseEntity} from "./base";
import {PluginType} from "../plugin";

export interface Plugin extends BaseEntity {
    family: string;
    name: string;
    type: PluginType;
    version: string;
    default_pricing_plan_id?: string;
    active: boolean;
    tarball?: Buffer;
    sha256?: string;
    size_bytes?: number;
    source?: string;
    installed_by?: string;
    schema?: Record<string, any>;
}
