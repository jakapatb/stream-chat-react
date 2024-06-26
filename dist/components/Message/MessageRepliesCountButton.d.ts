import React, { MouseEventHandler } from 'react';
export type MessageRepliesCountButtonProps = {
    labelPlural?: string;
    labelSingle?: string;
    onClick?: MouseEventHandler;
    reply_count?: number;
};
export declare const MessageRepliesCountButton: (props: MessageRepliesCountButtonProps) => React.JSX.Element | null;
