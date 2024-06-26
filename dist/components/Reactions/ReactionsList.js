import React, { useState } from 'react';
import clsx from 'clsx';
import { useProcessReactions } from './hooks/useProcessReactions';
import { ReactionsListModal } from './ReactionsListModal';
import { useTranslationContext } from '../../context';
import { MAX_MESSAGE_REACTIONS_TO_FETCH } from '../Message/hooks';
const UnMemoizedReactionsList = (props) => {
    const { handleFetchReactions, reactionDetailsSort, reverse = false, sortReactionDetails, ...rest } = props;
    const { existingReactions, hasReactions, totalReactionCount } = useProcessReactions(rest);
    const [selectedReactionType, setSelectedReactionType,] = useState(null);
    const { t } = useTranslationContext('ReactionsList');
    const handleReactionButtonClick = (reactionType) => {
        if (totalReactionCount > MAX_MESSAGE_REACTIONS_TO_FETCH) {
            return;
        }
        setSelectedReactionType(reactionType);
    };
    if (!hasReactions)
        return null;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { "aria-label": t('aria/Reaction list'), className: clsx('str-chat__reaction-list str-chat__message-reactions-container', {
                // we are stuck with both classes as both are used in CSS
                'str-chat__reaction-list--reverse': reverse,
            }), "data-testid": 'reaction-list', role: 'figure' },
            React.createElement("ul", { className: 'str-chat__message-reactions' },
                existingReactions.map(({ EmojiComponent, isOwnReaction, reactionCount, reactionType }) => EmojiComponent && (React.createElement("li", { className: clsx('str-chat__message-reaction', {
                        'str-chat__message-reaction-own': isOwnReaction,
                    }), key: reactionType },
                    React.createElement("button", { "aria-label": `Reactions: ${reactionType}`, "data-testid": `reactions-list-button-${reactionType}`, onClick: () => handleReactionButtonClick(reactionType), type: 'button' },
                        React.createElement("span", { className: 'str-chat__message-reaction-emoji' },
                            React.createElement(EmojiComponent, null)),
                        "\u00A0",
                        React.createElement("span", { className: 'str-chat__message-reaction-count', "data-testclass": 'reaction-list-reaction-count' }, reactionCount))))),
                React.createElement("li", null,
                    React.createElement("span", { className: 'str-chat__reaction-list--counter' }, totalReactionCount)))),
        selectedReactionType !== null && (React.createElement(ReactionsListModal, { handleFetchReactions: handleFetchReactions, onClose: () => setSelectedReactionType(null), onSelectedReactionTypeChange: setSelectedReactionType, open: selectedReactionType !== null, reactions: existingReactions, selectedReactionType: selectedReactionType, sortReactionDetails: sortReactionDetails }))));
};
/**
 * Component that displays a list of reactions on a message.
 */
export const ReactionsList = React.memo(UnMemoizedReactionsList);
