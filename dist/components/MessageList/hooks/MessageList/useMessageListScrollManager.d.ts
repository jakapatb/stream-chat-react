import type { StreamMessage } from '../../../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../../../types/types';
export type ContainerMeasures = {
    offsetHeight: number;
    scrollHeight: number;
};
export type UseMessageListScrollManagerParams<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    loadMoreScrollThreshold: number;
    messages: StreamMessage<StreamChatGenerics>[];
    onScrollBy: (scrollBy: number) => void;
    scrollContainerMeasures: () => ContainerMeasures;
    scrolledUpThreshold: number;
    scrollToBottom: () => void;
    showNewMessages: () => void;
};
export declare function useMessageListScrollManager<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(params: UseMessageListScrollManagerParams<StreamChatGenerics>): (scrollTopValue: number) => void;
