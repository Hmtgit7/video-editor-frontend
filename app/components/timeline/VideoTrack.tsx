'use client';

import { useAppSelector } from '../../store/hooks';
import { DraggableSegment } from './DraggableSegment';

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
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gray-800 border-r border-gray-700 flex items-center px-2 z-10">
                <span className="text-xs truncate">Video</span>
            </div>

            <div className="flex items-center ml-24 h-full relative">
                {segments.map((segment, index) => {
                    const segmentWidth = `${((segment.endTime - segment.startTime) / (duration * zoom)) * 100}%`;
                    const segmentLeft = `${(segment.startTime / (duration * zoom)) * 100}%`;

                    return (
                        <DraggableSegment
                            key={segment.id}
                            id={segment.id}
                            index={index}
                            segmentWidth={segmentWidth}
                            segmentLeft={segmentLeft}
                            className="bg-blue-600 hover:bg-blue-500"
                        >
                            <span className="text-xs truncate px-2">Segment {segment.id.split('-')[1]}</span>
                        </DraggableSegment>
                    );
                })}
            </div>
        </div>
    );
}