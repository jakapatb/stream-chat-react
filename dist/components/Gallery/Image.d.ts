import React, { CSSProperties, MutableRefObject } from 'react';
import type { Attachment } from 'stream-chat';
import type { DefaultStreamChatGenerics, Dimensions } from '../../types/types';
export type ImageProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    dimensions?: Dimensions;
    innerRef?: MutableRefObject<HTMLImageElement | null>;
    previewUrl?: string;
    style?: CSSProperties;
} & ({
    /** The text fallback for the image */
    fallback?: string;
    /** The full size image url */
    image_url?: string;
    /** The thumb url */
    thumb_url?: string;
} | Attachment<StreamChatGenerics>);
/**
 * A simple component that displays an image.
 */
export declare const ImageComponent: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: ImageProps<StreamChatGenerics>) => React.JSX.Element;
