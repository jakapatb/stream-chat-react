import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { SearchIcon } from './icons';
import { ChannelPreview } from '../ChannelPreview';
import { isChannel } from './utils';
import { Avatar } from '../Avatar';
import { useTranslationContext } from '../../context';
const DefaultSearchEmpty = () => {
    const { t } = useTranslationContext('SearchResults');
    return (React.createElement("div", { "aria-live": 'polite', className: 'str-chat__channel-search-container-empty' },
        React.createElement(SearchIcon, null),
        t('No results found')));
};
const DefaultSearchResultsHeader = ({ results, }) => {
    const { t } = useTranslationContext('SearchResultsHeader');
    return (React.createElement("div", { className: 'str-chat__channel-search-results-header', "data-testid": 'channel-search-results-header' }, t('searchResultsCount', {
        count: results.length,
    })));
};
const DefaultSearchResultsList = (props) => {
    const { focusedUser, results, SearchResultItem, selectResult } = props;
    return (React.createElement(React.Fragment, null, results.map((result, index) => (React.createElement(SearchResultItem, { focusedUser: focusedUser, index: index, key: index, result: result, selectResult: selectResult })))));
};
const DefaultSearchResultItem = (props) => {
    const { focusedUser, index, result, selectResult } = props;
    const focused = focusedUser === index;
    const className = clsx('str-chat__channel-search-result', focused && 'str-chat__channel-search-result--focused');
    if (isChannel(result)) {
        const channel = result;
        return (React.createElement(ChannelPreview, { channel: channel, className: className, onSelect: () => selectResult(channel) }));
    }
    else {
        return (React.createElement("button", { "aria-label": `Select User Channel: ${result.name || ''}`, className: className, "data-testid": 'channel-search-result-user', onClick: () => selectResult(result), role: 'option' },
            React.createElement(Avatar, { className: 'str-chat__avatar--channel-preview', image: result.image, name: result.name || result.id, user: result }),
            React.createElement("div", { className: 'str-chat__channel-search-result--display-name' }, result.name || result.id)));
    }
};
const ResultsContainer = ({ children, popupResults, }) => {
    const { t } = useTranslationContext('ResultsContainer');
    return (React.createElement("div", { "aria-label": t('aria/Channel search results'), className: clsx(`str-chat__channel-search-result-list`, popupResults ? 'popup' : 'inline') }, children));
};
export const SearchResults = (props) => {
    const { popupResults, results, searching, SearchEmpty = DefaultSearchEmpty, SearchResultsHeader = DefaultSearchResultsHeader, SearchLoading, SearchResultItem = DefaultSearchResultItem, SearchResultsList = DefaultSearchResultsList, selectResult, } = props;
    const { t } = useTranslationContext('SearchResults');
    const [focusedResult, setFocusedResult] = useState();
    const handleKeyDown = useCallback((event) => {
        if (event.key === 'ArrowUp') {
            setFocusedResult((prevFocused) => {
                if (prevFocused === undefined)
                    return 0;
                return prevFocused === 0 ? results.length - 1 : prevFocused - 1;
            });
        }
        if (event.key === 'ArrowDown') {
            setFocusedResult((prevFocused) => {
                if (prevFocused === undefined)
                    return 0;
                return prevFocused === results.length - 1 ? 0 : prevFocused + 1;
            });
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            if (focusedResult !== undefined) {
                selectResult(results[focusedResult]);
                return setFocusedResult(undefined);
            }
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [focusedResult]);
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown, false);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
    if (searching) {
        return (React.createElement(ResultsContainer, { popupResults: popupResults }, SearchLoading ? (React.createElement(SearchLoading, null)) : (React.createElement("div", { className: 'str-chat__channel-search-container-searching', "data-testid": 'search-in-progress-indicator' }, t('Searching...')))));
    }
    if (!results.length) {
        return (React.createElement(ResultsContainer, { popupResults: popupResults },
            React.createElement(SearchEmpty, null)));
    }
    return (React.createElement(ResultsContainer, { popupResults: popupResults },
        React.createElement(SearchResultsHeader, { results: results }),
        React.createElement(SearchResultsList, { focusedUser: focusedResult, results: results, SearchResultItem: SearchResultItem, selectResult: selectResult })));
};
