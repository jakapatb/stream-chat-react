import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { getWholeChar } from '../../utils';
/**
 * A round avatar image with fallback to username's first letter
 */
export const Avatar = (props) => {
    const { className, image, name, onClick = () => undefined, onMouseOver = () => undefined, } = props;
    const [error, setError] = useState(false);
    useEffect(() => {
        setError(false);
    }, [image]);
    const nameStr = name?.toString() || '';
    const initials = getWholeChar(nameStr, 0);
    const showImage = image && !error;
    return (React.createElement("div", { className: clsx(`str-chat__avatar str-chat__message-sender-avatar`, className, {
            ['str-chat__avatar--multiple-letters']: initials.length > 1,
            ['str-chat__avatar--one-letter']: initials.length === 1,
        }), "data-testid": 'avatar', onClick: onClick, onMouseOver: onMouseOver, title: name }, showImage ? (React.createElement("img", { alt: initials, className: clsx(`str-chat__avatar-image`), "data-testid": 'avatar-img', onError: () => setError(true), src: image })) : (React.createElement("div", { className: 'str-chat__avatar-fallback', "data-testid": 'avatar-fallback' }, initials))));
};
