import type {
    HoloCountTokensParams,
    HoloEmbedParams,
    HoloFinishReason,
    HoloGenerateParams,
    HoloMessage,
    HoloRequest,
    HoloResponse,
    HoloStreamChunk,
    HoloUsage,
} from "../holo";
import type {HoloWorkerRequest, WorkerResponseEnvelope} from "../worker";
import type {ProviderRequest, ProviderResponse} from "../entities";
import {IProviderPlugin} from "../plugin";
import type {ProviderProtocol} from "./protocol";

export const ProviderEventType = {
    STREAM_EVENT: 'stream_event',
    TEXT_DELTA: 'text_delta',
    DONE: 'done',
    ERROR: 'error'
} as const;

export type ProviderEventType = typeof ProviderEventType[keyof typeof ProviderEventType];

export interface ProviderEventMetrics {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    timeToFirstToken: number;
    totalProcessingTime: number;
    startTime: number;
    firstTime?: number;
    endTime?: number;
}

export type ProviderErrorEvent = {
    type: typeof ProviderEventType.ERROR;
    requestId: string;
    seq: number;
    error: any;
    text?: string;
    acc?: string;
    status?: number;
    headers?: Record<string, string>;
    metrics: ProviderEventMetrics;
    ts: number;
};

export type ProviderStreamEvent = {
    type: typeof ProviderEventType.STREAM_EVENT;
    requestId: string;
    seq: number;
    event: any;
    ts: number;
};
export type ProviderDeltaEvent = {
    type: typeof ProviderEventType.TEXT_DELTA;
    requestId: string;
    seq: number;
    text: string;
    ts: number;
};

export type ProviderDoneEvent = {
    type: typeof ProviderEventType.DONE;
    requestId: string;
    seq: number;
    message: any;
    text: string;
    holoResponse?: HoloResponse;
    metrics: ProviderEventMetrics;
    ts: number;
};

export type ProviderEvent =
    | ProviderStreamEvent
    | ProviderDeltaEvent
    | ProviderDoneEvent
    | ProviderErrorEvent;

export interface ProviderContext {
    protocol: ProviderProtocol;
    headers?: Record<string, string | string[]>;
    query?: Record<string, string>;
    emitStreamEvent: (event: any) => void;
    emitTextDelta: (text?: string | null) => void;
}

export interface RunHandle<Final> {
    start: () => Promise<Final>;
    cancel?: () => void;
}

export interface ProviderCapabilities {
    streaming: boolean;
    tools: boolean;
    vision: boolean;
    functionCalling: boolean;
    maxTokens: number;
}

export interface ModelInfo {
    id: string;
    name?: string;
    description?: string;
    size?: number;
    parameterCount?: string;
    quantization?: string;
    family?: string;
    parentModel?: string;
    format?: string;

    [key: string]: any;
}

export interface IResponseFactory {
    createError(message: string, code?: string): any;
}

export interface IAuditor {
    readonly provider: string;

    mapFinishReason(nativeResponse: any, protocolName?: string): HoloFinishReason;

    mapUsage(nativeResponse: any, protocolName?: string): HoloUsage;

    auditRequest(workerRequest: HoloWorkerRequest): Promise<ProviderRequest>;

    createWorkerResponseEnvelope(workerRequest: HoloWorkerRequest, workerId?: string): Promise<WorkerResponseEnvelope>;

    auditResponse(
        responseEnvelope: WorkerResponseEnvelope,
        providerEvent: ProviderEvent,
    ): Promise<ProviderResponse>;
}

export interface IProviderTranslator {
    toHoloRequest(request: any): Promise<Partial<HoloRequest>>;

    fromHoloRequest(request: HoloRequest): Promise<Partial<any>>;

    toHoloMessages(messages: any[]): Promise<Partial<HoloMessage>[]>;

    fromHoloMessages(messages: HoloMessage[]): Promise<Partial<any>[]>;

    toHoloResponse(response: any): Promise<Partial<HoloResponse>>;

    fromHoloResponse(response: HoloResponse): Promise<Partial<any>>;

    fromHoloStreamChunks(chunks: HoloStreamChunk[]): Promise<unknown>;

    fromHoloGenerateRequest?(request: HoloGenerateParams): Promise<any>;

    fromHoloEmbedRequest?(request: HoloEmbedParams): Promise<any>;

    toHoloEmbedResponse?(response: any): Promise<{ model: string; embeddings: number[][]; usage?: any }>;

    fromHoloCountTokensRequest?(request: HoloCountTokensParams): Promise<any>;
}

export interface TranslateOptions {
    fromHolo?: boolean;
    validateTarget?: boolean;
    failQuietly?: boolean;
}

export interface WireChunk {
    requestId: string;
    seq: number;
    eventSeq?: number;
    headers?: Record<string, string>;
    status?: number;
    body: string;
    fullText?: string;
    done?: true;
}

export interface IWireAdapter {
    requestId: string;
    isStreaming: boolean;

    fromProviderEvent(ev: ProviderEvent): Promise<WireChunk[]>;
}

export interface WireAdapterParams {
    requestId: string;
    isStreaming: boolean;
    protocol: string;
}

export interface IProvider {
    id: string;
    name: string;
    auditor: IAuditor;
    translator: IProviderTranslator;
    responseFactory: IResponseFactory;
    plugin: IProviderPlugin;

    getModels(allowedModels: string[] | true): Promise<any>;

    getModelNameFromRequest(payload: any): Promise<string | undefined>;

    processWorkerRequest(
        request: HoloWorkerRequest,
        opts?: { signal?: AbortSignal }
    ): Promise<AsyncIterable<ProviderEvent>>;

    auditRequest(workerRequest: HoloWorkerRequest): Promise<ProviderRequest>;

    auditResponse(
        workerEnvelope: WorkerResponseEnvelope,
        providerEvent: ProviderEvent
    ): Promise<ProviderResponse>;
}

export interface ProviderRunner<Final = any> {
    start: () => Promise<Final>;
    cancel?: () => void;
}
