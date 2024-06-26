import React from 'react';
import type { Channel, UserResponse } from 'stream-chat';
import type { TranslationContextValue } from '../../context/TranslationContext';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare const renderPreviewText: (text: string) => React.JSX.Element;
export declare const getLatestMessagePreview: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(channel: Channel<StreamChatGenerics>, t: TranslationContextValue['t'], userLanguage?: TranslationContextValue['userLanguage']) => string | JSX.Element;
export declare const getDisplayTitle: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(channel: Channel<StreamChatGenerics>, currentUser?: UserResponse<StreamChatGenerics>) => string | undefined;
export declare const getDisplayImage: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(channel: Channel<StreamChatGenerics>, currentUser?: UserResponse<StreamChatGenerics>) => string | undefined;
