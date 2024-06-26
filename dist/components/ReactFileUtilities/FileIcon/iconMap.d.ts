import { GeneralType, SupportedMimeType } from './mimeTypes';
import type { ComponentType } from 'react';
import type { IconProps } from './FileIconSet';
export type IconType = 'standard' | 'alt';
type IconMap = {
    standard: Record<SupportedMimeType | GeneralType | 'fallback', ComponentType<IconProps>>;
    alt?: Record<SupportedMimeType | GeneralType | 'fallback', ComponentType<IconProps>>;
};
export declare const iconMap: IconMap;
export {};
