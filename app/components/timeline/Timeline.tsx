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
    const [isPlaying, setIsPlaying] = useState(false);

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

    // Generate time markers based on zoom level
    const generateTimeMarkers = () => {
        // Determine marker interval based on zoom
        const interval = zoom <= 1 ? 10 : zoom <= 1.5 ? 5 : 2;
        const markers = [];

        // Calculate number of markers needed
        const markerCount = Math.ceil(duration * zoom / interval);

        for (let i = 0; i <= markerCount; i++) {
            const time = i * interval;
            const isHourMarker = time % 60 === 0;
            markers.push(
                <div
                    key={i}
                    className={`flex-shrink-0 flex items-end justify-start pl-1 border-r ${isHourMarker ? 'border-gray-600' : 'border-gray-700'}`}
                    style={{ width: '60px' }}
                >
                    <div
                        className={isHourMarker ? 'timeline-marker-hour' : 'timeline-marker'}
                    />
                    <span className="text-xs text-gray-400 ml-1">
                        {formatTime(time)}
                    </span>
                </div>
            );
        }

        return markers;
    };

    // Toggle playback
    const togglePlayback = () => {
        setIsPlaying(!isPlaying);
        // In a real implementation, this would control the video player
    };

    return (
        <div className="h-full flex flex-col bg-gray-900 text-white">
            <div className="flex justify-between items-center px-4 h-10 border-b border-gray-800 bg-gray-950">
                <div className="text-sm font-medium">{formatTime(currentTime)} / {formatTime(duration)}</div>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-300">Zoom:</span>
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
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 border-gray-700"
                        title="Previous frame"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M7.75 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.449 6.449 0 014.271.572l.7.296v-7.648l-.658.234a6.453 6.453 0 01-4.3.619l-1.67-.296V2.75z" />
                        </svg>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 border-gray-700"
                        onClick={togglePlayback}
                        title={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 border-gray-700"
                        title="Next frame"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M12.75 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.449 6.449 0 014.271.572l.7.296v-7.648l-.658.234a6.453 6.453 0 01-4.3.619l-1.67-.296V2.75z" fillRule="evenodd" clipRule="evenodd" transform="scale(-1, 1) translate(-20, 0)" />
                        </svg>
                    </Button>
                </div>
            </div>

            <div className="flex-grow relative overflow-hidden">
                {/* Time markers */}
                <div className="h-6 border-b border-gray-800 bg-gray-850 flex text-xs overflow-x-auto">
                    {generateTimeMarkers()}
                </div>

                {/* Timeline tracks container */}
                <div
                    ref={timelineRef}
                    className="relative h-full overflow-x-auto overflow-y-hidden"
                    onClick={handleTimelineClick}
                >
                    {/* Playhead indicator */}
                    <div
                        className="timeline-current-time"
                        style={{ left: `${playheadPosition}%` }}
                    />

                    {/* Tracks */}
                    <div className="flex flex-col h-full">
                        <VideoTrack />
                        <AudioTrack />
                        <SubtitleTrack />
                    </div>
                </div>
            </div>
        </div>
    );
}