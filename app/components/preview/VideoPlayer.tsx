'use client';

import { useRef, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setCurrentTime } from '../../store/slices/timelineSlice';
import { usePreviewSync } from '../../hooks/usePreviewSync';
import { TextOverlay } from '../text/TextOverlay';
import { ImageOverlay } from '../image/ImageOverlay';

export function VideoPlayer() {
    const dispatch = useAppDispatch();
    const videoUrl = useAppSelector(state => state.video.videoUrl);
    const playerRef = useRef<ReactPlayer>(null);

    // Get synchronized preview data
    const { activeSubtitles, activeVolume } = usePreviewSync(playerRef);

    // Get overlays for the current time
    const imageOverlays = useAppSelector(state => state.image?.overlays || []);
    const textOverlays = useAppSelector(state => state.text?.overlays || []);
    const currentTime = useAppSelector(state => state.timeline.currentTime);

    // Handle progress updates from the player
    const handleProgress = useCallback((state) => {
        dispatch(setCurrentTime(state.playedSeconds));
    }, [dispatch]);

    if (!videoUrl) return null;

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-black">
            <ReactPlayer
                ref={playerRef}
                url={videoUrl}
                width="100%"
                height="100%"
                playing
                volume={activeVolume}
                controls
                onProgress={handleProgress}
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

            {/* Overlay container for subtitles, text, and images */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Active subtitles */}
                {activeSubtitles.map(subtitle => (
                    <div
                        key={subtitle.id}
                        className="absolute left-0 right-0 text-center px-4"
                        style={{
                            bottom: subtitle.position.y === 'bottom' ? '80px' : 'auto',
                            top: subtitle.position.y === 'top' ? '20px' :
                                subtitle.position.y === 'middle' ? '50%' : 'auto',
                            transform: subtitle.position.y === 'middle' ? 'translateY(-50%)' : 'none',
                            fontFamily: subtitle.style.fontFamily,
                            fontSize: `${subtitle.style.fontSize}px`,
                            color: subtitle.style.color,
                            backgroundColor: subtitle.style.backgroundColor,
                            fontWeight: subtitle.style.bold ? 'bold' : 'normal',
                            fontStyle: subtitle.style.italic ? 'italic' : 'normal',
                            textDecoration: subtitle.style.underline ? 'underline' : 'none',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            maxWidth: '80%',
                            margin: '0 auto',
                        }}
                    >
                        {subtitle.text}
                    </div>
                ))}

                {/* Text overlays */}
                {textOverlays.filter(overlay =>
                    currentTime >= overlay.startTime &&
                    currentTime <= overlay.endTime
                ).map(overlay => (
                    <TextOverlay
                        key={overlay.id}
                        id={overlay.id}
                        text={overlay.text}
                        style={overlay.style}
                        position={overlay.position}
                    />
                ))}

                {/* Image overlays */}
                {imageOverlays.filter(overlay =>
                    currentTime >= overlay.startTime &&
                    currentTime <= overlay.endTime
                ).map(overlay => (
                    <ImageOverlay
                        key={overlay.id}
                        id={overlay.id}
                        url={overlay.url}
                        position={overlay.position}
                        size={overlay.size}
                        style={overlay.style}
                    />
                ))}
            </div>
        </div>
    );
}