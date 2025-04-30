// app/store/slices/subtitleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subtitle } from '../../lib/types';

interface SubtitleState {
    subtitles: Subtitle[];
    selectedSubtitleId: string | null;
}

const initialState: SubtitleState = {
    subtitles: [],
    selectedSubtitleId: null,
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
    },
});

export const {
    addSubtitle,
    removeSubtitle,
    updateSubtitle,
    setSelectedSubtitle,
} = subtitleSlice.actions;
export default subtitleSlice.reducer;