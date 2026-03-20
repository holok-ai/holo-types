import {Application, Prompt, Provider} from "../entities";
import type {ProviderDoneEvent, ProviderErrorEvent} from "../provider/types";
import type {ProviderProtocol} from "../provider/protocol";

export interface GuardResult {
    passed: boolean;
    errors?: string[];
}

export interface HttpRequestDetails {
    path: string;
    method: string;
    headers?: Record<string, any>;
    query?: Record<string, any>;
}

export interface HoloWorkerRequest {
    // Required
    httpRequestDetails: HttpRequestDetails;
    isStreaming: boolean;
    organizationId: string;
    payload: any;
    protocol: ProviderProtocol;
    provider: Provider;
    requestId: string;
    sourceId: string;
    timestamp: string;

    // Optional
    appSlug?: string;
    application?: Application;
    branchId?: string;
    clientIdentifier?: string;
    errors?: string[];
    guardResult?: GuardResult;
    guards?: Prompt[];
    isHoloNative?: boolean;
    isPassthrough?: boolean;
    options?: Record<string, any>;
    passthroughPath?: string;
    providerEvent?: ProviderDoneEvent | ProviderErrorEvent;
    systemPrompt?: Prompt;
    threadId?: string;
    tokenType?: string;
    userId?: string;
    workerId?: string;
}
