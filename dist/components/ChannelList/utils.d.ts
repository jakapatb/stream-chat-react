import type { Channel } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare const MAX_QUERY_CHANNELS_LIMIT = 30;
type MoveChannelUpParams<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    channels: Array<Channel<StreamChatGenerics>>;
    cid: string;
    activeChannel?: Channel<StreamChatGenerics>;
};
export declare const moveChannelUp: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>({ activeChannel, channels, cid, }: MoveChannelUpParams<StreamChatGenerics>) => Channel<StreamChatGenerics>[];
export {};
