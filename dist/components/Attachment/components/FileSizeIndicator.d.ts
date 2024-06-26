import React from 'react';
type FileSizeIndicatorProps = {
    /** file size in byte */
    fileSize?: number;
    /**
     The maximum number of fraction digits to display. If not set, the default behavior is to round to 3 significant digits.
     @default undefined
     */
    maximumFractionDigits?: number;
};
export declare const FileSizeIndicator: ({ fileSize, maximumFractionDigits }: FileSizeIndicatorProps) => React.JSX.Element | null;
export {};
