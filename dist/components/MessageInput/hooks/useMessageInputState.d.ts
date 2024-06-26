import React from 'react';
import { EnrichURLsController } from './useLinkPreviews';
import { RecordingController } from '../../MediaRecorder/hooks/useMediaRecorder';
import { SetLinkPreviewMode } from '../types';
import type { FileUpload, ImageUpload, LinkPreviewMap, LocalAttachment } from '../types';
import type { FileLike } from '../../ReactFileUtilities';
import type { Attachment, Message, UserResponse } from 'stream-chat';
import type { MessageInputProps } from '../MessageInput';
import type { CustomTrigger, DefaultStreamChatGenerics, SendMessageOptions } from '../../../types/types';
export type MessageInputState<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    attachments: LocalAttachment<StreamChatGenerics>[];
    fileOrder: string[];
    fileUploads: Record<string, FileUpload>;
    imageOrder: string[];
    imageUploads: Record<string, ImageUpload>;
    linkPreviews: LinkPreviewMap;
    mentioned_users: UserResponse<StreamChatGenerics>[];
    setText: (text: string) => void;
    text: string;
};
type UpsertAttachmentsAction<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    attachments: LocalAttachment<StreamChatGenerics>[];
    type: 'upsertAttachments';
};
type RemoveAttachmentsAction = {
    ids: string[];
    type: 'removeAttachments';
};
type SetTextAction = {
    getNewText: (currentStateText: string) => string;
    type: 'setText';
};
type ClearAction = {
    type: 'clear';
};
type SetImageUploadAction = {
    id: string;
    type: 'setImageUpload';
    file?: File | FileLike;
    previewUri?: string;
    state?: string;
    url?: string;
};
type SetFileUploadAction = {
    id: string;
    type: 'setFileUpload';
    file?: File;
    state?: string;
    thumb_url?: string;
    url?: string;
};
type SetLinkPreviewsAction = {
    linkPreviews: LinkPreviewMap;
    mode: SetLinkPreviewMode;
    type: 'setLinkPreviews';
};
type RemoveImageUploadAction = {
    id: string;
    type: 'removeImageUpload';
};
type RemoveFileUploadAction = {
    id: string;
    type: 'removeFileUpload';
};
type AddMentionedUserAction<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    type: 'addMentionedUser';
    user: UserResponse<StreamChatGenerics>;
};
export type MessageInputReducerAction<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = SetTextAction | ClearAction | SetImageUploadAction | SetFileUploadAction | SetLinkPreviewsAction | RemoveImageUploadAction | RemoveFileUploadAction | AddMentionedUserAction<StreamChatGenerics> | UpsertAttachmentsAction | RemoveAttachmentsAction;
export type MessageInputHookProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = EnrichURLsController & {
    handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    handleSubmit: (event?: React.BaseSyntheticEvent, customMessageData?: Partial<Message<StreamChatGenerics>>, options?: SendMessageOptions) => void;
    insertText: (textToInsert: string) => void;
    isUploadEnabled: boolean;
    maxFilesLeft: number;
    numberOfUploads: number;
    onPaste: (event: React.ClipboardEvent<HTMLTextAreaElement>) => void;
    onSelectUser: (item: UserResponse<StreamChatGenerics>) => void;
    recordingController: RecordingController<StreamChatGenerics>;
    removeAttachments: (ids: string[]) => void;
    removeFile: (id: string) => void;
    removeImage: (id: string) => void;
    textareaRef: React.MutableRefObject<HTMLTextAreaElement | null | undefined>;
    uploadAttachment: (attachment: LocalAttachment<StreamChatGenerics>) => Promise<LocalAttachment<StreamChatGenerics> | undefined>;
    uploadFile: (id: string) => void;
    uploadImage: (id: string) => void;
    uploadNewFiles: (files: FileList | File[]) => void;
    upsertAttachments: (attachments: (Attachment<StreamChatGenerics> | LocalAttachment<StreamChatGenerics>)[]) => void;
};
export type CommandsListState = {
    closeCommandsList: () => void;
    openCommandsList: () => void;
    showCommandsList: boolean;
};
export type MentionsListState = {
    closeMentionsList: () => void;
    openMentionsList: () => void;
    showMentionsList: boolean;
};
/**
 * hook for MessageInput state
 */
export declare const useMessageInputState: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics, V extends CustomTrigger = CustomTrigger>(props: MessageInputProps<StreamChatGenerics, V>) => MessageInputState<StreamChatGenerics> & MessageInputHookProps<StreamChatGenerics> & CommandsListState & MentionsListState;
export {};
