import React, { PropsWithChildren } from 'react';
export type LoadMoreButtonProps = {
    /** onClick handler load more button. Pagination logic should be executed in this handler. */
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    /** indicates whether a loading request is in progress */
    isLoading?: boolean;
    /**
     * @desc If true, LoadingIndicator is displayed instead of button
     * @deprecated Use loading prop instead of refreshing. Planned for removal: https://github.com/GetStream/stream-chat-react/issues/1804
     */
    refreshing?: boolean;
};
export declare const LoadMoreButton: ({ children, isLoading, onClick, refreshing, }: PropsWithChildren<LoadMoreButtonProps>) => React.JSX.Element;
