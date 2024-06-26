import React from 'react';
import { SpriteImageProps } from './SpriteImage';
import type { Readable } from '../../types/types';
declare const StreamSpriteEmojiPositions: {
    angry: number[];
    haha: number[];
    like: number[];
    love: number[];
    sad: number[];
    wow: number[];
};
type StreamEmojiType = keyof typeof StreamSpriteEmojiPositions;
export declare const StreamEmoji: ({ fallback, type, }: Readable<{
    type: StreamEmojiType;
} & Pick<SpriteImageProps, 'fallback'>>) => React.JSX.Element;
export {};
