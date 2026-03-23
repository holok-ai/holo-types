import {HoloMessage} from './messages';

export interface HoloCountTokensParams {
    model: string;
    messages: HoloMessage[];
    protocol?: string;
    provider?: string;
}

export interface HoloCountTokensResponse {
    input_tokens: number;
}
