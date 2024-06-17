import React, { useCallback, useEffect, useRef, useState, } from 'react';
import { MessageActionsBox } from './MessageActionsBox';
import { ActionsIcon as DefaultActionsIcon } from '../Message/icons';
import { isUserMuted } from '../Message/utils';
import { useChatContext } from '../../context/ChatContext';
import { useMessageContext } from '../../context/MessageContext';
import { useMessageActionsBoxPopper } from './hooks';
import { useTranslationContext } from '../../context';
export const MessageActions = (props) => {
    const { ActionsIcon = DefaultActionsIcon, customWrapperClass = '', getMessageActions: propGetMessageActions, handleDelete: propHandleDelete, handleFlag: propHandleFlag, handleMarkUnread: propHandleMarkUnread, handleMute: propHandleMute, handlePin: propHandlePin, inline, message: propMessage, messageWrapperRef, mine, } = props;
    const { mutes } = useChatContext('MessageActions');
    const { customMessageActions, getMessageActions: contextGetMessageActions, handleDelete: contextHandleDelete, handleFlag: contextHandleFlag, handleMarkUnread: contextHandleMarkUnread, handleMute: contextHandleMute, handlePin: contextHandlePin, isMyMessage, message: contextMessage, setEditingState, } = useMessageContext('MessageActions');
    const { t } = useTranslationContext('MessageActions');
    const getMessageActions = propGetMessageActions || contextGetMessageActions;
    const handleDelete = propHandleDelete || contextHandleDelete;
    const handleFlag = propHandleFlag || contextHandleFlag;
    const handleMarkUnread = propHandleMarkUnread || contextHandleMarkUnread;
    const handleMute = propHandleMute || contextHandleMute;
    const handlePin = propHandlePin || contextHandlePin;
    const message = propMessage || contextMessage;
    const isMine = mine ? mine() : isMyMessage();
    const [actionsBoxOpen, setActionsBoxOpen] = useState(false);
    const isMuted = useCallback(() => isUserMuted(message, mutes), [message, mutes]);
    const hideOptions = useCallback((event) => {
        if (event instanceof KeyboardEvent && event.key !== 'Escape') {
            return;
        }
        setActionsBoxOpen(false);
    }, []);
    const messageActions = getMessageActions();
    const messageDeletedAt = !!message?.deleted_at;
    useEffect(() => {
        if (messageWrapperRef?.current) {
            messageWrapperRef.current.addEventListener('mouseleave', hideOptions);
        }
    }, [hideOptions, messageWrapperRef]);
    useEffect(() => {
        if (messageDeletedAt) {
            document.removeEventListener('click', hideOptions);
        }
    }, [hideOptions, messageDeletedAt]);
    useEffect(() => {
        if (!actionsBoxOpen)
            return;
        document.addEventListener('click', hideOptions);
        document.addEventListener('keyup', hideOptions);
        return () => {
            document.removeEventListener('click', hideOptions);
            document.removeEventListener('keyup', hideOptions);
        };
    }, [actionsBoxOpen, hideOptions]);
    const actionsBoxButtonRef = useRef(null);
    const { attributes, popperElementRef, styles } = useMessageActionsBoxPopper({
        open: actionsBoxOpen,
        placement: isMine ? 'top-end' : 'top-start',
        referenceElement: actionsBoxButtonRef.current,
    });
    if (!messageActions.length && !customMessageActions)
        return null;
    return (React.createElement(MessageActionsWrapper, { customWrapperClass: customWrapperClass, inline: inline, setActionsBoxOpen: setActionsBoxOpen },
        React.createElement(MessageActionsBox, { ...attributes.popper, getMessageActions: getMessageActions, handleDelete: handleDelete, handleEdit: setEditingState, handleFlag: handleFlag, handleMarkUnread: handleMarkUnread, handleMute: handleMute, handlePin: handlePin, isUserMuted: isMuted, mine: isMine, open: actionsBoxOpen, ref: popperElementRef, style: styles.popper }),
        React.createElement("button", { "aria-expanded": actionsBoxOpen, "aria-haspopup": 'true', "aria-label": t('aria/Open Message Actions Menu'), className: 'str-chat__message-actions-box-button', ref: actionsBoxButtonRef },
            React.createElement(ActionsIcon, { className: 'str-chat__message-action-icon' }))));
};
const MessageActionsWrapper = (props) => {
    const { children, customWrapperClass, inline, setActionsBoxOpen } = props;
    const defaultWrapperClass = `
  str-chat__message-simple__actions__action
  str-chat__message-simple__actions__action--options
  str-chat__message-actions-container`;
    const wrapperClass = customWrapperClass || defaultWrapperClass;
    const onClickOptionsAction = (event) => {
        event.stopPropagation();
        setActionsBoxOpen((prev) => !prev);
    };
    const wrapperProps = {
        className: wrapperClass,
        'data-testid': 'message-actions',
        onClick: onClickOptionsAction,
    };
    if (inline)
        return React.createElement("span", { ...wrapperProps }, children);
    return React.createElement("div", { ...wrapperProps }, children);
};
