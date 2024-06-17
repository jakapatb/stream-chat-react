import { useEffect, useState } from 'react';
import { getDisplayImage, getDisplayTitle } from '../utils';
import { useChatContext } from '../../../context';
export const useChannelPreviewInfo = (props) => {
    const { channel, overrideImage, overrideTitle } = props;
    const { client } = useChatContext('ChannelPreview');
    const [displayTitle, setDisplayTitle] = useState(getDisplayTitle(channel, client.user));
    const [displayImage, setDisplayImage] = useState(getDisplayImage(channel, client.user));
    useEffect(() => {
        const handleEvent = () => {
            setDisplayTitle((displayTitle) => {
                const newDisplayTitle = getDisplayTitle(channel, client.user);
                return displayTitle !== newDisplayTitle ? newDisplayTitle : displayTitle;
            });
            setDisplayImage((displayImage) => {
                const newDisplayImage = getDisplayImage(channel, client.user);
                return displayImage !== newDisplayImage ? newDisplayImage : displayImage;
            });
        };
        client.on('user.updated', handleEvent);
        return () => {
            client.off('user.updated', handleEvent);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return {
        displayImage: overrideImage || displayImage,
        displayTitle: overrideTitle || displayTitle,
    };
};
