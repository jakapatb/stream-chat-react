import React, { useMemo } from 'react';
import { useMessageContext } from '../../context/MessageContext';
import { isDate, useTranslationContext } from '../../context/TranslationContext';
import { getDateString } from '../../i18n/utils';
export const defaultTimestampFormat = 'h:mmA';
export function Timestamp(props) {
    const { calendar, calendarFormats, customClass, format = defaultTimestampFormat, timestamp, } = props;
    const { formatDate } = useMessageContext('MessageTimestamp');
    const { t, tDateTimeParser } = useTranslationContext('MessageTimestamp');
    const normalizedTimestamp = timestamp && isDate(timestamp) ? timestamp.toISOString() : timestamp;
    const when = useMemo(() => getDateString({
        calendar,
        calendarFormats,
        format,
        formatDate,
        messageCreatedAt: normalizedTimestamp,
        t,
        tDateTimeParser,
        timestampTranslationKey: 'timestamp/Timestamp',
    }), [calendar, calendarFormats, format, formatDate, normalizedTimestamp, t, tDateTimeParser]);
    if (!when) {
        return null;
    }
    return (React.createElement("time", { className: customClass, dateTime: normalizedTimestamp, title: normalizedTimestamp }, when));
}
