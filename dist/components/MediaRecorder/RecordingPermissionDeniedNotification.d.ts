import React from 'react';
import { RecordingPermission } from './classes/BrowserPermission';
export type RecordingPermissionDeniedNotificationProps = {
    onClose: () => void;
    permissionName: RecordingPermission;
};
export declare const RecordingPermissionDeniedNotification: ({ onClose, permissionName, }: RecordingPermissionDeniedNotificationProps) => React.JSX.Element;
