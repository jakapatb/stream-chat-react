import React from 'react';
import type { StreamMessage } from '../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare const QuotedMessagePreviewHeader: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>() => React.JSX.Element;
export type QuotedMessagePreviewProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    quotedMessage: StreamMessage<StreamChatGenerics>;
};
export declare const QuotedMessagePreview: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>({ quotedMessage, }: QuotedMessagePreviewProps<StreamChatGenerics>) => React.JSX.Element | null;
