import clsx from 'clsx';
import { CloseIcon, LoadingIndicatorIcon, RetryIcon } from '../icons';
import React, { useCallback, useState } from 'react';
import { BaseImage as DefaultBaseImage } from '../../Gallery';
import { useComponentContext, useTranslationContext } from '../../../context';
export const ImageAttachmentPreview = ({ attachment, handleRetry, removeAttachments, }) => {
    const { t } = useTranslationContext('ImagePreviewItem');
    const { BaseImage = DefaultBaseImage } = useComponentContext('ImagePreview');
    const [previewError, setPreviewError] = useState(false);
    const { id, uploadState } = attachment.localMetadata ?? {};
    const handleLoadError = useCallback(() => setPreviewError(true), []);
    return (React.createElement("div", { className: clsx('str-chat__attachment-preview-image', {
            'str-chat__attachment-preview-image--error': previewError,
        }), "data-testid": 'attachment-preview-image' },
        React.createElement("button", { "aria-label": t('aria/Remove attachment'), className: 'str-chat__attachment-preview-delete', "data-testid": 'image-preview-item-delete-button', disabled: uploadState === 'uploading', onClick: () => id && removeAttachments([id]) },
            React.createElement(CloseIcon, null)),
        uploadState === 'failed' && (React.createElement("button", { className: 'str-chat__attachment-preview-error str-chat__attachment-preview-error-image', "data-testid": 'image-preview-item-retry-button', onClick: () => handleRetry(attachment) },
            React.createElement(RetryIcon, null))),
        uploadState === 'uploading' && (React.createElement("div", { className: 'str-chat__attachment-preview-image-loading' },
            React.createElement(LoadingIndicatorIcon, { size: 17 }))),
        attachment.image_url && (React.createElement(BaseImage, { alt: attachment.title, className: 'str-chat__attachment-preview-thumbnail', onError: handleLoadError, src: attachment.image_url, title: attachment.title }))));
};
