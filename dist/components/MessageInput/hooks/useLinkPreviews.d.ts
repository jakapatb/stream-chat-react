import { Dispatch } from 'react';
import type { MessageInputReducerAction, MessageInputState } from './useMessageInputState';
import type { DefaultStreamChatGenerics } from '../../../types/types';
import type { LinkPreview } from '../types';
import { SetLinkPreviewMode } from '../types';
import type { DebouncedFunc } from 'lodash';
export type URLEnrichmentConfig = {
    /** Number of milliseconds to debounce firing the URL enrichment queries when typing. The default value is 1500(ms). */
    debounceURLEnrichmentMs?: number;
    /** Allows for toggling the URL enrichment and link previews in `MessageInput`. By default, the feature is disabled. */
    enrichURLForPreview?: boolean;
    /** Custom function to identify URLs in a string and request OG data */
    findURLFn?: (text: string) => string[];
    /** Custom function to react to link preview dismissal */
    onLinkPreviewDismissed?: (linkPreview: LinkPreview) => void;
};
type UseEnrichURLsParams<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = URLEnrichmentConfig & {
    dispatch: Dispatch<MessageInputReducerAction<StreamChatGenerics>>;
    linkPreviews: MessageInputState<StreamChatGenerics>['linkPreviews'];
};
export type EnrichURLsController = {
    /** Function cancels all the scheduled or in-progress URL enrichment queries and resets the state. */
    cancelURLEnrichment: () => void;
    /** Function called when a single link preview is dismissed. */
    dismissLinkPreview: (linkPreview: LinkPreview) => void;
    /** Function that triggers the search for URLs and their enrichment. */
    findAndEnqueueURLsToEnrich?: DebouncedFunc<(text: string, mode?: SetLinkPreviewMode) => void>;
};
export declare const useLinkPreviews: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>({ debounceURLEnrichmentMs: debounceURLEnrichmentMsInputContext, dispatch, enrichURLForPreview, findURLFn: findURLFnInputContext, linkPreviews, onLinkPreviewDismissed: onLinkPreviewDismissedInputContext, }: UseEnrichURLsParams<StreamChatGenerics>) => EnrichURLsController;
export {};
