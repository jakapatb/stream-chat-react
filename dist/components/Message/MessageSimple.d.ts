import React from 'react';
import type { MessageUIComponentProps } from './types';
import type { DefaultStreamChatGenerics } from '../../types/types';
/**
 * The default UI component that renders a message and receives functionality and logic from the MessageContext.
 */
export declare const MessageSimple: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: MessageUIComponentProps<StreamChatGenerics>) => React.JSX.Element;
