// app/components/upload/UploadArea.tsx (continued)
'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    setUploadStatus,
    setUploadProgress,
    setVideoUrl,
    setThumbnailUrl,
    setVideoDuration
} from '../../store/slices/videoSlice';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export function UploadArea() {
    const dispatch = useAppDispatch();
    const { uploadStatus, uploadProgress } = useAppSelector(state => state.video);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];
        const isVideoFile = file.type.startsWith('video/');

        if (!isVideoFile) {
            console.error('Please upload a video file');
            return;
        }

        // Simulate upload process
        dispatch(setUploadStatus('uploading'));

        // Create a progress simulation
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            dispatch(setUploadProgress(progress));

            if (progress >= 100) {
                clearInterval(interval);

                // Create object URL for preview
                const videoUrl = URL.createObjectURL(file);

                // Set video data in the store
                dispatch(setVideoUrl(videoUrl));

                // For demo purposes, we'll create a mock thumbnail
                // In a real app, you would generate this server-side
                dispatch(setThumbnailUrl(videoUrl));

                // Set arbitrary duration for the demo
                // In a real app, you would get this from the video metadata
                dispatch(setVideoDuration(120));

                dispatch(setUploadStatus('success'));
            }
        }, 200);
    }, [dispatch]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'video/*': []
        },
        maxFiles: 1
    });

    return (
        <div className="w-full max-w-3xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Upload Your Video</h2>

            <div
                {...getRootProps()}
                className={`
          border-2 border-dashed rounded-lg p-12 
          flex flex-col items-center justify-center
          cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-500'}
          ${uploadStatus === 'uploading' ? 'pointer-events-none' : ''}
        `}
            >
                <input {...getInputProps()} />

                {uploadStatus === 'uploading' ? (
                    <div className="w-full">
                        <p className="text-center mb-4">Uploading video...</p>
                        <Progress value={uploadProgress} className="h-2 mb-2" />
                        <p className="text-xs text-right text-gray-400">{uploadProgress}%</p>
                    </div>
                ) : (
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 mb-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>

                        <p className="mb-2 text-lg">Drag & drop your video here</p>
                        <p className="text-sm text-gray-400 mb-6">or click to select a file</p>

                        <Button variant="outline" className="border-gray-700 text-gray-300">
                            Select Video
                        </Button>
                    </>
                )}
            </div>

            <div className="mt-6 text-sm text-gray-400 text-center">
                <p>Supported formats: MP4, MOV, AVI, WebM</p>
                <p className="mt-1">Maximum file size: 500MB</p>
            </div>
        </div>
    );
}