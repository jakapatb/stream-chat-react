import React, { PropsWithChildren } from 'react';
export type ImageDropzoneProps = {
    /**
     * Set accepted file types. See https://github.com/okonet/attr-accept for more information. Keep in mind that mime type determination is not reliable across platforms. CSV files, for example, are reported as text/plain under macOS but as application/vnd.ms-excel under Windows. In some cases there might not be a mime type set at all.
     *
     * One of type: `string, string[]`
     */
    accept?: string | string[];
    /** Enable/disable the dropzone */
    disabled?: boolean;
    handleFiles?: (files: FileList | File[]) => void;
    maxNumberOfFiles?: number;
    /** Allow drag 'n' drop (or selection from the file dialog) of multiple files */
    multiple?: boolean;
};
export declare const ImageDropzone: ({ accept: acceptedFiles, children, disabled, handleFiles, maxNumberOfFiles, multiple, }: PropsWithChildren<ImageDropzoneProps>) => React.JSX.Element;
