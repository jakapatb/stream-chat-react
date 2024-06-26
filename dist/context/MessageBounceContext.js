import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useMessageContext } from './MessageContext';
import { useChannelActionContext } from './ChannelActionContext';
import { isMessageBounced } from '../components';
const MessageBounceContext = createContext(undefined);
export function useMessageBounceContext(componentName) {
    const contextValue = useContext(MessageBounceContext);
    if (!contextValue) {
        console.warn(`The useMessageBounceContext hook was called outside of the MessageBounceContext provider. The errored call is located in the ${componentName} component.`);
        return {};
    }
    return contextValue;
}
export function MessageBounceProvider({ children }) {
    const { handleRetry: doHandleRetry, message, setEditingState, } = useMessageContext('MessageBounceProvider');
    if (!isMessageBounced(message)) {
        console.warn(`The MessageBounceProvider was rendered for a message that is not bounced. Have you missed the "isMessageBounced" check?`);
    }
    const { removeMessage } = useChannelActionContext('MessageBounceProvider');
    const handleDelete = useCallback(() => {
        removeMessage(message);
    }, [message, removeMessage]);
    const handleEdit = useCallback((e) => {
        setEditingState(e);
    }, [setEditingState]);
    const handleRetry = useCallback(() => {
        doHandleRetry(message);
    }, [doHandleRetry, message]);
    const value = useMemo(() => ({
        handleDelete,
        handleEdit,
        handleRetry,
        message,
    }), [handleDelete, handleEdit, handleRetry, message]);
    return React.createElement(MessageBounceContext.Provider, { value: value }, children);
}
