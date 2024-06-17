import { useCallback, useReducer, useState } from 'react';
import { nanoid } from 'nanoid';
import { useChannelStateContext } from '../../../context/ChannelStateContext';
import { useAttachments } from './useAttachments';
import { useLinkPreviews } from './useLinkPreviews';
import { useMessageInputText } from './useMessageInputText';
import { useSubmitHandler } from './useSubmitHandler';
import { usePasteHandler } from './usePasteHandler';
import { useMediaRecorder } from '../../MediaRecorder/hooks/useMediaRecorder';
import { LinkPreviewState, SetLinkPreviewMode } from '../types';
import { mergeDeep } from '../../../utils/mergeDeep';
const makeEmptyMessageInputState = () => ({
    attachments: [],
    fileOrder: [],
    fileUploads: {},
    imageOrder: [],
    imageUploads: {},
    linkPreviews: new Map(),
    mentioned_users: [],
    setText: () => null,
    text: '',
});
/**
 * Initializes the state. Empty if the message prop is falsy.
 */
const initState = (message) => {
    if (!message) {
        return makeEmptyMessageInputState();
    }
    // if message prop is defined, get image uploads, file uploads, text, etc.
    const imageUploads = message.attachments
        ?.filter(({ type }) => type === 'image')
        .reduce((acc, { author_name, fallback = '', image_url, og_scrape_url, text, title, title_link }) => {
        const id = nanoid();
        acc[id] = {
            author_name,
            file: {
                name: fallback,
            },
            id,
            og_scrape_url, // fixme: why scraped content is mixed with uploaded content?
            state: 'finished',
            text,
            title,
            title_link,
            url: image_url,
        };
        return acc;
    }, {}) ?? {};
    const fileUploads = message.attachments
        ?.filter(({ type }) => type === 'file')
        .reduce((acc, { asset_url, file_size, mime_type, thumb_url, title = '' }) => {
        const id = nanoid();
        acc[id] = {
            file: {
                name: title,
                size: file_size,
                type: mime_type,
            },
            id,
            state: 'finished',
            thumb_url,
            url: asset_url,
        };
        return acc;
    }, {}) ?? {};
    const linkPreviews = message.attachments?.reduce((acc, attachment) => {
        if (!attachment.og_scrape_url)
            return acc;
        acc.set(attachment.og_scrape_url, {
            ...attachment,
            state: LinkPreviewState.LOADED,
        });
        return acc;
    }, new Map()) ?? new Map();
    const imageOrder = Object.keys(imageUploads);
    const fileOrder = Object.keys(fileUploads);
    const attachments = message.attachments
        ?.filter(({ type }) => type !== 'file' && type !== 'image')
        .map((att) => ({
        ...att,
        localMetadata: { id: nanoid() },
    })) || [];
    const mentioned_users = message.mentioned_users || [];
    return {
        attachments,
        fileOrder,
        fileUploads,
        imageOrder,
        imageUploads,
        linkPreviews,
        mentioned_users,
        setText: () => null,
        text: message.text || '',
    };
};
/**
 * MessageInput state reducer
 */
const messageInputReducer = (state, action) => {
    switch (action.type) {
        case 'setText':
            return { ...state, text: action.getNewText(state.text) };
        case 'clear':
            return makeEmptyMessageInputState();
        case 'upsertAttachments': {
            const attachments = [...state.attachments];
            action.attachments.forEach((actionAttachment) => {
                const attachmentIndex = state.attachments.findIndex((att) => att.localMetadata?.id && att.localMetadata?.id === actionAttachment.localMetadata?.id);
                if (attachmentIndex === -1) {
                    attachments.push(actionAttachment);
                }
                else {
                    const upsertedAttachment = mergeDeep(state.attachments[attachmentIndex] ?? {}, actionAttachment);
                    attachments.splice(attachmentIndex, 1, upsertedAttachment);
                }
            });
            return {
                ...state,
                attachments,
            };
        }
        case 'removeAttachments': {
            return {
                ...state,
                attachments: state.attachments.filter((att) => !action.ids.includes(att.localMetadata?.id)),
            };
        }
        case 'setImageUpload': {
            const imageAlreadyExists = state.imageUploads[action.id];
            if (!imageAlreadyExists && !action.file)
                return state;
            const imageOrder = imageAlreadyExists ? state.imageOrder : state.imageOrder.concat(action.id);
            const newUploadFields = { ...action };
            delete newUploadFields.type;
            return {
                ...state,
                imageOrder,
                imageUploads: {
                    ...state.imageUploads,
                    [action.id]: { ...state.imageUploads[action.id], ...newUploadFields },
                },
            };
        }
        case 'setFileUpload': {
            const fileAlreadyExists = state.fileUploads[action.id];
            if (!fileAlreadyExists && !action.file)
                return state;
            const fileOrder = fileAlreadyExists ? state.fileOrder : state.fileOrder.concat(action.id);
            const newUploadFields = { ...action };
            delete newUploadFields.type;
            return {
                ...state,
                fileOrder,
                fileUploads: {
                    ...state.fileUploads,
                    [action.id]: { ...state.fileUploads[action.id], ...newUploadFields },
                },
            };
        }
        case 'setLinkPreviews': {
            const linkPreviews = new Map(state.linkPreviews);
            if (action.mode === SetLinkPreviewMode.REMOVE) {
                Array.from(action.linkPreviews.keys()).forEach((key) => {
                    linkPreviews.delete(key);
                });
            }
            else {
                Array.from(action.linkPreviews.values()).reduce((acc, linkPreview) => {
                    const existingPreview = acc.get(linkPreview.og_scrape_url);
                    const alreadyEnqueued = linkPreview.state === LinkPreviewState.QUEUED &&
                        existingPreview?.state !== LinkPreviewState.FAILED;
                    if (existingPreview && alreadyEnqueued)
                        return acc;
                    acc.set(linkPreview.og_scrape_url, linkPreview);
                    return acc;
                }, linkPreviews);
                if (action.mode === SetLinkPreviewMode.SET) {
                    Array.from(state.linkPreviews.keys()).forEach((key) => {
                        if (!action.linkPreviews.get(key))
                            linkPreviews.delete(key);
                    });
                }
            }
            return {
                ...state,
                linkPreviews,
            };
        }
        case 'removeImageUpload': {
            if (!state.imageUploads[action.id])
                return state; // cannot remove anything
            const newImageUploads = { ...state.imageUploads };
            delete newImageUploads[action.id];
            return {
                ...state,
                imageOrder: state.imageOrder.filter((_id) => _id !== action.id),
                imageUploads: newImageUploads,
            };
        }
        case 'removeFileUpload': {
            if (!state.fileUploads[action.id])
                return state; // cannot remove anything
            const newFileUploads = { ...state.fileUploads };
            delete newFileUploads[action.id];
            return {
                ...state,
                fileOrder: state.fileOrder.filter((_id) => _id !== action.id),
                fileUploads: newFileUploads,
            };
        }
        case 'addMentionedUser':
            return {
                ...state,
                mentioned_users: state.mentioned_users.concat(action.user),
            };
        default:
            return state;
    }
};
/**
 * hook for MessageInput state
 */
export const useMessageInputState = (props) => {
    const { additionalTextareaProps, asyncMessagesMultiSendEnabled, audioRecordingConfig, audioRecordingEnabled, getDefaultValue, message, urlEnrichmentConfig, } = props;
    const { channelCapabilities = {}, enrichURLForPreview: enrichURLForPreviewChannelContext, } = useChannelStateContext('useMessageInputState');
    const defaultValue = getDefaultValue?.() || additionalTextareaProps?.defaultValue;
    const initialStateValue = message ||
        (Array.isArray(defaultValue)
            ? { text: defaultValue.join('') }
            : { text: defaultValue?.toString() });
    const [state, dispatch] = useReducer(messageInputReducer, initialStateValue, initState);
    const enrichURLsController = useLinkPreviews({
        dispatch,
        linkPreviews: state.linkPreviews,
        ...urlEnrichmentConfig,
        enrichURLForPreview: urlEnrichmentConfig?.enrichURLForPreview ?? enrichURLForPreviewChannelContext,
    });
    const { handleChange, insertText, textareaRef } = useMessageInputText(props, state, dispatch, enrichURLsController.findAndEnqueueURLsToEnrich);
    const [showCommandsList, setShowCommandsList] = useState(false);
    const [showMentionsList, setShowMentionsList] = useState(false);
    const openCommandsList = () => {
        dispatch({
            getNewText: () => '/',
            type: 'setText',
        });
        setShowCommandsList(true);
    };
    const closeCommandsList = () => setShowCommandsList(false);
    const openMentionsList = () => {
        dispatch({
            getNewText: (currentText) => currentText + '@',
            type: 'setText',
        });
        setShowMentionsList(true);
    };
    const closeMentionsList = () => setShowMentionsList(false);
    const { maxFilesLeft, numberOfUploads, removeAttachments, removeFile, removeImage, uploadAttachment, uploadFile, uploadImage, uploadNewFiles, upsertAttachments, } = useAttachments(props, state, dispatch, textareaRef);
    const { handleSubmit } = useSubmitHandler(props, state, dispatch, numberOfUploads, enrichURLsController);
    const recordingController = useMediaRecorder({
        asyncMessagesMultiSendEnabled,
        enabled: !!audioRecordingEnabled,
        handleSubmit,
        recordingConfig: audioRecordingConfig,
        uploadAttachment,
    });
    const isUploadEnabled = !!channelCapabilities['upload-file'];
    const { onPaste } = usePasteHandler(uploadNewFiles, insertText, isUploadEnabled, enrichURLsController.findAndEnqueueURLsToEnrich);
    const onSelectUser = useCallback((item) => {
        dispatch({ type: 'addMentionedUser', user: item });
    }, []);
    const setText = useCallback((text) => {
        dispatch({ getNewText: () => text, type: 'setText' });
    }, []);
    return {
        ...state,
        ...enrichURLsController,
        closeCommandsList,
        closeMentionsList,
        handleChange,
        handleSubmit,
        insertText,
        isUploadEnabled,
        maxFilesLeft,
        numberOfUploads,
        onPaste,
        onSelectUser,
        openCommandsList,
        openMentionsList,
        recordingController,
        removeAttachments,
        removeFile,
        removeImage,
        setText,
        showCommandsList,
        showMentionsList,
        textareaRef,
        uploadAttachment,
        uploadFile,
        uploadImage,
        uploadNewFiles,
        upsertAttachments,
    };
};
