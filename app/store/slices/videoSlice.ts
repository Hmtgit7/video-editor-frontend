// app/store/slices/videoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoSegment } from '../../lib/types';

interface VideoState {
    uploadStatus: 'idle' | 'uploading' | 'success' | 'error';
    uploadProgress: number;
    videoUrl: string | null;
    thumbnailUrl: string | null;
    duration: number;
    selectedVideoSegments: VideoSegment[];
}

const initialState: VideoState = {
    uploadStatus: 'idle',
    uploadProgress: 0,
    videoUrl: null,
    thumbnailUrl: null,
    duration: 0,
    selectedVideoSegments: [],
};

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        setUploadStatus: (state, action: PayloadAction<'idle' | 'uploading' | 'success' | 'error'>) => {
            state.uploadStatus = action.payload;
        },
        setUploadProgress: (state, action: PayloadAction<number>) => {
            state.uploadProgress = action.payload;
        },
        setVideoUrl: (state, action: PayloadAction<string | null>) => {
            state.videoUrl = action.payload;
        },
        setThumbnailUrl: (state, action: PayloadAction<string | null>) => {
            state.thumbnailUrl = action.payload;
        },
        setVideoDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload;
        },
        addVideoSegment: (state, action: PayloadAction<VideoSegment>) => {
            state.selectedVideoSegments.push(action.payload);
        },
        removeVideoSegment: (state, action: PayloadAction<string>) => {
            state.selectedVideoSegments = state.selectedVideoSegments.filter(segment => segment.id !== action.payload);
        },
        updateVideoSegment: (state, action: PayloadAction<{ id: string; changes: Partial<VideoSegment> }>) => {
            const index = state.selectedVideoSegments.findIndex(segment => segment.id === action.payload.id);
            if (index !== -1) {
                state.selectedVideoSegments[index] = {
                    ...state.selectedVideoSegments[index],
                    ...action.payload.changes,
                };
            }
        },
        // Add new reducer for reordering segments
        reorderVideoSegments: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
            const { fromIndex, toIndex } = action.payload;
            if (
                fromIndex >= 0 &&
                fromIndex < state.selectedVideoSegments.length &&
                toIndex >= 0 &&
                toIndex < state.selectedVideoSegments.length
            ) {
                const [movedSegment] = state.selectedVideoSegments.splice(fromIndex, 1);
                state.selectedVideoSegments.splice(toIndex, 0, movedSegment);
            }
        },
    },
});

export const {
    setUploadStatus,
    setUploadProgress,
    setVideoUrl,
    setThumbnailUrl,
    setVideoDuration,
    addVideoSegment,
    removeVideoSegment,
    updateVideoSegment,
    reorderVideoSegments,
} = videoSlice.actions;
export default videoSlice.reducer;