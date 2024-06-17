import React, { useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import clsx from 'clsx';
import { resampleWaveformData } from '../audioSampling';
export const WaveProgressBar = ({ amplitudesCount = 40, progress = 0, seek, waveformData, }) => {
    const [progressIndicator, setProgressIndicator] = useState(null);
    const isDragging = useRef(false);
    const rootRef = useRef(null);
    const handleDragStart = (e) => {
        e.preventDefault();
        if (!progressIndicator)
            return;
        isDragging.current = true;
        progressIndicator.style.cursor = 'grabbing';
    };
    const handleDrag = (e) => {
        if (!isDragging.current)
            return;
        // Due to throttling of seek, it is necessary to create a copy (snapshot) of the event.
        // Otherwise, the event would be nullified at the point when the throttled function is executed.
        seek({ ...e });
    };
    const handleDragStop = useCallback(() => {
        if (!progressIndicator)
            return;
        isDragging.current = false;
        progressIndicator.style.removeProperty('cursor');
    }, [progressIndicator]);
    const resampledWaveformData = useMemo(() => resampleWaveformData(waveformData, amplitudesCount), [
        amplitudesCount,
        waveformData,
    ]);
    useEffect(() => {
        document.addEventListener('pointerup', handleDragStop);
        return () => {
            document.removeEventListener('pointerup', handleDragStop);
        };
    }, [handleDragStop]);
    if (!waveformData.length)
        return null;
    return (React.createElement("div", { className: 'str-chat__wave-progress-bar__track', "data-testid": 'wave-progress-bar-track', onClick: seek, onPointerDown: handleDragStart, onPointerMove: handleDrag, onPointerUp: handleDragStop, ref: rootRef, role: 'progressbar' },
        resampledWaveformData.map((amplitude, i) => (React.createElement("div", { className: clsx('str-chat__wave-progress-bar__amplitude-bar', {
                ['str-chat__wave-progress-bar__amplitude-bar--active']: progress > (i / resampledWaveformData.length) * 100,
            }), "data-testid": 'amplitude-bar', key: `amplitude-${i}`, style: {
                '--str-chat__wave-progress-bar__amplitude-bar-height': amplitude
                    ? amplitude * 100 + '%'
                    : '0%',
            } }))),
        React.createElement("div", { className: 'str-chat__wave-progress-bar__progress-indicator', "data-testid": 'wave-progress-bar-progress-indicator', ref: setProgressIndicator, style: { left: `${progress < 0 ? 0 : progress > 100 ? 100 : progress}%` } })));
};
