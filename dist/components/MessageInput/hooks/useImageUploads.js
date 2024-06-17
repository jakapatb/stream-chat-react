import { useCallback, useEffect } from 'react';
import { checkUploadPermissions } from './utils';
import { useChannelActionContext } from '../../../context/ChannelActionContext';
import { useChannelStateContext } from '../../../context/ChannelStateContext';
import { useChatContext } from '../../../context/ChatContext';
import { useTranslationContext } from '../../../context/TranslationContext';
export const useImageUploads = (props, state, dispatch) => {
    const { doImageUploadRequest, errorHandler } = props;
    const { imageUploads } = state;
    const { channel } = useChannelStateContext('useImageUploads');
    const { getAppSettings } = useChatContext('useImageUploads');
    const { addNotification } = useChannelActionContext('useImageUploads');
    const { t } = useTranslationContext('useImageUploads');
    const removeImage = useCallback((id) => {
        dispatch({ id, type: 'removeImageUpload' });
        // TODO: cancel upload if still uploading
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const uploadImage = useCallback(async (id) => {
        const img = imageUploads[id];
        if (!img)
            return;
        const { file } = img;
        if (img.state !== 'uploading') {
            dispatch({ id, state: 'uploading', type: 'setImageUpload' });
        }
        const canUpload = await checkUploadPermissions({
            addNotification,
            file,
            getAppSettings,
            t,
            uploadType: 'image',
        });
        if (!canUpload)
            return removeImage(id);
        let response;
        try {
            if (doImageUploadRequest) {
                response = await doImageUploadRequest(file, channel);
            }
            else {
                response = await channel.sendImage(file);
            }
        }
        catch (error) {
            const errorMessage = typeof error.message === 'string'
                ? error.message
                : t('Error uploading image');
            addNotification(errorMessage, 'error');
            let alreadyRemoved = false;
            if (!imageUploads[id]) {
                alreadyRemoved = true;
            }
            else {
                dispatch({ id, state: 'failed', type: 'setImageUpload' });
            }
            if (!alreadyRemoved && errorHandler) {
                // TODO: verify if the parameters passed to the error handler actually make sense
                errorHandler(error, 'upload-image', {
                    ...file,
                    id,
                });
            }
            return;
        }
        // If doImageUploadRequest returns any falsy value, then don't create the upload preview.
        // This is for the case if someone wants to handle failure on app level.
        if (!response) {
            removeImage(id);
            return;
        }
        if (img.previewUri)
            URL.revokeObjectURL?.(img.previewUri);
        dispatch({
            id,
            previewUri: undefined,
            state: 'finished',
            type: 'setImageUpload',
            url: response.file,
        });
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [imageUploads, channel, doImageUploadRequest, errorHandler, removeImage]);
    useEffect(() => {
        const upload = Object.values(imageUploads).find((imageUpload) => imageUpload.state === 'uploading' && imageUpload.file);
        if (!upload)
            return;
        uploadImage(upload.id);
    }, [imageUploads, uploadImage]);
    return {
        removeImage,
        uploadImage,
    };
};
