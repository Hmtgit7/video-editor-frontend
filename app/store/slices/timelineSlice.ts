// app/store/slices/timelineSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '../../lib/types';

interface TimelineState {
    currentTime: number;
    zoom: number;
    tracks: {
        video: Track[];
        audio: Track[];
        subtitle: Track[];
        image: Track[];
    };
    selectedTrackId: string | null;
    selectedItemId: string | null;
}

const initialState: TimelineState = {
    currentTime: 0,
    zoom: 1,
    tracks: {
        video: [],
        audio: [],
        subtitle: [],
        image: [],
    },
    selectedTrackId: null,
    selectedItemId: null,
};

const timelineSlice = createSlice({
    name: 'timeline',
    initialState,
    reducers: {
        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload;
        },
        setZoom: (state, action: PayloadAction<number>) => {
            state.zoom = action.payload;
        },
        addTrack: (state, action: PayloadAction<{ type: 'video' | 'audio' | 'subtitle' | 'image'; track: Track }>) => {
            state.tracks[action.payload.type].push(action.payload.track);
        },
        removeTrack: (state, action: PayloadAction<{ type: 'video' | 'audio' | 'subtitle' | 'image'; id: string }>) => {
            state.tracks[action.payload.type] = state.tracks[action.payload.type].filter(
                track => track.id !== action.payload.id
            );
        },
        setSelectedTrack: (state, action: PayloadAction<string | null>) => {
            state.selectedTrackId = action.payload;
        },
        setSelectedItem: (state, action: PayloadAction<string | null>) => {
            state.selectedItemId = action.payload;
        },
        // Add other timeline-related actions here
    },
});

export const {
    setCurrentTime,
    setZoom,
    addTrack,
    removeTrack,
    setSelectedTrack,
    setSelectedItem,
} = timelineSlice.actions;
export default timelineSlice.reducer;
