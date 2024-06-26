import React, { PropsWithChildren } from 'react';
export type CustomNotificationProps = {
    type: string;
    active?: boolean;
    className?: string;
};
export declare const CustomNotification: (props: PropsWithChildren<CustomNotificationProps>) => React.JSX.Element | null;
