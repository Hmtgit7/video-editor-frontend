'use client';

import { useEffect, useRef } from 'react';
import { useAppSelector } from '../store/hooks';
import ReactPlayer from 'react-player';

export function usePreviewSync(playerRef: React.RefObject<ReactPlayer>) {
    const subtitles = useAppSelector(state => state.subtitle.subtitles);
    const currentTime = useAppSelector(state => state.timeline.currentTime);
    const audioSettings = useAppSelector(state => state.audio);
    // We could add more state selectors that should trigger preview updates

    // Keep track of the player's last seeking operation to prevent feedback loops
    const lastSeekTime = useRef(0);

    // Sync player with the timeline's current time
    useEffect(() => {
        if (playerRef.current) {
            const player = playerRef.current;
            const currentPlayerTime = player.getCurrentTime();

            // Only seek if the difference is significant and not too frequent
            // This prevents infinite loops from player's onProgress updates
            if (Math.abs(currentPlayerTime - currentTime) > 0.5 &&
                Date.now() - lastSeekTime.current > 100) {
                player.seekTo(currentTime, 'seconds');
                lastSeekTime.current = Date.now();
            }
        }
    }, [currentTime, playerRef]);

    // Return active subtitles for the current time
    const activeSubtitles = subtitles.filter(
        subtitle =>
            currentTime >= subtitle.startTime &&
            currentTime <= subtitle.endTime
    );

    // Return active volume level
    const activeVolume = audioSettings.isMuted ? 0 : audioSettings.volume / 100;

    return {
        activeSubtitles,
        activeVolume,
        // We could add other derived state for the preview here
    };
}