import React from 'react';
import { AvatarProps } from '../Avatar';
export type UserItemProps = {
    /** The user */
    entity: {
        /** The parts of the Name property of the entity (or id if no name) that can be matched to the user input value.
         * Default is bold for matches, but can be overwritten in css.
         * */
        itemNameParts: {
            match: string;
            parts: string[];
        };
        /** Id of the user */
        id?: string;
        /** Image of the user */
        image?: string;
        /** Name of the user */
        name?: string;
    };
    /** Custom UI component to display user avatar, defaults to and accepts same props as: [Avatar](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Avatar/Avatar.tsx) */
    Avatar?: React.ComponentType<AvatarProps>;
};
export declare const UserItem: ({ Avatar, entity }: UserItemProps) => React.JSX.Element;
