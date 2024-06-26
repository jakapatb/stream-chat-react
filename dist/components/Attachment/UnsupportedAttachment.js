import React from 'react';
import { FileIcon } from '../ReactFileUtilities';
import { useTranslationContext } from '../../context';
export const UnsupportedAttachment = ({ attachment, }) => {
    const { t } = useTranslationContext('UnsupportedAttachment');
    return (React.createElement("div", { className: 'str-chat__message-attachment-unsupported', "data-testid": 'attachment-unsupported' },
        React.createElement(FileIcon, { className: 'str-chat__file-icon' }),
        React.createElement("div", { className: 'str-chat__message-attachment-unsupported__metadata' },
            React.createElement("div", { className: 'str-chat__message-attachment-unsupported__title', "data-testid": 'unsupported-attachment-title' }, attachment.title || t('Unsupported attachment')))));
};
