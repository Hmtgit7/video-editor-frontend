// app/store/slices/projectSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectState {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    duration: number;
    resolution: {
        width: number;
        height: number;
    };
}

const initialState: ProjectState = {
    id: '',
    name: 'Untitled Project',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    duration: 0,
    resolution: {
        width: 1920,
        height: 1080,
    },
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjectName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
            state.updatedAt = new Date().toISOString();
        },
        setProjectDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload;
            state.updatedAt = new Date().toISOString();
        },
        setProjectResolution: (state, action: PayloadAction<{ width: number; height: number }>) => {
            state.resolution = action.payload;
            state.updatedAt = new Date().toISOString();
        },
    },
});

export const { setProjectName, setProjectDuration, setProjectResolution } = projectSlice.actions;
export default projectSlice.reducer;
