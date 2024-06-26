import { StreamMessage } from '../../../../context';
import type { DefaultStreamChatGenerics } from '../../../../types/types';
export type UseUnreadMessagesNotificationParams = {
    showAlways: boolean;
    unreadCount: number;
    lastRead?: Date | null;
};
/**
 * Controls the logic when an `UnreadMessagesNotification` component should be shown.
 * In virtualized message list there is no notion of being scrolled below or above `UnreadMessagesSeparator`.
 * Therefore, the `UnreadMessagesNotification` component is rendered based on timestamps.
 * If the there are unread messages in the channel and the `VirtualizedMessageList` renders
 * messages created later than the last read message in the channel, then the
 * `UnreadMessagesNotification` component is rendered. This is an approximate equivalent to being
 * scrolled below the `UnreadMessagesNotification` component.
 * @param lastRead
 * @param showAlways
 * @param unreadCount
 */
export declare const useUnreadMessagesNotificationVirtualized: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>({ lastRead, showAlways, unreadCount, }: UseUnreadMessagesNotificationParams) => {
    show: boolean;
    toggleShowUnreadMessagesNotification: (renderedMessages: StreamMessage<StreamChatGenerics>[]) => void;
};
