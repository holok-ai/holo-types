export interface HoloGenerateParams {
    model: string;
    prompt: string;
    stream?: boolean;
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
    stop_sequences?: string[];
    protocol?: string;
    provider?: string;
    application?: string;
}
