import { MessageContextValue, TDateTimeParser } from '../context';
import type { TFunction } from 'i18next';
import type { Streami18n } from './Streami18n';
export type TimestampFormatterOptions = {
    calendar?: boolean | null;
    calendarFormats?: Record<string, string> | null;
    format?: string | null;
};
type DateFormatterOptions = TimestampFormatterOptions & {
    formatDate?: MessageContextValue['formatDate'];
    messageCreatedAt?: string | Date;
    t?: TFunction;
    tDateTimeParser?: TDateTimeParser;
    timestampTranslationKey?: string;
};
export declare const notValidDateWarning = "MessageTimestamp was called without a message, or message has invalid created_at date.";
export declare const noParsingFunctionWarning = "MessageTimestamp was called but there is no datetime parsing function available";
export declare function getDateString({ calendar, calendarFormats, format, formatDate, messageCreatedAt, t, tDateTimeParser, timestampTranslationKey, }: DateFormatterOptions): string | number | null;
export type FormatterFactory<V> = (streamI18n: Streami18n) => (value: V, lng: string | undefined, options: Record<string, unknown>) => string;
export type CustomFormatters = Record<string, FormatterFactory<any>>;
export type PredefinedFormatters = {
    timestampFormatter: FormatterFactory<string | Date>;
};
export declare const predefinedFormatters: PredefinedFormatters;
export {};
