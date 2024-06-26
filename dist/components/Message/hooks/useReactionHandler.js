import { useCallback, useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';
import { useChannelActionContext } from '../../../context/ChannelActionContext';
import { useChannelStateContext } from '../../../context/ChannelStateContext';
import { useChatContext } from '../../../context/ChatContext';
export const reactionHandlerWarning = `Reaction handler was called, but it is missing one of its required arguments.
Make sure the ChannelAction and ChannelState contexts are properly set and the hook is initialized with a valid message.`;
export const useReactionHandler = (message) => {
    const { updateMessage } = useChannelActionContext('useReactionHandler');
    const { channel, channelCapabilities } = useChannelStateContext('useReactionHandler');
    const { client } = useChatContext('useReactionHandler');
    const createMessagePreview = useCallback((add, reaction, message) => {
        const newReactionGroups = message?.reaction_groups || {};
        const reactionType = reaction.type;
        const hasReaction = !!newReactionGroups[reactionType];
        if (add) {
            const timestamp = new Date().toISOString();
            newReactionGroups[reactionType] = hasReaction
                ? { ...newReactionGroups[reactionType], count: newReactionGroups[reactionType].count + 1 }
                : {
                    count: 1,
                    first_reaction_at: timestamp,
                    last_reaction_at: timestamp,
                    sum_scores: 1,
                };
        }
        else {
            if (hasReaction && newReactionGroups[reactionType].count > 1) {
                newReactionGroups[reactionType] = {
                    ...newReactionGroups[reactionType],
                    count: newReactionGroups[reactionType].count - 1,
                };
            }
            else {
                delete newReactionGroups[reactionType];
            }
        }
        const newReactions = add
            ? [reaction, ...(message?.latest_reactions || [])]
            : message.latest_reactions?.filter((item) => !(item.type === reaction.type && item.user_id === reaction.user_id));
        const newOwnReactions = add
            ? [reaction, ...(message?.own_reactions || [])]
            : message?.own_reactions?.filter((item) => item.type !== reaction.type);
        return {
            ...message,
            latest_reactions: newReactions || message.latest_reactions,
            own_reactions: newOwnReactions,
            reaction_groups: newReactionGroups,
        };
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [client.user, client.userID]);
    const createReactionPreview = (type) => ({
        message_id: message?.id,
        score: 1,
        type,
        user: client.user,
        user_id: client.user?.id,
    });
    const toggleReaction = throttle(async (id, type, add) => {
        if (!message || !channelCapabilities['send-reaction'])
            return;
        const newReaction = createReactionPreview(type);
        const tempMessage = createMessagePreview(add, newReaction, message);
        try {
            updateMessage(tempMessage);
            const messageResponse = add
                ? await channel.sendReaction(id, { type })
                : await channel.deleteReaction(id, type);
            updateMessage(messageResponse.message);
        }
        catch (error) {
            // revert to the original message if the API call fails
            updateMessage(message);
        }
    }, 1000);
    return async (reactionType, event) => {
        if (event?.preventDefault) {
            event.preventDefault();
        }
        if (!message) {
            return console.warn(reactionHandlerWarning);
        }
        let userExistingReaction = null;
        if (message.own_reactions) {
            message.own_reactions.forEach((reaction) => {
                // own user should only ever contain the current user id
                // just in case we check to prevent bugs with message updates from breaking reactions
                if (reaction.user && client.userID === reaction.user.id && reaction.type === reactionType) {
                    userExistingReaction = reaction;
                }
                else if (reaction.user && client.userID !== reaction.user.id) {
                    console.warn(`message.own_reactions contained reactions from a different user, this indicates a bug`);
                }
            });
        }
        try {
            if (userExistingReaction) {
                await toggleReaction(message.id, userExistingReaction.type, false);
            }
            else {
                await toggleReaction(message.id, reactionType, true);
            }
        }
        catch (error) {
            console.log({ error });
        }
    };
};
export const useReactionClick = (message, reactionSelectorRef, messageWrapperRef, closeReactionSelectorOnClick) => {
    const { channelCapabilities = {} } = useChannelStateContext('useReactionClick');
    const [showDetailedReactions, setShowDetailedReactions] = useState(false);
    const hasListener = useRef(false);
    const isReactionEnabled = channelCapabilities['send-reaction'];
    const messageDeleted = !!message?.deleted_at;
    const closeDetailedReactions = useCallback((event) => {
        if (event.target instanceof HTMLElement &&
            reactionSelectorRef?.current?.contains(event.target) &&
            !closeReactionSelectorOnClick) {
            return;
        }
        setShowDetailedReactions(false);
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setShowDetailedReactions, reactionSelectorRef]);
    useEffect(() => {
        const messageWrapper = messageWrapperRef?.current;
        if (showDetailedReactions && !hasListener.current) {
            hasListener.current = true;
            document.addEventListener('click', closeDetailedReactions);
            if (messageWrapper) {
                messageWrapper.addEventListener('mouseleave', closeDetailedReactions);
            }
        }
        if (!showDetailedReactions && hasListener.current) {
            document.removeEventListener('click', closeDetailedReactions);
            if (messageWrapper) {
                messageWrapper.removeEventListener('mouseleave', closeDetailedReactions);
            }
            hasListener.current = false;
        }
        return () => {
            if (hasListener.current) {
                document.removeEventListener('click', closeDetailedReactions);
                if (messageWrapper) {
                    messageWrapper.removeEventListener('mouseleave', closeDetailedReactions);
                }
                hasListener.current = false;
            }
        };
    }, [showDetailedReactions, closeDetailedReactions, messageWrapperRef]);
    useEffect(() => {
        const messageWrapper = messageWrapperRef?.current;
        if (messageDeleted && hasListener.current) {
            document.removeEventListener('click', closeDetailedReactions);
            if (messageWrapper) {
                messageWrapper.removeEventListener('mouseleave', closeDetailedReactions);
            }
            hasListener.current = false;
        }
    }, [messageDeleted, closeDetailedReactions, messageWrapperRef]);
    const onReactionListClick = (event) => {
        event?.stopPropagation?.();
        setShowDetailedReactions((prev) => !prev);
    };
    return {
        isReactionEnabled,
        onReactionListClick,
        showDetailedReactions,
    };
};
