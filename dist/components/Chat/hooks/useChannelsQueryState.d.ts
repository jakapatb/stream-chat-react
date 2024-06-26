import { Dispatch, SetStateAction } from 'react';
import type { APIErrorResponse, ErrorFromResponse } from 'stream-chat';
type ChannelQueryState = 'uninitialized' | 'reload' | 'load-more' | null;
export interface ChannelsQueryState {
    error: ErrorFromResponse<APIErrorResponse> | null;
    queryInProgress: ChannelQueryState;
    setError: Dispatch<SetStateAction<ErrorFromResponse<APIErrorResponse> | null>>;
    setQueryInProgress: Dispatch<SetStateAction<ChannelQueryState>>;
}
export declare const useChannelsQueryState: () => ChannelsQueryState;
export {};
