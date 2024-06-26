import React from 'react';
import { TimestampFormatterOptions } from '../../i18n/utils';
export interface TimestampProps extends TimestampFormatterOptions {
    customClass?: string;
    timestamp?: Date | string;
}
export declare const defaultTimestampFormat = "h:mmA";
export declare function Timestamp(props: TimestampProps): React.JSX.Element | null;
