/* eslint-disable typescript-sort-keys/interface */
import React, { useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import Picker from '@emoji-mart/react';
import { useMessageInputContext, useTranslationContext } from '../../context';
import { EmojiPickerIcon } from '../MessageInput/icons';
const isShadowRoot = (node) => !!node.host;
const classNames = {
    buttonClassName: 'str-chat__emoji-picker-button',
    pickerContainerClassName: 'str-chat__message-textarea-emoji-picker-container',
    wrapperClassName: 'str-chat__message-textarea-emoji-picker',
};
export const EmojiPicker = (props) => {
    const { t } = useTranslationContext('EmojiPicker');
    const { insertText, textareaRef } = useMessageInputContext('EmojiPicker');
    const [displayPicker, setDisplayPicker] = useState(false);
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { attributes, styles } = usePopper(referenceElement, popperElement, {
        placement: 'top-end',
        ...props.popperOptions,
    });
    const { buttonClassName, pickerContainerClassName, wrapperClassName } = classNames;
    const { ButtonIconComponent = EmojiPickerIcon } = props;
    useEffect(() => {
        if (!popperElement || !referenceElement)
            return;
        const handlePointerDown = (e) => {
            const target = e.target;
            const rootNode = target.getRootNode();
            if (popperElement.contains(isShadowRoot(rootNode) ? rootNode.host : target) ||
                referenceElement.contains(target)) {
                return;
            }
            setDisplayPicker(false);
        };
        window.addEventListener('pointerdown', handlePointerDown);
        return () => window.removeEventListener('pointerdown', handlePointerDown);
    }, [referenceElement, popperElement]);
    return (React.createElement("div", { className: props.wrapperClassName ?? wrapperClassName },
        displayPicker && (React.createElement("div", { className: props.pickerContainerClassName ?? pickerContainerClassName, style: styles.popper, ...attributes.popper, ref: setPopperElement },
            React.createElement(Picker, { data: async () => (await import('@emoji-mart/data')).default, onEmojiSelect: (e) => {
                    insertText(e.native);
                    textareaRef.current?.focus();
                    if (props.closeOnEmojiSelect) {
                        setDisplayPicker(false);
                    }
                }, ...props.pickerProps }))),
        React.createElement("button", { "aria-expanded": displayPicker, "aria-label": t('aria/Emoji picker'), className: props.buttonClassName ?? buttonClassName, onClick: () => setDisplayPicker((cv) => !cv), ref: setReferenceElement, type: 'button' }, ButtonIconComponent && React.createElement(ButtonIconComponent, null))));
};
