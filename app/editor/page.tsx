// app/editor/page.tsx
'use client';

import { useEffect } from 'react';
import { UploadArea } from '../components/upload/UploadArea';
import { Timeline } from '../components/timeline/Timeline';
import { VideoPlayer } from '../components/preview/VideoPlayer';
import { ExportControls } from '../components/preview/ExportControls';
import { useAppSelector } from '../store/hooks';

export default function EditorPage() {
    const videoUrl = useAppSelector(state => state.video.videoUrl);

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow flex">
                {!videoUrl ? (
                    <div className="flex items-center justify-center w-full h-full">
                        <UploadArea />
                    </div>
                ) : (
                    <>
                        <div className="flex-grow flex flex-col">
                            <div className="flex-grow">
                                <VideoPlayer />
                            </div>
                            <div className="h-48 bg-gray-900">
                                <Timeline />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="h-16 bg-gray-900 border-t border-gray-800 flex items-center justify-end px-4">
                <ExportControls />
            </div>
        </div>
    );
}