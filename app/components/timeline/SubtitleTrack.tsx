// app/components/timeline/SubtitleTrack.tsx
'use client';

import { useAppSelector } from '../../store/hooks';

export function SubtitleTrack() {
  const duration = useAppSelector(state => state.video.duration);
  const zoom = useAppSelector(state => state.timeline.zoom);
  
  // Mock subtitle segments
  const mockSubtitles = [
    {
      id: 'subtitle-1',
      text: 'First subtitle',
      startTime: 5,
      endTime: 10,
    },
    {
      id: 'subtitle-2',
      text: 'Second subtitle with longer text that might get truncated',
      startTime: 30,
      endTime: 40,
    }
  ];

  return (
    <div className="h-16 flex items-center relative">
      <div className="sticky left-0 top-0 bottom-0 w-24 bg-gray-800 border-r border-gray-700 flex items-center px-2 z-10">
        <span className="text-xs truncate">Subtitles</span>
      </div>
      
      <div className="flex items-center ml-24 h-full w-full">
        {mockSubtitles.map(subtitle => {
          const segmentWidth = ((subtitle.endTime - subtitle.startTime) / (duration * zoom)) * 100;
          const segmentLeft = (subtitle.startTime / (duration * zoom)) * 100;
          
          return (
            <div
              key={subtitle.id}
              className="h-10 bg-purple-600 rounded relative cursor-pointer hover:bg-purple-500 flex items-center justify-center"
              style={{
                width: `${segmentWidth}%`,
                left: `${segmentLeft}%`,
                position: 'absolute'
              }}
            >
              <span className="text-xs truncate px-2">{subtitle.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}