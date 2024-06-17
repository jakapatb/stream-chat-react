import { isDate, isDayOrMoment, isNumberOrString, } from '../context';
export const notValidDateWarning = 'MessageTimestamp was called without a message, or message has invalid created_at date.';
export const noParsingFunctionWarning = 'MessageTimestamp was called but there is no datetime parsing function available';
export function getDateString({ calendar, calendarFormats, format, formatDate, messageCreatedAt, t, tDateTimeParser, timestampTranslationKey, }) {
    if (!messageCreatedAt ||
        (typeof messageCreatedAt === 'string' && !Date.parse(messageCreatedAt))) {
        console.warn(notValidDateWarning);
        return null;
    }
    if (typeof formatDate === 'function') {
        return formatDate(new Date(messageCreatedAt));
    }
    if (t && timestampTranslationKey) {
        const options = {};
        if (typeof calendar !== 'undefined' && calendar !== null)
            options.calendar = calendar;
        if (typeof calendarFormats !== 'undefined' && calendarFormats !== null)
            options.calendarFormats = calendarFormats;
        if (typeof format !== 'undefined' && format !== null)
            options.format = format;
        const translatedTimestamp = t(timestampTranslationKey, {
            ...options,
            timestamp: new Date(messageCreatedAt),
        });
        const translationKeyFound = timestampTranslationKey !== translatedTimestamp;
        if (translationKeyFound)
            return translatedTimestamp;
    }
    if (!tDateTimeParser) {
        console.warn(noParsingFunctionWarning);
        return null;
    }
    const parsedTime = tDateTimeParser(messageCreatedAt);
    if (isDayOrMoment(parsedTime)) {
        /**
         * parsedTime.calendar is guaranteed on the type but is only
         * available when a user calls dayjs.extend(calendar)
         */
        return calendar && parsedTime.calendar
            ? parsedTime.calendar(undefined, calendarFormats || undefined)
            : parsedTime.format(format || undefined);
    }
    if (isDate(parsedTime)) {
        return parsedTime.toDateString();
    }
    if (isNumberOrString(parsedTime)) {
        return parsedTime;
    }
    return null;
}
export const predefinedFormatters = {
    timestampFormatter: (streamI18n) => (value, _, { calendarFormats, ...options }) => {
        let parsedCalendarFormats;
        try {
            if (!options.calendar) {
                parsedCalendarFormats = {};
            }
            else if (typeof calendarFormats === 'string') {
                parsedCalendarFormats = JSON.parse(calendarFormats);
            }
            else if (typeof calendarFormats === 'object') {
                parsedCalendarFormats = calendarFormats;
            }
        }
        catch (e) {
            console.error('[TIMESTAMP FORMATTER]', e);
        }
        const result = getDateString({
            ...options,
            calendarFormats: parsedCalendarFormats,
            messageCreatedAt: value,
            tDateTimeParser: streamI18n.tDateTimeParser,
        });
        if (!result || typeof result === 'number') {
            return JSON.stringify(value);
        }
        return result;
    },
};
