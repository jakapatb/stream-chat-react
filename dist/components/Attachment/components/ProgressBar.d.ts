import React from 'react';
export type ProgressBarProps = {
    /** Progress expressed in fractional number value btw 0 and 100. */
    progress: number;
} & Pick<React.ComponentProps<'div'>, 'onClick'>;
export declare const ProgressBar: ({ onClick, progress }: ProgressBarProps) => React.JSX.Element;
