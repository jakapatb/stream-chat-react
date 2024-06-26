import React, { useMemo } from 'react';
import { AudioRecordingPreview } from './AudioRecordingPreview';
import { AudioRecordingInProgress } from './AudioRecordingInProgress';
import { MediaRecordingState } from '../classes';
import { BinIcon, CheckSignIcon, LoadingIndicatorIcon, MicIcon, PauseIcon, SendIcon, } from '../../MessageInput';
import { useMessageInputContext } from '../../../context';
export const AudioRecorder = () => {
    const { recordingController: { completeRecording, recorder, recording, recordingState }, } = useMessageInputContext();
    const isUploadingFile = recording?.localMetadata?.uploadState === 'uploading';
    const state = useMemo(() => ({
        paused: recordingState === MediaRecordingState.PAUSED,
        recording: recordingState === MediaRecordingState.RECORDING,
        stopped: recordingState === MediaRecordingState.STOPPED,
    }), [recordingState]);
    if (!recorder)
        return null;
    return (React.createElement("div", { className: 'str-chat__audio_recorder-container' },
        React.createElement("div", { className: 'str-chat__audio_recorder', "data-testid": 'audio-recorder' },
            React.createElement("button", { className: 'str-chat__audio_recorder__cancel-button', "data-testid": 'cancel-recording-audio-button', disabled: isUploadingFile, onClick: recorder.cancel },
                React.createElement(BinIcon, null)),
            state.stopped && recording?.asset_url ? (React.createElement(AudioRecordingPreview, { durationSeconds: recording.duration ?? 0, mimeType: recording.mime_type, src: recording.asset_url, waveformData: recording.waveform_data })) : state.paused || state.recording ? (React.createElement(AudioRecordingInProgress, null)) : null,
            state.paused && (React.createElement("button", { className: 'str-chat__audio_recorder__resume-recording-button', onClick: recorder.resume },
                React.createElement(MicIcon, null))),
            state.recording && (React.createElement("button", { className: 'str-chat__audio_recorder__pause-recording-button', "data-testid": 'pause-recording-audio-button', onClick: recorder.pause },
                React.createElement(PauseIcon, null))),
            state.stopped ? (React.createElement("button", { className: 'str-chat__audio_recorder__complete-button', "data-testid": 'audio-recorder-complete-button', disabled: isUploadingFile, onClick: completeRecording }, isUploadingFile ? React.createElement(LoadingIndicatorIcon, null) : React.createElement(SendIcon, null))) : (React.createElement("button", { className: 'str-chat__audio_recorder__stop-button', "data-testid": 'audio-recorder-stop-button', onClick: recorder.stop },
                React.createElement(CheckSignIcon, null))))));
};
