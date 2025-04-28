// app/components/timeline/VideoTrack.tsx
'use client';

import { useAppSelector } from '../../store/hooks';

export function VideoTrack() {
    const videoSegments = useAppSelector(state => state.video.selectedVideoSegments);
    const duration = useAppSelector(state => state.video.duration);
    const zoom = useAppSelector(state => state.timeline.zoom);

    // For now we'll just mock data if none exists
    const mockSegments = [
        {
            id: 'segment-1',
            startTime: 0,
            endTime: 20,
            sourceUrl: '',
            thumbnailUrl: '',
        },
        {
            id: 'segment-2',
            startTime: 20,
            endTime: 40,
            sourceUrl: '',
            thumbnailUrl: '',
        }
    ];

    const segments = videoSegments.length > 0 ? videoSegments : mockSegments;

    return (
        <div className="h-16 flex items-center border-b border-gray-800 relative">
            <div className="sticky left-0 top-0 bottom-0 w-24 bg-gray-800 border-r border-gray-700 flex items-center px-2 z-10">
                <span className="text-xs truncate">Video</span>
            </div>

            <div className="flex items-center ml-24 h-full w-full">
                {segments.map(segment => {
                    const segmentWidth = ((segment.endTime - segment.startTime) / (duration * zoom)) * 100;
                    const segmentLeft = (segment.startTime / (duration * zoom)) * 100;

                    return (
                        <div
                            key={segment.id}
                            className="h-12 bg-blue-600 rounded relative cursor-pointer hover:bg-blue-500 flex items-center justify-center"
                            style={{
                                width: `${segmentWidth}%`,
                                left: `${segmentLeft}%`,
                                position: 'absolute'
                            }}
                        >
                            <span className="text-xs truncate px-2">Segment {segment.id.split('-')[1]}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}