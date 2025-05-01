import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subtitle } from '../../lib/types';

interface SubtitleState {
    subtitles: Subtitle[];
    selectedSubtitleId: string | null;
    previewSubtitle: Subtitle | null;
}

const initialState: SubtitleState = {
    subtitles: [],
    selectedSubtitleId: null,
    previewSubtitle: null,
};

const subtitleSlice = createSlice({
    name: 'subtitle',
    initialState,
    reducers: {
        addSubtitle: (state, action: PayloadAction<Subtitle>) => {
            state.subtitles.push(action.payload);
        },
        removeSubtitle: (state, action: PayloadAction<string>) => {
            state.subtitles = state.subtitles.filter(subtitle => subtitle.id !== action.payload);
        },
        updateSubtitle: (state, action: PayloadAction<{ id: string; changes: Partial<Subtitle> }>) => {
            const index = state.subtitles.findIndex(subtitle => subtitle.id === action.payload.id);
            if (index !== -1) {
                state.subtitles[index] = {
                    ...state.subtitles[index],
                    ...action.payload.changes,
                };
            }
        },
        setSelectedSubtitle: (state, action: PayloadAction<string | null>) => {
            state.selectedSubtitleId = action.payload;
        },
        setPreviewSubtitle: (state, action: PayloadAction<Subtitle | null>) => {
            state.previewSubtitle = action.payload;
        },
        clearPreviewSubtitle: (state) => {
            state.previewSubtitle = null;
        }
    },
});

export const {
    addSubtitle,
    removeSubtitle,
    updateSubtitle,
    setSelectedSubtitle,
    setPreviewSubtitle,
    clearPreviewSubtitle,
} = subtitleSlice.actions;
export default subtitleSlice.reducer;