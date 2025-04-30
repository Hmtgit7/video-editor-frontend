// app/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import timelineReducer from './slices/timelineSlice';
import videoReducer from './slices/videoSlice';
import audioReducer from './slices/audioSlice';
import subtitleReducer from './slices/subtitleSlice';
import exportReducer from './slices/exportSlice';

export const store = configureStore({
    reducer: {
        project: projectReducer,
        timeline: timelineReducer,
        video: videoReducer,
        audio: audioReducer,
        subtitle: subtitleReducer,
        export: exportReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;