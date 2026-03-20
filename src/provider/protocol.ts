import type {ProtocolCapability} from "../entities";

export interface StreamEventSequence {
    ordered: string[];
    repeatable: string[];
}

export interface ProviderProtocol {
    id?: string;
    name: string;
    capability: ProtocolCapability;
    streamEventSequence?: StreamEventSequence;
}
