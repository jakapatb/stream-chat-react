import React, { PropsWithChildren } from 'react';
import { ChannelQueryOptions, EventAPIResponse, Message, MessageResponse, Channel as StreamChannel, StreamChat, UpdatedMessage } from 'stream-chat';
import { OnMentionAction } from './hooks/useMentionsHandlers';
import { LoadingErrorIndicatorProps } from '../Loading';
import { StreamMessage } from '../../context/ChannelStateContext';
import { ComponentContextValue } from '../../context/ComponentContext';
import type { UnreadMessagesNotificationProps } from '../MessageList';
import type { MessageProps } from '../Message/types';
import type { MessageInputProps } from '../MessageInput/MessageInput';
import type { ChannelUnreadUiState, CustomTrigger, DefaultStreamChatGenerics, GiphyVersions, ImageAttachmentSizeHandler, SendMessageOptions, UpdateMessageOptions, VideoAttachmentSizeHandler } from '../../types/types';
import type { URLEnrichmentConfig } from '../MessageInput/hooks/useLinkPreviews';
import { ReactionOptions } from '../Reactions';
type ChannelPropsForwardedToComponentContext<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    /** Custom UI component to display a message attachment, defaults to and accepts same props as: [Attachment](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Attachment/Attachment.tsx) */
    Attachment?: ComponentContextValue<StreamChatGenerics>['Attachment'];
    /** Custom UI component to display an attachment previews in MessageInput, defaults to and accepts same props as: [Attachment](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageInput/AttachmentPreviewList.tsx) */
    AttachmentPreviewList?: ComponentContextValue<StreamChatGenerics>['AttachmentPreviewList'];
    /** Custom UI component to display AudioRecorder in MessageInput, defaults to and accepts same props as: [AudioRecorder](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageInput/AudioRecorder.tsx) */
    AudioRecorder?: ComponentContextValue<StreamChatGenerics>['AudioRecorder'];
    /** Optional UI component to override the default suggestion Item component, defaults to and accepts same props as: [Item](https://github.com/GetStream/stream-chat-react/blob/master/src/components/AutoCompleteTextarea/Item.js) */
    AutocompleteSuggestionItem?: ComponentContextValue<StreamChatGenerics>['AutocompleteSuggestionItem'];
    /** Optional UI component to override the default List component that displays suggestions, defaults to and accepts same props as: [List](https://github.com/GetStream/stream-chat-react/blob/master/src/components/AutoCompleteTextarea/List.js) */
    AutocompleteSuggestionList?: ComponentContextValue<StreamChatGenerics>['AutocompleteSuggestionList'];
    /** UI component to display a user's avatar, defaults to and accepts same props as: [Avatar](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Avatar/Avatar.tsx) */
    Avatar?: ComponentContextValue<StreamChatGenerics>['Avatar'];
    /** Custom UI component to display <img/> elements resp. a fallback in case of load error, defaults to and accepts same props as: [BaseImage](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Gallery/BaseImage.tsx) */
    BaseImage?: ComponentContextValue<StreamChatGenerics>['BaseImage'];
    /** Custom UI component to display the slow mode cooldown timer, defaults to and accepts same props as: [CooldownTimer](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageInput/CooldownTimer.tsx) */
    CooldownTimer?: ComponentContextValue<StreamChatGenerics>['CooldownTimer'];
    /** Custom UI component to render set of buttons to be displayed in the MessageActionsBox, defaults to and accepts same props as: [CustomMessageActionsList](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageActions/CustomMessageActionsList.tsx) */
    CustomMessageActionsList?: ComponentContextValue<StreamChatGenerics>['CustomMessageActionsList'];
    /** Custom UI component for date separators, defaults to and accepts same props as: [DateSeparator](https://github.com/GetStream/stream-chat-react/blob/master/src/components/DateSeparator.tsx) */
    DateSeparator?: ComponentContextValue<StreamChatGenerics>['DateSeparator'];
    /** Custom UI component to override default edit message input, defaults to and accepts same props as: [EditMessageForm](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageInput/EditMessageForm.tsx) */
    EditMessageInput?: ComponentContextValue<StreamChatGenerics>['EditMessageInput'];
    /** Custom UI component for rendering button with emoji picker in MessageInput */
    EmojiPicker?: ComponentContextValue<StreamChatGenerics>['EmojiPicker'];
    /** Mechanism to be used with autocomplete and text replace features of the `MessageInput` component, see [emoji-mart `SearchIndex`](https://github.com/missive/emoji-mart#%EF%B8%8F%EF%B8%8F-headless-search) */
    emojiSearchIndex?: ComponentContextValue<StreamChatGenerics>['emojiSearchIndex'];
    /** Custom UI component to be displayed when the `MessageList` is empty, defaults to and accepts same props as: [EmptyStateIndicator](https://github.com/GetStream/stream-chat-react/blob/master/src/components/EmptyStateIndicator/EmptyStateIndicator.tsx)  */
    EmptyStateIndicator?: ComponentContextValue<StreamChatGenerics>['EmptyStateIndicator'];
    /** Custom UI component for file upload icon, defaults to and accepts same props as: [FileUploadIcon](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageInput/icons.tsx) */
    FileUploadIcon?: ComponentContextValue<StreamChatGenerics>['FileUploadIcon'];
    /** Custom UI component to render a Giphy preview in the `VirtualizedMessageList` */
    GiphyPreviewMessage?: ComponentContextValue<StreamChatGenerics>['GiphyPreviewMessage'];
    /** Custom UI component to render at the top of the `MessageList` */
    HeaderComponent?: ComponentContextValue<StreamChatGenerics>['HeaderComponent'];
    /** Custom UI component handling how the message input is rendered, defaults to and accepts the same props as [MessageInputFlat](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageInput/MessageInputFlat.tsx) */
    Input?: ComponentContextValue<StreamChatGenerics>['Input'];
    /** Custom component to render link previews in message input **/
    LinkPreviewList?: ComponentContextValue<StreamChatGenerics>['LinkPreviewList'];
    /** Custom UI component to be shown if the channel query fails, defaults to and accepts same props as: [LoadingErrorIndicator](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Loading/LoadingErrorIndicator.tsx) */
    LoadingErrorIndicator?: React.ComponentType<LoadingErrorIndicatorProps>;
    /** Custom UI component to render while the `MessageList` is loading new messages, defaults to and accepts same props as: [LoadingIndicator](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Loading/LoadingIndicator.tsx) */
    LoadingIndicator?: ComponentContextValue<StreamChatGenerics>['LoadingIndicator'];
    /** Custom UI component to display a message in the standard `MessageList`, defaults to and accepts the same props as: [MessageSimple](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Message/MessageSimple.tsx) */
    Message?: ComponentContextValue<StreamChatGenerics>['Message'];
    /** Custom UI component to display the contents of a bounced message modal. Usually it allows to retry, edit, or delete the message. Defaults to and accepts the same props as: [MessageBouncePrompt](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageBounce/MessageBouncePrompt.tsx) */
    MessageBouncePrompt?: ComponentContextValue<StreamChatGenerics>['MessageBouncePrompt'];
    /** Custom UI component for a deleted message, defaults to and accepts same props as: [MessageDeleted](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Message/MessageDeleted.tsx) */
    MessageDeleted?: ComponentContextValue<StreamChatGenerics>['MessageDeleted'];
    /** Custom UI component that displays message and connection status notifications in the `MessageList`, defaults to and accepts same props as [DefaultMessageListNotifications](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageList/MessageListNotifications.tsx) */
    MessageListNotifications?: ComponentContextValue<StreamChatGenerics>['MessageListNotifications'];
    /** Custom UI component to display a notification when scrolled up the list and new messages arrive, defaults to and accepts same props as [MessageNotification](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageList/MessageNotification.tsx) */
    MessageNotification?: ComponentContextValue<StreamChatGenerics>['MessageNotification'];
    /** Custom UI component for message options popup, defaults to and accepts same props as: [MessageOptions](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Message/MessageOptions.tsx) */
    MessageOptions?: ComponentContextValue<StreamChatGenerics>['MessageOptions'];
    /** Custom UI component to display message replies, defaults to and accepts same props as: [MessageRepliesCountButton](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Message/MessageRepliesCountButton.tsx) */
    MessageRepliesCountButton?: ComponentContextValue<StreamChatGenerics>['MessageRepliesCountButton'];
    /** Custom UI component to display message delivery status, defaults to and accepts same props as: [MessageStatus](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Message/MessageStatus.tsx) */
    MessageStatus?: ComponentContextValue<StreamChatGenerics>['MessageStatus'];
    /** Custom UI component to display system messages, defaults to and accepts same props as: [EventComponent](https://github.com/GetStream/stream-chat-react/blob/master/src/components/EventComponent/EventComponent.tsx) */
    MessageSystem?: ComponentContextValue<StreamChatGenerics>['MessageSystem'];
    /** Custom UI component to display a timestamp on a message, defaults to and accepts same props as: [MessageTimestamp](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Message/MessageTimestamp.tsx) */
    MessageTimestamp?: ComponentContextValue<StreamChatGenerics>['MessageTimestamp'];
    /** Custom UI component for viewing message's image attachments, defaults to and accepts the same props as [ModalGallery](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Gallery/ModalGallery.tsx) */
    ModalGallery?: ComponentContextValue<StreamChatGenerics>['ModalGallery'];
    /** Custom UI component to override default pinned message indicator, defaults to and accepts same props as: [PinIndicator](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Message/icons.tsx) */
    PinIndicator?: ComponentContextValue<StreamChatGenerics>['PinIndicator'];
    /** Custom UI component to override quoted message UI on a sent message, defaults to and accepts same props as: [QuotedMessage](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Message/QuotedMessage.tsx) */
    QuotedMessage?: ComponentContextValue<StreamChatGenerics>['QuotedMessage'];
    /** Custom UI component to override the message input's quoted message preview, defaults to and accepts same props as: [QuotedMessagePreview](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageInput/QuotedMessagePreview.tsx) */
    QuotedMessagePreview?: ComponentContextValue<StreamChatGenerics>['QuotedMessagePreview'];
    /** Custom reaction options to be applied to ReactionSelector, ReactionList and SimpleReactionList components */
    reactionOptions?: ReactionOptions;
    /** Custom UI component to display the reaction selector, defaults to and accepts same props as: [ReactionSelector](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Reactions/ReactionSelector.tsx) */
    ReactionSelector?: ComponentContextValue<StreamChatGenerics>['ReactionSelector'];
    /** Custom UI component to display the list of reactions on a message, defaults to and accepts same props as: [ReactionsList](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Reactions/ReactionsList.tsx) */
    ReactionsList?: ComponentContextValue<StreamChatGenerics>['ReactionsList'];
    /** Custom UI component for send button, defaults to and accepts same props as: [SendButton](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageInput/icons.tsx) */
    SendButton?: ComponentContextValue<StreamChatGenerics>['SendButton'];
    /** Custom UI component button for initiating audio recording, defaults to and accepts same props as: [StartRecordingAudioButton](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MediaRecorder/AudioRecorder/AudioRecordingButtons.tsx) */
    StartRecordingAudioButton?: ComponentContextValue<StreamChatGenerics>['StartRecordingAudioButton'];
    /** Custom UI component that displays thread's parent or other message at the top of the `MessageList`, defaults to and accepts same props as [MessageSimple](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Message/MessageSimple.tsx) */
    ThreadHead?: React.ComponentType<MessageProps<StreamChatGenerics>>;
    /** Custom UI component to display the header of a `Thread`, defaults to and accepts same props as: [DefaultThreadHeader](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Thread/Thread.tsx) */
    ThreadHeader?: ComponentContextValue<StreamChatGenerics>['ThreadHeader'];
    /** Custom UI component to display the start of a threaded `MessageList`, defaults to and accepts same props as: [DefaultThreadStart](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Thread/Thread.tsx) */
    ThreadStart?: ComponentContextValue<StreamChatGenerics>['ThreadStart'];
    /** Custom UI component to display a date used in timestamps. It's used internally by the default `MessageTimestamp`, and to display a timestamp for edited messages. */
    Timestamp?: ComponentContextValue<StreamChatGenerics>['Timestamp'];
    /** Optional context provider that lets you override the default autocomplete triggers, defaults to: [DefaultTriggerProvider](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageInput/DefaultTriggerProvider.tsx) */
    TriggerProvider?: ComponentContextValue<StreamChatGenerics>['TriggerProvider'];
    /** Custom UI component for the typing indicator, defaults to and accepts same props as: [TypingIndicator](https://github.com/GetStream/stream-chat-react/blob/master/src/components/TypingIndicator/TypingIndicator.tsx) */
    TypingIndicator?: ComponentContextValue<StreamChatGenerics>['TypingIndicator'];
    /** Custom UI component that indicates a user is viewing unread messages. It disappears once the user scrolls to UnreadMessagesSeparator. Defaults to and accepts same props as: [UnreadMessagesNotification](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageList/UnreadMessagesNotification.tsx) */
    UnreadMessagesNotification?: React.ComponentType<UnreadMessagesNotificationProps>;
    /** Custom UI component that separates read messages from unread, defaults to and accepts same props as: [UnreadMessagesSeparator](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageList/UnreadMessagesSeparator.tsx) */
    UnreadMessagesSeparator?: ComponentContextValue<StreamChatGenerics>['UnreadMessagesSeparator'];
    /** Custom UI component to display a message in the `VirtualizedMessageList`, does not have a default implementation */
    VirtualMessage?: ComponentContextValue<StreamChatGenerics>['VirtualMessage'];
};
export type ChannelProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics, V extends CustomTrigger = CustomTrigger> = ChannelPropsForwardedToComponentContext<StreamChatGenerics> & {
    /** List of accepted file types */
    acceptedFiles?: string[];
    /** Custom handler function that runs when the active channel has unread messages and the app is running on a separate browser tab */
    activeUnreadHandler?: (unread: number, documentTitle: string) => void;
    /** The connected and active channel */
    channel?: StreamChannel<StreamChatGenerics>;
    /**
     * Optional configuration parameters used for the initial channel query.
     * Applied only if the value of channel.initialized is false.
     * If the channel instance has already been initialized (channel has been queried),
     * then the channel query will be skipped and channelQueryOptions will not be applied.
     */
    channelQueryOptions?: ChannelQueryOptions<StreamChatGenerics>;
    /** Custom action handler to override the default `client.deleteMessage(message.id)` function */
    doDeleteMessageRequest?: (message: StreamMessage<StreamChatGenerics>) => Promise<MessageResponse<StreamChatGenerics>>;
    /** Custom action handler to override the default `channel.markRead` request function (advanced usage only) */
    doMarkReadRequest?: (channel: StreamChannel<StreamChatGenerics>, setChannelUnreadUiState?: (state: ChannelUnreadUiState) => void) => Promise<EventAPIResponse<StreamChatGenerics>> | void;
    /** Custom action handler to override the default `channel.sendMessage` request function (advanced usage only) */
    doSendMessageRequest?: (channel: StreamChannel<StreamChatGenerics>, message: Message<StreamChatGenerics>, options?: SendMessageOptions) => ReturnType<StreamChannel<StreamChatGenerics>['sendMessage']> | void;
    /** Custom action handler to override the default `client.updateMessage` request function (advanced usage only) */
    doUpdateMessageRequest?: (cid: string, updatedMessage: UpdatedMessage<StreamChatGenerics>, options?: UpdateMessageOptions) => ReturnType<StreamChat<StreamChatGenerics>['updateMessage']>;
    /** If true, chat users will be able to drag and drop file uploads to the entire channel window */
    dragAndDropWindow?: boolean;
    /** Custom UI component to be shown if no active channel is set, defaults to null and skips rendering the Channel component */
    EmptyPlaceholder?: React.ReactElement;
    /**
     * A global flag to toggle the URL enrichment and link previews in `MessageInput` components.
     * By default, the feature is disabled. Can be overridden on Thread, MessageList level through additionalMessageInputProps
     * or directly on MessageInput level through urlEnrichmentConfig.
     */
    enrichURLForPreview?: URLEnrichmentConfig['enrichURLForPreview'];
    /** Global configuration for link preview generation in all the MessageInput components */
    enrichURLForPreviewConfig?: Omit<URLEnrichmentConfig, 'enrichURLForPreview'>;
    /** The giphy version to render - check the keys of the [Image Object](https://developers.giphy.com/docs/api/schema#image-object) for possible values. Uses 'fixed_height' by default */
    giphyVersion?: GiphyVersions;
    /** A custom function to provide size configuration for image attachments */
    imageAttachmentSizeHandler?: ImageAttachmentSizeHandler;
    /**
     * Allows to prevent triggering the channel.watch() call when mounting the component.
     * That means that no channel data from the back-end will be received neither channel WS events will be delivered to the client.
     * Preventing to initialize the channel on mount allows us to postpone the channel creation to a later point in time.
     */
    initializeOnMount?: boolean;
    /** Configuration parameter to mark the active channel as read when mounted (opened). By default, the channel is marked read on mount. */
    markReadOnMount?: boolean;
    /** Maximum number of attachments allowed per message */
    maxNumberOfFiles?: number;
    /** Whether to allow multiple attachment uploads */
    multipleUploads?: boolean;
    /** Custom action handler function to run on click of an @mention in a message */
    onMentionsClick?: OnMentionAction<StreamChatGenerics>;
    /** Custom action handler function to run on hover of an @mention in a message */
    onMentionsHover?: OnMentionAction<StreamChatGenerics>;
    /** If `dragAndDropWindow` prop is true, the props to pass to the MessageInput component (overrides props placed directly on MessageInput) */
    optionalMessageInputProps?: MessageInputProps<StreamChatGenerics, V>;
    /** You can turn on/off thumbnail generation for video attachments */
    shouldGenerateVideoThumbnail?: boolean;
    /** If true, skips the message data string comparison used to memoize the current channel messages (helpful for channels with 1000s of messages) */
    skipMessageDataMemoization?: boolean;
    /** A custom function to provide size configuration for video attachments */
    videoAttachmentSizeHandler?: VideoAttachmentSizeHandler;
};
/**
 * A wrapper component that provides channel data and renders children.
 * The Channel component provides the following contexts:
 * - [ChannelStateContext](https://getstream.io/chat/docs/sdk/react/contexts/channel_state_context/)
 * - [ChannelActionContext](https://getstream.io/chat/docs/sdk/react/contexts/channel_action_context/)
 * - [ComponentContext](https://getstream.io/chat/docs/sdk/react/contexts/component_context/)
 * - [TypingContext](https://getstream.io/chat/docs/sdk/react/contexts/typing_context/)
 */
export declare const Channel: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics, V extends CustomTrigger = CustomTrigger>(props: PropsWithChildren<ChannelProps<StreamChatGenerics, V>>) => React.JSX.Element;
export {};
