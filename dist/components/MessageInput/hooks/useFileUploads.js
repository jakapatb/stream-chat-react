import { useCallback, useEffect } from 'react';
import { checkUploadPermissions } from './utils';
import { useChannelActionContext } from '../../../context/ChannelActionContext';
import { useChannelStateContext } from '../../../context/ChannelStateContext';
import { useChatContext } from '../../../context/ChatContext';
import { useTranslationContext } from '../../../context/TranslationContext';
export const useFileUploads = (props, state, dispatch) => {
    const { doFileUploadRequest, errorHandler } = props;
    const { fileUploads } = state;
    const { channel } = useChannelStateContext('useFileUploads');
    const { addNotification } = useChannelActionContext('useFileUploads');
    const { getAppSettings } = useChatContext('useFileUploads');
    const { t } = useTranslationContext('useFileUploads');
    const uploadFile = useCallback((id) => {
        dispatch({ id, state: 'uploading', type: 'setFileUpload' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const removeFile = useCallback((id) => {
        // TODO: cancel upload if still uploading
        dispatch({ id, type: 'removeFileUpload' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        (async () => {
            const upload = Object.values(fileUploads).find((fileUpload) => fileUpload.state === 'uploading' && fileUpload.file);
            if (!upload)
                return;
            const { file, id } = upload;
            const canUpload = await checkUploadPermissions({
                addNotification,
                file,
                getAppSettings,
                t,
                uploadType: 'file',
            });
            if (!canUpload)
                return removeFile(id);
            let response;
            try {
                if (doFileUploadRequest) {
                    response = await doFileUploadRequest(file, channel);
                }
                else {
                    response = await channel.sendFile(file);
                }
            }
            catch (error) {
                const errorMessage = typeof error.message === 'string'
                    ? error.message
                    : t('Error uploading file');
                addNotification(errorMessage, 'error');
                let alreadyRemoved = false;
                if (!fileUploads[id]) {
                    alreadyRemoved = true;
                }
                else {
                    dispatch({ id, state: 'failed', type: 'setFileUpload' });
                }
                if (!alreadyRemoved && errorHandler) {
                    // TODO: verify if the parameters passed to the error handler actually make sense
                    errorHandler(error, 'upload-file', file);
                }
                return;
            }
            // If doImageUploadRequest returns any falsy value, then don't create the upload preview.
            // This is for the case if someone wants to handle failure on app level.
            if (!response) {
                removeFile(id);
                return;
            }
            dispatch({
                id,
                state: 'finished',
                thumb_url: response.thumb_url,
                type: 'setFileUpload',
                url: response.file,
            });
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileUploads, channel, doFileUploadRequest, errorHandler, removeFile]);
    return {
        removeFile,
        uploadFile,
    };
};
