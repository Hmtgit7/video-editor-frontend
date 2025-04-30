// app/components/audio/Waveform.tsx
'use client';

import { useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCurrentTime } from '../../store/slices/timelineSlice';

interface WaveformProps {
    audioUrl: string;
    height?: number;
    waveColor?: string;
    progressColor?: string;
}

export function Waveform({
    audioUrl,
    height = 80,
    waveColor = '#4CAF50',
    progressColor = '#2E7D32'
}: WaveformProps) {
    const dispatch = useAppDispatch();
    const waveformRef = useRef<HTMLDivElement>(null);
    const wavesurfer = useRef<WaveSurfer | null>(null);
    const currentTime = useAppSelector(state => state.timeline.currentTime);

    // Initialize WaveSurfer
    useEffect(() => {
        if (waveformRef.current && !wavesurfer.current) {
            wavesurfer.current = WaveSurfer.create({
                container: waveformRef.current,
                waveColor,
                progressColor,
                height,
                cursorWidth: 1,
                cursorColor: '#fff',
                barWidth: 2,
                barGap: 1,
                barRadius: 2,
            });

            wavesurfer.current.load(audioUrl);

            wavesurfer.current.on('ready', () => {
                // Wavesurfer is ready
            });

            wavesurfer.current.on('seeking', (time: number) => {
                dispatch(setCurrentTime(time));
            });
        }

        return () => {
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
                wavesurfer.current = null;
            }
        };
    }, [audioUrl, height, waveColor, progressColor, dispatch]);

    // Sync with timeline current time
    useEffect(() => {
        if (wavesurfer.current) {
            const wsTime = wavesurfer.current.getCurrentTime();

            // Only update if the difference is significant to avoid loops
            if (Math.abs(wsTime - currentTime) > 0.5) {
                wavesurfer.current.seekTo(currentTime / wavesurfer.current.getDuration());
            }
        }
    }, [currentTime]);

    return <div ref={waveformRef} className="w-full rounded overflow-hidden" />;
}