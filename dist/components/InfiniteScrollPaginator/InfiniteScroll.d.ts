import React, { PropsWithChildren } from 'react';
import type { PaginatorProps } from '../../types/types';
export type InfiniteScrollProps = PaginatorProps & {
    className?: string;
    element?: React.ElementType;
    /**
     * @desc Flag signalling whether more pages with older items can be loaded
     * @deprecated Use hasPreviousPage prop instead. Planned for removal: https://github.com/GetStream/stream-chat-react/issues/1804
     */
    hasMore?: boolean;
    /**
     * @desc Flag signalling whether more pages with newer items can be loaded
     * @deprecated Use hasNextPage prop instead. Planned for removal: https://github.com/GetStream/stream-chat-react/issues/1804
     */
    hasMoreNewer?: boolean;
    /** Element to be rendered at the top of the thread message list. By default, Message and ThreadStart components */
    head?: React.ReactNode;
    initialLoad?: boolean;
    isLoading?: boolean;
    listenToScroll?: (offset: number, reverseOffset: number, threshold: number) => void;
    loader?: React.ReactNode;
    /**
     * @desc Function that loads previous page with older items
     * @deprecated Use loadPreviousPage prop instead. Planned for removal: https://github.com/GetStream/stream-chat-react/issues/1804
     */
    loadMore?: () => void;
    /**
     * @desc Function that loads next page with newer items
     * @deprecated Use loadNextPage prop instead. Planned for removal: https://github.com/GetStream/stream-chat-react/issues/1804
     */
    loadMoreNewer?: () => void;
    useCapture?: boolean;
};
export declare const InfiniteScroll: (props: PropsWithChildren<InfiniteScrollProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
