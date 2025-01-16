import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        completedTasks: [] as string[],
        clickedLinks: {} as Record<string, boolean>,
    },
    reducers: {
        markTaskAsCompleted: (state, action) => {
            const taskId = action.payload;
            if (!state.completedTasks.includes(taskId)) {
                state.completedTasks.push(taskId); 
            }
        },
        removeCompletedTask: (state, action) => {
            const taskId = action.payload;
            state.completedTasks = state.completedTasks.filter((id) => id !== taskId); 
        },
        setLinkClicked: (state, action) => {
            const { taskId } = action.payload;
            state.clickedLinks[taskId] = true; 
        },
    },
});

// Export the actions
export const { markTaskAsCompleted, removeCompletedTask, setLinkClicked } = tasksSlice.actions;

// Export the reducer
export default tasksSlice.reducer;
