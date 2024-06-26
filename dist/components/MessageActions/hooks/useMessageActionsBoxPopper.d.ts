/// <reference types="react" />
import { Placement } from '@popperjs/core';
export interface MessageActionsBoxPopperOptions {
    open: boolean;
    placement: Placement;
    referenceElement: HTMLElement | null;
}
export declare function useMessageActionsBoxPopper<T extends HTMLElement>({ open, placement, referenceElement, }: MessageActionsBoxPopperOptions): {
    attributes: {
        [key: string]: {
            [key: string]: string;
        } | undefined;
    };
    popperElementRef: import("react").RefObject<T>;
    styles: {
        [key: string]: import("react").CSSProperties;
    };
};
