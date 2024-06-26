import React, { PropsWithChildren } from 'react';
/**
 * Similar to a regular anchor tag, but it sanitizes the href value and prevents XSS
 */
export type SafeAnchorProps = {
    /** Set the className for the anchor tag element */
    className?: string;
    /** Specifies that the target (href attribute) will be downloaded instead of navigating to a file */
    download?: boolean;
    /** Set the href attribute for the anchor tag element */
    href?: string;
    /** Set the rel attribute for the anchor tag element */
    rel?: string;
    /** Set the target attribute for the anchor tag element */
    target?: string;
};
export declare const SafeAnchor: (props: PropsWithChildren<SafeAnchorProps>) => React.JSX.Element | null;
