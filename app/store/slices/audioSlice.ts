// app/store/slices/audioSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AudioTrack, AudioSegment } from '../../lib/types';

interface AudioState {
    originalAudio: AudioTrack | null;
    backgroundMusic: AudioTrack | null;
    isMuted: boolean;
    volume: number;
    audioSegments: AudioSegment[];
}

const initialState: AudioState = {
    originalAudio: null,
    backgroundMusic: null,
    isMuted: false,
    volume: 100,
    audioSegments: [],
};

const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        setOriginalAudio: (state, action: PayloadAction<AudioTrack | null>) => {
            state.originalAudio = action.payload;
        },
        setBackgroundMusic: (state, action: PayloadAction<AudioTrack | null>) => {
            state.backgroundMusic = action.payload;
        },
        setIsMuted: (state, action: PayloadAction<boolean>) => {
            state.isMuted = action.payload;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
        addAudioSegment: (state, action: PayloadAction<AudioSegment>) => {
            state.audioSegments.push(action.payload);
        },
        removeAudioSegment: (state, action: PayloadAction<string>) => {
            state.audioSegments = state.audioSegments.filter(segment => segment.id !== action.payload);
        },
        updateAudioSegment: (state, action: PayloadAction<{ id: string; changes: Partial<AudioSegment> }>) => {
            const index = state.audioSegments.findIndex(segment => segment.id === action.payload.id);
            if (index !== -1) {
                state.audioSegments[index] = {
                    ...state.audioSegments[index],
                    ...action.payload.changes,
                };
            }
        },
    },
});

export const {
    setOriginalAudio,
    setBackgroundMusic,
    setIsMuted,
    setVolume,
    addAudioSegment,
    removeAudioSegment,
    updateAudioSegment,
} = audioSlice.actions;
export default audioSlice.reducer;
