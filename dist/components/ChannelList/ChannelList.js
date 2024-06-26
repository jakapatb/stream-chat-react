import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ChannelListMessenger } from './ChannelListMessenger';
import { useChannelDeletedListener } from './hooks/useChannelDeletedListener';
import { useChannelHiddenListener } from './hooks/useChannelHiddenListener';
import { useChannelTruncatedListener } from './hooks/useChannelTruncatedListener';
import { useChannelUpdatedListener } from './hooks/useChannelUpdatedListener';
import { useChannelVisibleListener } from './hooks/useChannelVisibleListener';
import { useConnectionRecoveredListener } from './hooks/useConnectionRecoveredListener';
import { useMessageNewListener } from './hooks/useMessageNewListener';
import { useMobileNavigation } from './hooks/useMobileNavigation';
import { useNotificationAddedToChannelListener } from './hooks/useNotificationAddedToChannelListener';
import { useNotificationMessageNewListener } from './hooks/useNotificationMessageNewListener';
import { useNotificationRemovedFromChannelListener } from './hooks/useNotificationRemovedFromChannelListener';
import { usePaginatedChannels } from './hooks/usePaginatedChannels';
import { useUserPresenceChangedListener } from './hooks/useUserPresenceChangedListener';
import { MAX_QUERY_CHANNELS_LIMIT, moveChannelUp } from './utils';
import { Avatar as DefaultAvatar } from '../Avatar/Avatar';
import { ChannelPreview } from '../ChannelPreview/ChannelPreview';
import { ChannelSearch as DefaultChannelSearch, } from '../ChannelSearch/ChannelSearch';
import { EmptyStateIndicator as DefaultEmptyStateIndicator, } from '../EmptyStateIndicator';
import { LoadingChannels } from '../Loading/LoadingChannels';
import { LoadMorePaginator } from '../LoadMore/LoadMorePaginator';
import { NullComponent } from '../UtilityComponents';
import { ChannelListContextProvider } from '../../context';
import { useChatContext } from '../../context/ChatContext';
const DEFAULT_FILTERS = {};
const DEFAULT_OPTIONS = {};
const DEFAULT_SORT = {};
const UnMemoizedChannelList = (props) => {
    const { additionalChannelSearchProps, Avatar = DefaultAvatar, allowNewMessagesFromUnfilteredChannels, channelRenderFilterFn, ChannelSearch = DefaultChannelSearch, customActiveChannel, customQueryChannels, EmptyStateIndicator = DefaultEmptyStateIndicator, filters, LoadingErrorIndicator = NullComponent, LoadingIndicator = LoadingChannels, List = ChannelListMessenger, lockChannelOrder, onAddedToChannel, onChannelDeleted, onChannelHidden, onChannelTruncated, onChannelUpdated, onChannelVisible, onMessageNew, onMessageNewHandler, onRemovedFromChannel, options, Paginator = LoadMorePaginator, Preview, recoveryThrottleIntervalMs, renderChannels, sendChannelsToList = false, setActiveChannelOnMount = true, showChannelSearch = false, sort = DEFAULT_SORT, watchers = {}, } = props;
    const { channel, channelsQueryState, client, closeMobileNav, customClasses, navOpen = false, setActiveChannel, theme, useImageFlagEmojisOnWindows, } = useChatContext('ChannelList');
    const channelListRef = useRef(null);
    const [channelUpdateCount, setChannelUpdateCount] = useState(0);
    const [searchActive, setSearchActive] = useState(false);
    /**
     * Set a channel with id {customActiveChannel} as active and move it to the top of the list.
     * If customActiveChannel prop is absent, then set the first channel in list as active channel.
     */
    const activeChannelHandler = async (channels, setChannels) => {
        if (!channels.length || channels.length > (options?.limit || MAX_QUERY_CHANNELS_LIMIT)) {
            return;
        }
        if (customActiveChannel) {
            let customActiveChannelObject = channels.find((chan) => chan.id === customActiveChannel);
            if (!customActiveChannelObject) {
                //@ts-expect-error
                [customActiveChannelObject] = await client.queryChannels({ id: customActiveChannel });
            }
            if (customActiveChannelObject) {
                setActiveChannel(customActiveChannelObject, watchers);
                const newChannels = moveChannelUp({
                    activeChannel: customActiveChannelObject,
                    channels,
                    cid: customActiveChannelObject.cid,
                });
                setChannels(newChannels);
            }
            return;
        }
        if (setActiveChannelOnMount) {
            setActiveChannel(channels[0], watchers);
        }
    };
    /**
     * For some events, inner properties on the channel will update but the shallow comparison will not
     * force a re-render. Incrementing this dummy variable ensures the channel previews update.
     */
    const forceUpdate = () => setChannelUpdateCount((count) => count + 1);
    const onSearch = useCallback((event) => {
        if (!event.target.value) {
            setSearchActive(false);
        }
        else {
            setSearchActive(true);
        }
        additionalChannelSearchProps?.onSearch?.(event);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const onSearchExit = useCallback(() => {
        setSearchActive(false);
        additionalChannelSearchProps?.onSearchExit?.();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { channels, hasNextPage, loadNextPage, setChannels } = usePaginatedChannels(client, filters || DEFAULT_FILTERS, sort || DEFAULT_SORT, options || DEFAULT_OPTIONS, activeChannelHandler, recoveryThrottleIntervalMs, customQueryChannels);
    const loadedChannels = channelRenderFilterFn ? channelRenderFilterFn(channels) : channels;
    useMobileNavigation(channelListRef, navOpen, closeMobileNav);
    useMessageNewListener(setChannels, onMessageNewHandler, lockChannelOrder, allowNewMessagesFromUnfilteredChannels);
    useNotificationMessageNewListener(setChannels, onMessageNew, allowNewMessagesFromUnfilteredChannels);
    useNotificationAddedToChannelListener(setChannels, onAddedToChannel, allowNewMessagesFromUnfilteredChannels);
    useNotificationRemovedFromChannelListener(setChannels, onRemovedFromChannel);
    useChannelDeletedListener(setChannels, onChannelDeleted);
    useChannelHiddenListener(setChannels, onChannelHidden);
    useChannelVisibleListener(setChannels, onChannelVisible);
    useChannelTruncatedListener(setChannels, onChannelTruncated, forceUpdate);
    useChannelUpdatedListener(setChannels, onChannelUpdated, forceUpdate);
    useConnectionRecoveredListener(forceUpdate);
    useUserPresenceChangedListener(setChannels);
    useEffect(() => {
        const handleEvent = (event) => {
            if (event.cid === channel?.cid) {
                setActiveChannel();
            }
        };
        client.on('channel.deleted', handleEvent);
        client.on('channel.hidden', handleEvent);
        return () => {
            client.off('channel.deleted', handleEvent);
            client.off('channel.hidden', handleEvent);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [channel?.cid]);
    const renderChannel = (item) => {
        const previewProps = {
            activeChannel: channel,
            Avatar,
            channel: item,
            // forces the update of preview component on channel update
            channelUpdateCount,
            key: item.id,
            Preview,
            setActiveChannel,
            watchers,
        };
        return React.createElement(ChannelPreview, { ...previewProps });
    };
    const baseClass = 'str-chat__channel-list';
    const className = clsx(customClasses?.chat ?? 'str-chat', theme, customClasses?.channelList ?? `${baseClass} ${baseClass}-react`, {
        'str-chat--windows-flags': useImageFlagEmojisOnWindows && navigator.userAgent.match(/Win/),
        [`${baseClass}--open`]: navOpen,
    });
    const showChannelList = !searchActive || additionalChannelSearchProps?.popupResults;
    return (React.createElement(ChannelListContextProvider, { value: { channels, setChannels } },
        React.createElement("div", { className: className, ref: channelListRef },
            showChannelSearch && (React.createElement(ChannelSearch, { onSearch: onSearch, onSearchExit: onSearchExit, setChannels: setChannels, ...additionalChannelSearchProps })),
            showChannelList && (React.createElement(List, { error: channelsQueryState.error, loadedChannels: sendChannelsToList ? loadedChannels : undefined, loading: !!channelsQueryState.queryInProgress &&
                    ['reload', 'uninitialized'].includes(channelsQueryState.queryInProgress), LoadingErrorIndicator: LoadingErrorIndicator, LoadingIndicator: LoadingIndicator, setChannels: setChannels }, !loadedChannels?.length ? (React.createElement(EmptyStateIndicator, { listType: 'channel' })) : (React.createElement(Paginator, { hasNextPage: hasNextPage, isLoading: channelsQueryState.queryInProgress === 'load-more', loadNextPage: loadNextPage }, renderChannels
                ? renderChannels(loadedChannels, renderChannel)
                : loadedChannels.map((channel) => renderChannel(channel)))))))));
};
/**
 * Renders a preview list of Channels, allowing you to select the Channel you want to open
 */
export const ChannelList = React.memo(UnMemoizedChannelList);
