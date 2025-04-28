'use client';

import { useRef, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setCurrentTime, setZoom } from '../../store/slices/timelineSlice';
import { VideoTrack } from './VideoTrack';
import { AudioTrack } from './AudioTrack';
import { SubtitleTrack } from './SubtitleTrack';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export function Timeline() {
    const dispatch = useAppDispatch();
    const timelineRef = useRef<HTMLDivElement>(null);
    const currentTime = useAppSelector(state => state.timeline.currentTime);
    const zoom = useAppSelector(state => state.timeline.zoom);
    const duration = useAppSelector(state => state.video.duration);
    const [timelineWidth, setTimelineWidth] = useState(0);

    // Resize timeline observer
    useEffect(() => {
        if (!timelineRef.current) return;

        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                setTimelineWidth(entry.contentRect.width);
            }
        });

        resizeObserver.observe(timelineRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle timeline click to set current time
    const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!timelineRef.current) return;

        const rect = timelineRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = clickX / rect.width;
        const newTime = ratio * duration * zoom;

        dispatch(setCurrentTime(Math.max(0, Math.min(newTime, duration))));
    };

    // Calculate position of playhead
    const playheadPosition = (currentTime / (duration * zoom)) * 100;

    return (
        <div className="h-full flex flex-col bg-gray-900 text-white">
            <div className="flex justify-between items-center px-4 h-10 border-b border-gray-800 sticky top-0 z-10 bg-gray-900">
                <div className="text-sm">{formatTime(currentTime)} / {formatTime(duration)}</div>

                <div className="flex items-center gap-2">
                    <span className="text-xs">Zoom:</span>
                    <Slider
                        value={[zoom]}
                        min={0.5}
                        max={2}
                        step={0.1}
                        onValueChange={(value) => dispatch(setZoom(value[0]))}
                        className="w-32"
                    />
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-6 w-6">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="h-6 w-6">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
                        </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="h-6 w-6">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M13.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 0015.25 3h-1.5z" />
                            <path d="M3.75 13.75a.75.75 0 01.75-.75h5a.75.75 0 010 1.5h-5a.75.75 0 01-.75-.75zM3.75 10a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75zM3.75 6.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" />
                        </svg>
                    </Button>
                </div>
            </div>

            <div className="flex-grow relative overflow-auto">
                {/* Time markers */}
                <div className="h-6 border-b border-gray-800 bg-gray-850 flex text-xs sticky top-10 z-10">
                    {Array.from({ length: Math.ceil(duration * zoom / 10) + 1 }).map((_, i) => (
                        <div key={i} className="flex-shrink-0 w-24 border-r border-gray-700 flex items-center pl-1">
                            {formatTime(i * 10)}
                        </div>
                    ))}
                </div>

                {/* Timeline tracks container */}
                <div
                    ref={timelineRef}
                    className="relative overflow-x-auto overflow-y-auto"
                    onClick={handleTimelineClick}
                    style={{
                        // Make sure the timeline expands based on zoom level and duration
                        minWidth: "100%",
                        width: `${Math.max(100, duration * zoom * 10)}px`
                    }}
                >
                    {/* Playhead indicator */}
                    <div
                        className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                        style={{ left: `${playheadPosition}%` }}
                    />

                    {/* Tracks - Set fixed minimum height to ensure they're visible */}
                    <div className="flex flex-col min-h-[150px]">
                        <VideoTrack />
                        <AudioTrack />
                        <SubtitleTrack />
                    </div>
                </div>
            </div>
        </div>
    );
}