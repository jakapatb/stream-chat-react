import React, { useEffect } from 'react';
import clsx from 'clsx';
import { MESSAGE_ACTIONS } from '../Message';
import { MessageInput, MessageInputFlat } from '../MessageInput';
import { MessageList, VirtualizedMessageList, } from '../MessageList';
import { ThreadHeader as DefaultThreadHeader } from './ThreadHeader';
import { ThreadHead as DefaultThreadHead } from '../Thread/ThreadHead';
import { useChannelActionContext, useChannelStateContext, useChatContext, useComponentContext, } from '../../context';
/**
 * The Thread component renders a parent Message with a list of replies
 */
export const Thread = (props) => {
    const { channel, channelConfig, thread } = useChannelStateContext('Thread');
    if (!thread || channelConfig?.replies === false)
        return null;
    // The wrapper ensures a key variable is set and the component recreates on thread switch
    return React.createElement(ThreadInner, { ...props, key: `thread-${thread.id}-${channel?.cid}` });
};
const ThreadInner = (props) => {
    const { additionalMessageInputProps, additionalMessageListProps, additionalParentMessageProps, additionalVirtualizedMessageListProps, autoFocus = true, enableDateSeparator = false, fullWidth = false, Input: PropInput, Message: PropMessage, messageActions = Object.keys(MESSAGE_ACTIONS), virtualized, } = props;
    const { thread, threadHasMore, threadLoadingMore, threadMessages, threadSuppressAutoscroll, } = useChannelStateContext('Thread');
    const { closeThread, loadMoreThread } = useChannelActionContext('Thread');
    const { customClasses } = useChatContext('Thread');
    const { ThreadInput: ContextInput, Message: ContextMessage, ThreadHead = DefaultThreadHead, ThreadHeader = DefaultThreadHeader, VirtualMessage, } = useComponentContext('Thread');
    const ThreadInput = PropInput ?? additionalMessageInputProps?.Input ?? ContextInput ?? MessageInputFlat;
    const ThreadMessage = PropMessage || additionalMessageListProps?.Message;
    const FallbackMessage = virtualized && VirtualMessage ? VirtualMessage : ContextMessage;
    const MessageUIComponent = ThreadMessage || FallbackMessage;
    const ThreadMessageList = virtualized ? VirtualizedMessageList : MessageList;
    useEffect(() => {
        if (thread?.id && thread?.reply_count) {
            // FIXME: integrators can customize channel query options but cannot customize channel.getReplies() options
            loadMoreThread();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (!thread)
        return null;
    const threadClass = customClasses?.thread ||
        clsx('str-chat__thread-container str-chat__thread', {
            'str-chat__thread--full': fullWidth,
            'str-chat__thread--virtualized': virtualized,
        });
    const head = (React.createElement(ThreadHead, { key: thread.id, message: thread, Message: MessageUIComponent, ...additionalParentMessageProps }));
    return (React.createElement("div", { className: threadClass },
        React.createElement(ThreadHeader, { closeThread: closeThread, thread: thread }),
        React.createElement(ThreadMessageList, { disableDateSeparator: !enableDateSeparator, hasMore: threadHasMore, head: head, loadingMore: threadLoadingMore, loadMore: loadMoreThread, Message: MessageUIComponent, messageActions: messageActions, messages: threadMessages || [], suppressAutoscroll: threadSuppressAutoscroll, threadList: true, ...(virtualized ? additionalVirtualizedMessageListProps : additionalMessageListProps) }),
        React.createElement(MessageInput, { focus: autoFocus, Input: ThreadInput, parent: thread, publishTypingEvent: false, ...additionalMessageInputProps })));
};
