import React from 'react';
import { ChannelListMessengerProps } from './ChannelListMessenger';
import { CustomQueryChannelsFn } from './hooks/usePaginatedChannels';
import { AvatarProps } from '../Avatar/Avatar';
import { ChannelPreviewUIComponentProps } from '../ChannelPreview/ChannelPreview';
import { ChannelSearchProps } from '../ChannelSearch/ChannelSearch';
import { EmptyStateIndicatorProps } from '../EmptyStateIndicator';
import { LoadMorePaginatorProps } from '../LoadMore/LoadMorePaginator';
import type { Channel, ChannelFilters, ChannelOptions, ChannelSort, Event } from 'stream-chat';
import type { DefaultStreamChatGenerics, PaginatorProps } from '../../types/types';
export type ChannelListProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    /** Additional props for underlying ChannelSearch component and channel search controller, [available props](https://getstream.io/chat/docs/sdk/react/utility-components/channel_search/#props) */
    additionalChannelSearchProps?: Omit<ChannelSearchProps<StreamChatGenerics>, 'setChannels'>;
    /**
     * When the client receives `message.new`, `notification.message_new`, and `notification.added_to_channel` events, we automatically
     * push that channel to the top of the list. If the channel doesn't currently exist in the list, we grab the channel from
     * `client.activeChannels` and push it to the top of the list. You can disable this behavior by setting this prop
     * to false, which will prevent channels not in the list from incrementing the list. The default is true.
     */
    allowNewMessagesFromUnfilteredChannels?: boolean;
    /** Custom UI component to display user avatar, defaults to and accepts same props as: [Avatar](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Avatar/Avatar.tsx) */
    Avatar?: React.ComponentType<AvatarProps>;
    /** Optional function to filter channels prior to loading in the DOM. Do not use any complex or async logic that would delay the loading of the ChannelList. We recommend using a pure function with array methods like filter/sort/reduce. */
    channelRenderFilterFn?: (channels: Array<Channel<StreamChatGenerics>>) => Array<Channel<StreamChatGenerics>>;
    /** Custom UI component to display search results, defaults to and accepts same props as: [ChannelSearch](https://github.com/GetStream/stream-chat-react/blob/master/src/components/ChannelSearch/ChannelSearch.tsx) */
    ChannelSearch?: React.ComponentType<ChannelSearchProps<StreamChatGenerics>>;
    /** Set a channel (with this ID) to active and manually move it to the top of the list */
    customActiveChannel?: string;
    /** Custom function that handles the channel pagination. Has to build query filters, sort and options and query and append channels to the current channels state and update the hasNext pagination flag after each query. */
    customQueryChannels?: CustomQueryChannelsFn<StreamChatGenerics>;
    /** Custom UI component for rendering an empty list, defaults to and accepts same props as: [EmptyStateIndicator](https://github.com/GetStream/stream-chat-react/blob/master/src/components/EmptyStateIndicator/EmptyStateIndicator.tsx) */
    EmptyStateIndicator?: React.ComponentType<EmptyStateIndicatorProps>;
    /** An object containing channel query filters */
    filters?: ChannelFilters<StreamChatGenerics>;
    /** Custom UI component to display the container for the queried channels, defaults to and accepts same props as: [ChannelListMessenger](https://github.com/GetStream/stream-chat-react/blob/master/src/components/ChannelList/ChannelListMessenger.tsx) */
    List?: React.ComponentType<ChannelListMessengerProps<StreamChatGenerics>>;
    /** Custom UI component to display the loading error indicator, defaults to component that renders null */
    LoadingErrorIndicator?: React.ComponentType;
    /** Custom UI component to display the loading state, defaults to and accepts same props as: [LoadingChannels](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Loading/LoadingChannels.tsx) */
    LoadingIndicator?: React.ComponentType;
    /** When true, channels won't dynamically sort by most recent message */
    lockChannelOrder?: boolean;
    /** Function to override the default behavior when a user is added to a channel, corresponds to [notification.added\_to\_channel](https://getstream.io/chat/docs/javascript/event_object/?language=javascript) event */
    onAddedToChannel?: (setChannels: React.Dispatch<React.SetStateAction<Array<Channel<StreamChatGenerics>>>>, event: Event<StreamChatGenerics>) => void;
    /** Function to override the default behavior when a channel is deleted, corresponds to [channel.deleted](https://getstream.io/chat/docs/javascript/event_object/?language=javascript) event */
    onChannelDeleted?: (setChannels: React.Dispatch<React.SetStateAction<Array<Channel<StreamChatGenerics>>>>, event: Event<StreamChatGenerics>) => void;
    /** Function to override the default behavior when a channel is hidden, corresponds to [channel.hidden](https://getstream.io/chat/docs/javascript/event_object/?language=javascript) event */
    onChannelHidden?: (setChannels: React.Dispatch<React.SetStateAction<Array<Channel<StreamChatGenerics>>>>, event: Event<StreamChatGenerics>) => void;
    /** Function to override the default behavior when a channel is truncated, corresponds to [channel.truncated](https://getstream.io/chat/docs/javascript/event_object/?language=javascript) event */
    onChannelTruncated?: (setChannels: React.Dispatch<React.SetStateAction<Array<Channel<StreamChatGenerics>>>>, event: Event<StreamChatGenerics>) => void;
    /** Function to override the default behavior when a channel is updated, corresponds to [channel.updated](https://getstream.io/chat/docs/javascript/event_object/?language=javascript) event */
    onChannelUpdated?: (setChannels: React.Dispatch<React.SetStateAction<Array<Channel<StreamChatGenerics>>>>, event: Event<StreamChatGenerics>) => void;
    /** Function to override the default channel visible behavior, corresponds to [channel.visible](https://getstream.io/chat/docs/javascript/event_object/?language=javascript) event */
    onChannelVisible?: (setChannels: React.Dispatch<React.SetStateAction<Array<Channel<StreamChatGenerics>>>>, event: Event<StreamChatGenerics>) => void;
    /** Function to override the default behavior when a message is received on a channel not being watched, corresponds to [notification.message\_new](https://getstream.io/chat/docs/javascript/event_object/?language=javascript) event */
    onMessageNew?: (setChannels: React.Dispatch<React.SetStateAction<Array<Channel<StreamChatGenerics>>>>, event: Event<StreamChatGenerics>) => void;
    /** Function to override the default behavior when a message is received on a channel being watched, handles [message.new](https://getstream.io/chat/docs/javascript/event_object/?language=javascript) event */
    onMessageNewHandler?: (setChannels: React.Dispatch<React.SetStateAction<Array<Channel<StreamChatGenerics>>>>, event: Event<StreamChatGenerics>) => void;
    /** Function to override the default behavior when a user gets removed from a channel, corresponds to [notification.removed\_from\_channel](https://getstream.io/chat/docs/javascript/event_object/?language=javascript) event */
    onRemovedFromChannel?: (setChannels: React.Dispatch<React.SetStateAction<Array<Channel<StreamChatGenerics>>>>, event: Event<StreamChatGenerics>) => void;
    /** An object containing channel query options */
    options?: ChannelOptions;
    /** Custom UI component to handle channel pagination logic, defaults to and accepts same props as: [LoadMorePaginator](https://github.com/GetStream/stream-chat-react/blob/master/src/components/LoadMore/LoadMorePaginator.tsx) */
    Paginator?: React.ComponentType<PaginatorProps | LoadMorePaginatorProps>;
    /** Custom UI component to display the channel preview in the list, defaults to and accepts same props as: [ChannelPreviewMessenger](https://github.com/GetStream/stream-chat-react/blob/master/src/components/ChannelPreview/ChannelPreviewMessenger.tsx) */
    Preview?: React.ComponentType<ChannelPreviewUIComponentProps<StreamChatGenerics>>;
    /**
     * Custom interval during which the recovery channel list queries will be prevented.
     * This is to avoid firing unnecessary queries during internet connection fluctuation.
     * Recovery channel query is triggered upon `connection.recovered` and leads to complete channel list reload with pagination offset 0.
     * The minimum throttle interval is 2000ms. The default throttle interval is 5000ms.
     */
    recoveryThrottleIntervalMs?: number;
    /** Function to override the default behavior when rendering channels, so this function is called instead of rendering the Preview directly */
    renderChannels?: (channels: Channel<StreamChatGenerics>[], channelPreview: (item: Channel<StreamChatGenerics>) => React.ReactNode) => React.ReactNode;
    /** If true, sends the list's currently loaded channels to the `List` component as the `loadedChannels` prop */
    sendChannelsToList?: boolean;
    /** Last channel will be set as active channel if true, defaults to true */
    setActiveChannelOnMount?: boolean;
    /** Whether or not to load the list with a search component, defaults to false */
    showChannelSearch?: boolean;
    /** An object containing channel query sort parameters */
    sort?: ChannelSort<StreamChatGenerics>;
    /** An object containing query parameters for fetching channel watchers */
    watchers?: {
        limit?: number;
        offset?: number;
    };
};
/**
 * Renders a preview list of Channels, allowing you to select the Channel you want to open
 */
export declare const ChannelList: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: ChannelListProps<StreamChatGenerics>) => React.JSX.Element;
