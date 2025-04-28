// app/components/timeline/AudioTrack.tsx
'use client';

import { useAppSelector } from '../../store/hooks';

export function AudioTrack() {
    const duration = useAppSelector(state => state.video.duration);
    const zoom = useAppSelector(state => state.timeline.zoom);

    // Mock audio segments
    const mockSegments = [
        {
            id: 'audio-1',
            name: 'Original Audio',
            startTime: 0,
            endTime: duration,
        },
        {
            id: 'audio-2',
            name: 'Background Music',
            startTime: 10,
            endTime: 60,
        }
    ];

    return (
        <div className="h-16 flex items-center border-b border-gray-800 relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gray-800 border-r border-gray-700 flex items-center px-2 z-10">
                <span className="text-xs truncate">Audio</span>
            </div>

            <div className="flex items-center ml-24 h-full">
                {mockSegments.map(segment => {
                    const segmentWidth = ((segment.endTime - segment.startTime) / (duration * zoom)) * 100;
                    const segmentLeft = (segment.startTime / (duration * zoom)) * 100;

                    return (
                        <div
                            key={segment.id}
                            className="h-12 bg-green-600 rounded relative cursor-pointer hover:bg-green-500 flex items-center justify-center"
                            style={{
                                width: `${segmentWidth}%`,
                                left: `${segmentLeft}%`,
                                position: 'absolute'
                            }}
                        >
                            <span className="text-xs truncate px-2">{segment.name}</span>
                            {/* Simulate waveform with a div */}
                            <div className="absolute inset-0 overflow-hidden flex items-center justify-center opacity-30">
                                <div className="w-full h-4 bg-repeat-x"
                                    style={{
                                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'16\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 8 L2 10 L4 6 L6 12 L8 2 L10 14 L12 4 L14 8 L16 6 L18 10 L20 8\' fill=\'none\' stroke=\'white\' stroke-width=\'1\'/%3E%3C/svg%3E")',
                                        backgroundSize: '20px 16px'
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}