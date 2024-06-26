import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UploadButton } from '../ReactFileUtilities';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import { nanoid } from 'nanoid';
import { UploadIcon as DefaultUploadIcon } from './icons';
import { CooldownTimer as DefaultCooldownTimer } from './CooldownTimer';
import { SendButton as DefaultSendButton } from './SendButton';
import { AudioRecorder as DefaultAudioRecorder, RecordingPermissionDeniedNotification as DefaultRecordingPermissionDeniedNotification, StartRecordingAudioButton as DefaultStartRecordingAudioButton, RecordingPermission, } from '../MediaRecorder';
import { QuotedMessagePreview as DefaultQuotedMessagePreview, QuotedMessagePreviewHeader, } from './QuotedMessagePreview';
import { AttachmentPreviewList as DefaultAttachmentPreviewList } from './AttachmentPreviewList';
import { LinkPreviewList as DefaultLinkPreviewList } from './LinkPreviewList';
import { ChatAutoComplete } from '../ChatAutoComplete/ChatAutoComplete';
import { RecordingAttachmentType } from '../MediaRecorder/classes';
import { useChatContext } from '../../context/ChatContext';
import { useChannelActionContext } from '../../context/ChannelActionContext';
import { useChannelStateContext } from '../../context/ChannelStateContext';
import { useTranslationContext } from '../../context/TranslationContext';
import { useMessageInputContext } from '../../context/MessageInputContext';
import { useComponentContext } from '../../context/ComponentContext';
export const MessageInputFlat = () => {
    const { t } = useTranslationContext('MessageInputFlat');
    const { asyncMessagesMultiSendEnabled, attachments, cooldownRemaining, fileUploads, findAndEnqueueURLsToEnrich, handleSubmit, hideSendButton, imageUploads, isUploadEnabled, linkPreviews, maxFilesLeft, message, numberOfUploads, recordingController, setCooldownRemaining, text, uploadNewFiles, } = useMessageInputContext('MessageInputFlat');
    const { AudioRecorder = DefaultAudioRecorder, AttachmentPreviewList = DefaultAttachmentPreviewList, CooldownTimer = DefaultCooldownTimer, FileUploadIcon = DefaultUploadIcon, LinkPreviewList = DefaultLinkPreviewList, QuotedMessagePreview = DefaultQuotedMessagePreview, RecordingPermissionDeniedNotification = DefaultRecordingPermissionDeniedNotification, SendButton = DefaultSendButton, StartRecordingAudioButton = DefaultStartRecordingAudioButton, EmojiPicker, } = useComponentContext('MessageInputFlat');
    const { acceptedFiles = [], multipleUploads, quotedMessage, } = useChannelStateContext('MessageInputFlat');
    const { setQuotedMessage } = useChannelActionContext('MessageInputFlat');
    const { channel } = useChatContext('MessageInputFlat');
    const [showRecordingPermissionDeniedNotification, setShowRecordingPermissionDeniedNotification,] = useState(false);
    const closePermissionDeniedNotification = useCallback(() => {
        setShowRecordingPermissionDeniedNotification(false);
    }, []);
    const id = useMemo(() => nanoid(), []);
    const failedAttachmentsCount = useMemo(() => attachments.filter((a) => a.localMetadata?.uploadState === 'failed').length, [attachments]);
    const failedUploadsCount = useMemo(() => Object.values(fileUploads).filter((upload) => upload.state === 'failed').length +
        Object.values(imageUploads).filter((upload) => upload.state === 'failed').length, [fileUploads, imageUploads]);
    const accept = useMemo(() => acceptedFiles.reduce((mediaTypeMap, mediaType) => {
        mediaTypeMap[mediaType] ?? (mediaTypeMap[mediaType] = []);
        return mediaTypeMap;
    }, {}), [acceptedFiles]);
    const { getRootProps, isDragActive, isDragReject } = useDropzone({
        accept,
        disabled: !isUploadEnabled || maxFilesLeft === 0,
        multiple: multipleUploads,
        noClick: true,
        onDrop: uploadNewFiles,
    });
    useEffect(() => {
        const handleQuotedMessageUpdate = (e) => {
            if (e.message?.id !== quotedMessage?.id)
                return;
            if (e.type === 'message.deleted') {
                setQuotedMessage(undefined);
                return;
            }
            setQuotedMessage(e.message);
        };
        channel?.on('message.deleted', handleQuotedMessageUpdate);
        channel?.on('message.updated', handleQuotedMessageUpdate);
        return () => {
            channel?.off('message.deleted', handleQuotedMessageUpdate);
            channel?.off('message.updated', handleQuotedMessageUpdate);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [channel, quotedMessage]);
    if (recordingController.recordingState)
        return React.createElement(AudioRecorder, null);
    // TODO: "!message" condition is a temporary fix for shared
    // state when editing a message (fix shared state issue)
    const displayQuotedMessage = !message && quotedMessage && !quotedMessage.parent_id;
    const recordingEnabled = !!(recordingController.recorder && navigator.mediaDevices); // account for requirement on iOS as per this bug report: https://bugs.webkit.org/show_bug.cgi?id=252303
    const isRecording = !!recordingController.recordingState;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { ...getRootProps({ className: 'str-chat__message-input' }) },
            recordingEnabled &&
                recordingController.permissionState === 'denied' &&
                showRecordingPermissionDeniedNotification && (React.createElement(RecordingPermissionDeniedNotification, { onClose: closePermissionDeniedNotification, permissionName: RecordingPermission.MIC })),
            findAndEnqueueURLsToEnrich && (React.createElement(LinkPreviewList, { linkPreviews: Array.from(linkPreviews.values()) })),
            isDragActive && (React.createElement("div", { className: clsx('str-chat__dropzone-container', {
                    'str-chat__dropzone-container--not-accepted': isDragReject,
                }) },
                !isDragReject && React.createElement("p", null, t('Drag your files here')),
                isDragReject && React.createElement("p", null, t('Some of the files will not be accepted')))),
            displayQuotedMessage && React.createElement(QuotedMessagePreviewHeader, null),
            React.createElement("div", { className: 'str-chat__message-input-inner' },
                React.createElement("div", { className: 'str-chat__file-input-container', "data-testid": 'file-upload-button' },
                    React.createElement(UploadButton, { accept: acceptedFiles?.join(','), "aria-label": t('aria/File upload'), className: 'str-chat__file-input', "data-testid": 'file-input', disabled: !isUploadEnabled || maxFilesLeft === 0, id: id, multiple: multipleUploads, onFileChange: uploadNewFiles }),
                    React.createElement("label", { className: 'str-chat__file-input-label', htmlFor: id },
                        React.createElement(FileUploadIcon, null))),
                React.createElement("div", { className: 'str-chat__message-textarea-container' },
                    displayQuotedMessage && React.createElement(QuotedMessagePreview, { quotedMessage: quotedMessage }),
                    isUploadEnabled &&
                        !!(numberOfUploads + failedUploadsCount ||
                            (attachments.length && attachments.length !== linkPreviews.size)) && React.createElement(AttachmentPreviewList, null),
                    React.createElement("div", { className: 'str-chat__message-textarea-with-emoji-picker' },
                        React.createElement(ChatAutoComplete, null),
                        EmojiPicker && React.createElement(EmojiPicker, null))),
                !hideSendButton && (React.createElement(React.Fragment, null, cooldownRemaining ? (React.createElement(CooldownTimer, { cooldownInterval: cooldownRemaining, setCooldownRemaining: setCooldownRemaining })) : (React.createElement(React.Fragment, null,
                    React.createElement(SendButton, { disabled: !numberOfUploads &&
                            !text.length &&
                            attachments.length - failedAttachmentsCount === 0, sendMessage: handleSubmit }),
                    recordingEnabled && (React.createElement(StartRecordingAudioButton, { disabled: isRecording ||
                            (!asyncMessagesMultiSendEnabled &&
                                attachments.some((a) => a.type === RecordingAttachmentType.VOICE_RECORDING)), onClick: () => {
                            recordingController.recorder?.start();
                            setShowRecordingPermissionDeniedNotification(true);
                        } }))))))))));
};
