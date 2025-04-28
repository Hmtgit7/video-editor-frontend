// app/components/preview/VideoPlayer.tsx
'use client';

import { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setCurrentTime } from '../../store/slices/timelineSlice';

export function VideoPlayer() {
    const dispatch = useAppDispatch();
    const videoUrl = useAppSelector(state => state.video.videoUrl);
    const currentTime = useAppSelector(state => state.timeline.currentTime);
    const playerRef = useRef<ReactPlayer>(null);

    // Sync player time with timeline time
    useEffect(() => {
        if (playerRef.current) {
            const player = playerRef.current;
            const currentPlayerTime = player.getCurrentTime();

            // Only seek if the difference is significant to avoid endless loops
            if (Math.abs(currentPlayerTime - currentTime) > 0.5) {
                player.seekTo(currentTime, 'seconds');
            }
        }
    }, [currentTime]);

    if (!videoUrl) return null;

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-black">
            <ReactPlayer
                ref={playerRef}
                url={videoUrl}
                width="100%"
                height="100%"
                playing
                controls
                onProgress={(state) => {
                    dispatch(setCurrentTime(state.playedSeconds));
                }}
                onDuration={(duration) => {
                    // If needed, update project duration
                }}
                config={{
                    file: {
                        attributes: {
                            controlsList: 'nodownload'
                        }
                    }
                }}
            />

            {/* Overlay for subtitles and text if needed */}
            <div className="absolute bottom-16 left-0 right-0 flex justify-center pointer-events-none">
                {/* Subtitles would go here */}
            </div>
        </div>
    );
}