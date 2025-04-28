// app/store/slices/exportSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExportState {
    status: 'idle' | 'rendering' | 'success' | 'error';
    progress: number;
    outputUrl: string | null;
    format: 'mp4' | 'webm' | 'gif';
    quality: 'low' | 'medium' | 'high';
}

const initialState: ExportState = {
    status: 'idle',
    progress: 0,
    outputUrl: null,
    format: 'mp4',
    quality: 'high',
};

const exportSlice = createSlice({
    name: 'export',
    initialState,
    reducers: {
        setExportStatus: (state, action: PayloadAction<'idle' | 'rendering' | 'success' | 'error'>) => {
            state.status = action.payload;
        },
        setExportProgress: (state, action: PayloadAction<number>) => {
            state.progress = action.payload;
        },
        setOutputUrl: (state, action: PayloadAction<string | null>) => {
            state.outputUrl = action.payload;
        },
        setExportFormat: (state, action: PayloadAction<'mp4' | 'webm' | 'gif'>) => {
            state.format = action.payload;
        },
        setExportQuality: (state, action: PayloadAction<'low' | 'medium' | 'high'>) => {
            state.quality = action.payload;
        },
    },
});

export const {
    setExportStatus,
    setExportProgress,
    setOutputUrl,
    setExportFormat,
    setExportQuality,
} = exportSlice.actions;
export default exportSlice.reducer;