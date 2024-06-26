import type { TFunction } from 'i18next';
import type { MessageResponse, Mute, StreamChat, UserResponse } from 'stream-chat';
import type { PinPermissions } from './hooks';
import type { MessageProps } from './types';
import type { MessageContextValue, StreamMessage } from '../../context';
import type { DefaultStreamChatGenerics } from '../../types/types';
/**
 * Following function validates a function which returns notification message.
 * It validates if the first parameter is function and also if return value of function is string or no.
 */
export declare const validateAndGetMessage: <T extends unknown[]>(func: (...args: T) => unknown, args: T) => string | null;
/**
 * Tell if the owner of the current message is muted
 */
export declare const isUserMuted: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(message: StreamMessage<StreamChatGenerics>, mutes?: Mute<StreamChatGenerics>[]) => boolean;
export declare const MESSAGE_ACTIONS: {
    delete: string;
    edit: string;
    flag: string;
    markUnread: string;
    mute: string;
    pin: string;
    quote: string;
    react: string;
    reply: string;
};
export type MessageActionsArray<T extends string = string> = Array<'delete' | 'edit' | 'flag' | 'mute' | 'pin' | 'quote' | 'react' | 'reply' | T>;
export declare const defaultPinPermissions: PinPermissions;
export type Capabilities = {
    canDelete?: boolean;
    canEdit?: boolean;
    canFlag?: boolean;
    canMarkUnread?: boolean;
    canMute?: boolean;
    canPin?: boolean;
    canQuote?: boolean;
    canReact?: boolean;
    canReply?: boolean;
};
export declare const getMessageActions: (actions: MessageActionsArray | boolean, { canDelete, canEdit, canFlag, canMarkUnread, canMute, canPin, canQuote, canReact, canReply, }: Capabilities) => MessageActionsArray<string>;
export declare const ACTIONS_NOT_WORKING_IN_THREAD: string[];
export declare const showMessageActionsBox: (actions: MessageActionsArray<string>, inThread?: boolean | undefined) => boolean;
export declare const areMessagePropsEqual: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(prevProps: MessageProps<StreamChatGenerics> & {
    mutes?: Mute<StreamChatGenerics>[];
    showDetailedReactions?: boolean;
}, nextProps: MessageProps<StreamChatGenerics> & {
    mutes?: Mute<StreamChatGenerics>[];
    showDetailedReactions?: boolean;
}) => boolean;
export declare const areMessageUIPropsEqual: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(prevProps: MessageContextValue<StreamChatGenerics> & {
    showDetailedReactions?: boolean;
}, nextProps: MessageContextValue<StreamChatGenerics> & {
    showDetailedReactions?: boolean;
}) => boolean;
export declare const messageHasReactions: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(message?: StreamMessage<StreamChatGenerics>) => boolean;
export declare const messageHasAttachments: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(message?: StreamMessage<StreamChatGenerics>) => boolean;
export declare const getImages: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(message?: MessageResponse<StreamChatGenerics>) => import("stream-chat").Attachment<StreamChatGenerics>[];
export declare const getNonImageAttachments: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(message?: MessageResponse<StreamChatGenerics>) => import("stream-chat").Attachment<StreamChatGenerics>[];
export interface TooltipUsernameMapper {
    <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(user: UserResponse<StreamChatGenerics>): string;
}
/**
 * Default Tooltip Username mapper implementation.
 *
 * @param user the user.
 */
export declare const mapToUserNameOrId: TooltipUsernameMapper;
export declare const getReadByTooltipText: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(users: UserResponse<StreamChatGenerics>[], t: TFunction, client: StreamChat<StreamChatGenerics>, tooltipUserNameMapper: TooltipUsernameMapper) => string;
export declare const isOnlyEmojis: (text?: string) => boolean;
export declare const isMessageBounced: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(message: Pick<StreamMessage<StreamChatGenerics>, 'type' | 'moderation_details'>) => boolean;
export declare const isMessageEdited: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(message: Pick<StreamMessage<StreamChatGenerics>, 'message_text_updated_at'>) => boolean;
