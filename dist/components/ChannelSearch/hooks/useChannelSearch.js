import { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import uniqBy from 'lodash.uniqby';
import { isChannel } from '../utils';
import { useChatContext } from '../../../context/ChatContext';
export const useChannelSearch = ({ channelType = 'messaging', clearSearchOnClickOutside = true, disabled = false, onSearch: onSearchCallback, onSearchExit, onSelectResult, searchDebounceIntervalMs = 300, searchForChannels = false, searchFunction, searchQueryParams, setChannels, }) => {
    const { client, setActiveChannel } = useChatContext('useChannelSearch');
    const [inputIsFocused, setInputIsFocused] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const searchQueryPromiseInProgress = useRef();
    const shouldIgnoreQueryResults = useRef(false);
    const inputRef = useRef(null);
    const searchBarRef = useRef(null);
    const clearState = useCallback(() => {
        setQuery('');
        setResults([]);
        setSearching(false);
        if (searchQueryPromiseInProgress.current) {
            shouldIgnoreQueryResults.current = true;
        }
    }, []);
    const activateSearch = useCallback(() => {
        setInputIsFocused(true);
    }, []);
    const exitSearch = useCallback(() => {
        setInputIsFocused(false);
        inputRef.current?.blur();
        clearState();
        onSearchExit?.();
    }, [clearState, onSearchExit]);
    useEffect(() => {
        if (disabled)
            return;
        const clickListener = (event) => {
            if (!(event.target instanceof HTMLElement))
                return;
            const isInputClick = searchBarRef.current?.contains(event.target);
            if (isInputClick)
                return;
            if ((inputIsFocused && !query) || clearSearchOnClickOutside) {
                exitSearch();
            }
        };
        document.addEventListener('click', clickListener);
        return () => document.removeEventListener('click', clickListener);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disabled, inputIsFocused, query, exitSearch, clearSearchOnClickOutside]);
    useEffect(() => {
        if (!inputRef.current || disabled)
            return;
        const handleKeyDown = (event) => {
            if (event.key === 'Escape')
                return exitSearch();
        };
        inputRef.current.addEventListener('keydown', handleKeyDown);
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            inputRef.current?.removeEventListener('keydown', handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disabled]);
    const selectResult = useCallback(async (result) => {
        if (!client.userID)
            return;
        if (onSelectResult) {
            await onSelectResult({
                setQuery,
                setResults,
                setSearching,
            }, result);
            return;
        }
        let selectedChannel;
        if (isChannel(result)) {
            setActiveChannel(result);
            selectedChannel = result;
        }
        else {
            const newChannel = client.channel(channelType, { members: [client.userID, result.id] });
            await newChannel.watch();
            setActiveChannel(newChannel);
            selectedChannel = newChannel;
        }
        setChannels?.((channels) => uniqBy([selectedChannel, ...channels], 'cid'));
        if (clearSearchOnClickOutside) {
            exitSearch();
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clearSearchOnClickOutside, client, exitSearch, onSelectResult, setActiveChannel, setChannels]);
    const getChannels = useCallback(async (text) => {
        let results = [];
        try {
            const userQueryPromise = client.queryUsers(
            // @ts-expect-error
            {
                $or: [{ id: { $autocomplete: text } }, { name: { $autocomplete: text } }],
                id: { $ne: client.userID },
                ...searchQueryParams?.userFilters?.filters,
            }, { id: 1, ...searchQueryParams?.userFilters?.sort }, { limit: 8, ...searchQueryParams?.userFilters?.options });
            if (!searchForChannels) {
                searchQueryPromiseInProgress.current = userQueryPromise;
                const { users } = await searchQueryPromiseInProgress.current;
                results = users;
            }
            else {
                const channelQueryPromise = client.queryChannels(
                // @ts-expect-error
                {
                    name: { $autocomplete: text },
                    ...searchQueryParams?.channelFilters?.filters,
                }, searchQueryParams?.channelFilters?.sort || {}, { limit: 5, ...searchQueryParams?.channelFilters?.options });
                searchQueryPromiseInProgress.current = Promise.all([
                    channelQueryPromise,
                    userQueryPromise,
                ]);
                const [channels, { users }] = await searchQueryPromiseInProgress.current;
                results = [...channels, ...users];
            }
        }
        catch (error) {
            console.error(error);
        }
        setSearching(false);
        if (!shouldIgnoreQueryResults.current) {
            setResults(results);
        }
        else {
            shouldIgnoreQueryResults.current = false;
        }
        searchQueryPromiseInProgress.current = undefined;
    }, [client, searchForChannels, searchQueryParams]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const scheduleGetChannels = useCallback(debounce(getChannels, searchDebounceIntervalMs), [
        getChannels,
        searchDebounceIntervalMs,
    ]);
    const onSearch = useCallback((event) => {
        event.preventDefault();
        if (disabled)
            return;
        if (searchFunction) {
            searchFunction({
                setQuery,
                setResults,
                setSearching,
            }, event);
        }
        else if (event.target.value) {
            setSearching(true);
            setQuery(event.target.value);
            scheduleGetChannels(event.target.value);
        }
        else if (!event.target.value) {
            clearState();
            scheduleGetChannels.cancel();
        }
        onSearchCallback?.(event);
    }, [clearState, disabled, scheduleGetChannels, onSearchCallback, searchFunction]);
    return {
        activateSearch,
        clearState,
        exitSearch,
        inputIsFocused,
        inputRef,
        onSearch,
        query,
        results,
        searchBarRef,
        searching,
        selectResult,
    };
};
