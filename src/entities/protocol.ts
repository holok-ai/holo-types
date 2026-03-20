export const ProtocolCapability = {
    CHAT: 'chat',
    GENERATE: 'generate',
    EMBED: 'embed',
    MODELS: 'models',
    METRICS: 'metrics'
} as const;

export type ProtocolCapability = typeof ProtocolCapability[keyof typeof ProtocolCapability];

export interface Protocol {
    id: string;
    plugin_id: string;
    name: string;
    capability: ProtocolCapability;
    path?: string;
    active: boolean;
    created_at: Date;
}
