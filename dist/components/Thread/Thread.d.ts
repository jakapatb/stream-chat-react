import React from 'react';
import { MessageInputProps } from '../MessageInput';
import { MessageListProps, VirtualizedMessageListProps } from '../MessageList';
import type { MessageProps, MessageUIComponentProps } from '../Message/types';
import type { MessageActionsArray } from '../Message/utils';
import type { CustomTrigger, DefaultStreamChatGenerics } from '../../types/types';
export type ThreadProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics, V extends CustomTrigger = CustomTrigger> = {
    /** Additional props for `MessageInput` component: [available props](https://getstream.io/chat/docs/sdk/react/message-input-components/message_input/#props) */
    additionalMessageInputProps?: MessageInputProps<StreamChatGenerics, V>;
    /** Additional props for `MessageList` component: [available props](https://getstream.io/chat/docs/sdk/react/core-components/message_list/#props) */
    additionalMessageListProps?: MessageListProps<StreamChatGenerics>;
    /** Additional props for `Message` component of the parent message: [available props](https://getstream.io/chat/docs/sdk/react/message-components/message/#props) */
    additionalParentMessageProps?: Partial<MessageProps<StreamChatGenerics>>;
    /** Additional props for `VirtualizedMessageList` component: [available props](https://getstream.io/chat/docs/sdk/react/core-components/virtualized_list/#props) */
    additionalVirtualizedMessageListProps?: VirtualizedMessageListProps<StreamChatGenerics>;
    /** If true, focuses the `MessageInput` component on opening a thread */
    autoFocus?: boolean;
    /** Injects date separator components into `Thread`, defaults to `false`. To be passed to the underlying `MessageList` or `VirtualizedMessageList` components */
    enableDateSeparator?: boolean;
    /** Display the thread on 100% width of its parent container. Useful for mobile style view */
    fullWidth?: boolean;
    /** Custom thread input UI component used to override the default `Input` value stored in `ComponentContext` or the [MessageInputSmall](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageInput/MessageInputSmall.tsx) default */
    Input?: React.ComponentType;
    /** Custom thread message UI component used to override the default `Message` value stored in `ComponentContext` */
    Message?: React.ComponentType<MessageUIComponentProps<StreamChatGenerics>>;
    /** Array of allowed message actions (ex: ['edit', 'delete', 'flag', 'mute', 'pin', 'quote', 'react', 'reply']). To disable all actions, provide an empty array. */
    messageActions?: MessageActionsArray;
    /** If true, render the `VirtualizedMessageList` instead of the standard `MessageList` component */
    virtualized?: boolean;
};
/**
 * The Thread component renders a parent Message with a list of replies
 */
export declare const Thread: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics, V extends CustomTrigger = CustomTrigger>(props: ThreadProps<StreamChatGenerics, V>) => React.JSX.Element | null;
