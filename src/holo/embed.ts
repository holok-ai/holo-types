export interface HoloEmbedParams {
    model: string;
    input: string | string[];
    protocol?: string;
    provider?: string;
    application?: string;
}

export interface HoloEmbedResponse {
    model: string;
    embeddings: number[][];
    usage?: { input_tokens?: number; total_tokens?: number };
}
