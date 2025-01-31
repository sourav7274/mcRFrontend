import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getJobs = createAsyncThunk("get/jobs", async () => {
    const response = await fetch("https://backend-pes6z6spo-depressions-projects.vercel.app/jobs");
    const data = await response.json();
    return data.jobs;
});

export const deleteJob = createAsyncThunk("delete/job", async (id) => {
    await fetch(`https://backend-pes6z6spo-depressions-projects.vercel.app/${id}`, {
        method: 'DELETE',
    });
    return id;
});

export const addJob = createAsyncThunk("add/job", async (newJob) => {
    const response = await fetch("https://backend-pes6z6spo-depressions-projects.vercel.app/jobs", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
    });
    const data = await response.json();
    return data.job;
});


const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        jobs: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getJobs.fulfilled, (state, action) => {
            state.jobs = action.payload;
        });
        builder.addCase(deleteJob.fulfilled, (state, action) => {
            state.jobs = state.jobs.filter(job => job.id !== action.payload);
        });
    }
});

export default jobSlice.reducer;