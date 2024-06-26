import React from 'react';
import { MessageContextValue } from '../../context/MessageContext';
import type { DefaultStreamChatGenerics, IconProps } from '../../types/types';
type MessageContextPropsToPick = 'getMessageActions' | 'handleDelete' | 'handleFlag' | 'handleMarkUnread' | 'handleMute' | 'handlePin' | 'message';
export type MessageActionsProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Partial<Pick<MessageContextValue<StreamChatGenerics>, MessageContextPropsToPick>> & {
    ActionsIcon?: React.ComponentType<IconProps>;
    customWrapperClass?: string;
    inline?: boolean;
    messageWrapperRef?: React.RefObject<HTMLDivElement>;
    mine?: () => boolean;
};
export declare const MessageActions: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: MessageActionsProps<StreamChatGenerics>) => React.JSX.Element | null;
export type MessageActionsWrapperProps = {
    setActionsBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
    customWrapperClass?: string;
    inline?: boolean;
};
export {};
