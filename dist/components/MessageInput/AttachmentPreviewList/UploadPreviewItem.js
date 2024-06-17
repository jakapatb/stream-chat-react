import React, { useCallback, useMemo } from 'react';
import { FileAttachmentPreview } from './FileAttachmentPreview';
import { ImageAttachmentPreview } from './ImageAttachmentPreview';
import { useMessageInputContext } from '../../../context';
export const ImageUploadPreviewAdapter = ({ id, Preview = ImageAttachmentPreview, }) => {
    const { imageUploads, removeImage, uploadImage } = useMessageInputContext('ImageUploadPreviewAdapter');
    const removeAttachments = useCallback((ids) => removeImage(ids[0]), [removeImage]);
    const handleRetry = useCallback((attachment) => attachment.localMetadata && uploadImage(attachment.localMetadata.id), [uploadImage]);
    const image = imageUploads[id];
    const attachment = useMemo(() => 
    // do not display scraped attachments
    !image || image.og_scrape_url
        ? undefined
        : {
            image_url: image.previewUri ?? image.url,
            localMetadata: {
                file: image.file,
                id,
                uploadState: image.state,
            },
            title: image.file.name,
            type: 'image',
        }, [id, image]);
    if (!attachment)
        return null;
    return (React.createElement(Preview, { attachment: attachment, handleRetry: handleRetry, removeAttachments: removeAttachments }));
};
export const FileUploadPreviewAdapter = ({ id, Preview = FileAttachmentPreview, }) => {
    const { fileUploads, removeFile, uploadFile } = useMessageInputContext('FileUploadPreviewAdapter');
    const removeAttachments = useCallback((ids) => {
        removeFile(ids[0]);
    }, [removeFile]);
    const handleRetry = useCallback((attachment) => attachment.localMetadata && uploadFile(attachment.localMetadata.id), [uploadFile]);
    const file = fileUploads[id];
    const attachment = useMemo(() => !file
        ? undefined
        : {
            asset_url: file.url,
            localMetadata: {
                file: file.file,
                id,
                uploadState: file.state,
            },
            mime_type: file.file.type,
            title: file.file.name,
            type: 'file',
        }, [file, id]);
    if (!attachment)
        return null;
    return (React.createElement(Preview, { attachment: attachment, handleRetry: handleRetry, removeAttachments: removeAttachments }));
};
