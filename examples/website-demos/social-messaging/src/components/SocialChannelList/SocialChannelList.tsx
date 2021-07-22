import React from 'react';

import { ChannelListMessengerProps } from 'stream-chat-react';

import './SocialChannelList.scss';

type Props = ChannelListMessengerProps;

export const SocialChannelList: React.FC<Props> = (props) => {
  const { children } = props;

  const ListHeaderWrapper: React.FC<Props> = (props) => {
    const { children } = props;

    return (
      <div className='channel-list'>
        {children}
      </div>
    );
  };

  return (
    <ListHeaderWrapper>{children}</ListHeaderWrapper>
  );
};

