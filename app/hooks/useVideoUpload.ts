// app/hooks/useVideoUpload.ts
import { useCallback } from 'react';
import { useAppDispatch } from '../store/hooks';
import {
    setUploadStatus,
    setUploadProgress,
    setVideoUrl,
    setThumbnailUrl,
    setVideoDuration,
} from '../store/slices/videoSlice';
import { setProjectDuration } from '../store/slices/projectSlice';

export function useVideoUpload() {
    const dispatch = useAppDispatch();

    const uploadVideo = useCallback((file: File) => {
        if (!file.type.startsWith('video/')) {
            throw new Error('Please upload a video file');
        }

        dispatch(setUploadStatus('uploading'));

        // Simulate upload process
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

                // For demo purposes, we'll set an arbitrary duration
                // In a real app, you would get this from the video metadata
                const mockDuration = 120; // 2 minutes
                dispatch(setVideoDuration(mockDuration));
                dispatch(setProjectDuration(mockDuration));

                dispatch(setUploadStatus('success'));
            }
        }, 200);

        // Return a cleanup function
        return () => clearInterval(interval);
    }, [dispatch]);

    return { uploadVideo };
}