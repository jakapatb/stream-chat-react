import React from 'react';
import { ActionsIcon as DefaultActionsIcon, ReactionIcon as DefaultReactionIcon, ThreadIcon as DefaultThreadIcon, } from './icons';
import { MESSAGE_ACTIONS, showMessageActionsBox } from './utils';
import { MessageActions } from '../MessageActions';
import { useMessageContext } from '../../context/MessageContext';
import { useTranslationContext } from '../../context';
const UnMemoizedMessageOptions = (props) => {
    const { ActionsIcon = DefaultActionsIcon, displayReplies = true, handleOpenThread: propHandleOpenThread, messageWrapperRef, ReactionIcon = DefaultReactionIcon, theme = 'simple', ThreadIcon = DefaultThreadIcon, } = props;
    const { customMessageActions, getMessageActions, handleOpenThread: contextHandleOpenThread, initialMessage, message, onReactionListClick, showDetailedReactions, threadList, } = useMessageContext('MessageOptions');
    const { t } = useTranslationContext('MessageOptions');
    const handleOpenThread = propHandleOpenThread || contextHandleOpenThread;
    const messageActions = getMessageActions();
    const showActionsBox = showMessageActionsBox(messageActions, threadList) || !!customMessageActions;
    const shouldShowReactions = messageActions.indexOf(MESSAGE_ACTIONS.react) > -1;
    const shouldShowReplies = messageActions.indexOf(MESSAGE_ACTIONS.reply) > -1 && displayReplies && !threadList;
    if (!message.type ||
        message.type === 'error' ||
        message.type === 'system' ||
        message.type === 'ephemeral' ||
        message.status === 'failed' ||
        message.status === 'sending' ||
        initialMessage) {
        return null;
    }
    const rootClassName = `str-chat__message-${theme}__actions str-chat__message-options`;
    return (React.createElement("div", { className: rootClassName, "data-testid": 'message-options' },
        showActionsBox && (React.createElement(MessageActions, { ActionsIcon: ActionsIcon, messageWrapperRef: messageWrapperRef })),
        shouldShowReplies && (React.createElement("button", { "aria-label": t('aria/Open Thread'), className: `str-chat__message-${theme}__actions__action str-chat__message-${theme}__actions__action--thread str-chat__message-reply-in-thread-button`, "data-testid": 'thread-action', onClick: handleOpenThread },
            React.createElement(ThreadIcon, { className: 'str-chat__message-action-icon' }))),
        shouldShowReactions && (React.createElement("button", { "aria-expanded": showDetailedReactions, "aria-label": t('aria/Open Reaction Selector'), className: `str-chat__message-${theme}__actions__action str-chat__message-${theme}__actions__action--reactions str-chat__message-reactions-button`, "data-testid": 'message-reaction-action', onClick: onReactionListClick },
            React.createElement(ReactionIcon, { className: 'str-chat__message-action-icon' })))));
};
export const MessageOptions = React.memo(UnMemoizedMessageOptions);
