import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "@lib/store";

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
            const { taskId, accountId } = action.payload;
            const uniqueKey = `${taskId}_${accountId}`; // Combine taskId and accountId
            state.clickedLinks[uniqueKey] = true;
        },
    },
});

export const selectLinkClicked = (taskId: string, accountId: string | null | undefined) => (state: RootState) => {
    const uniqueKey = `${taskId}_${accountId}`;
    return state.tasks.clickedLinks[uniqueKey] || false; // Return false if not clicked
  };
// Export the actions
export const { markTaskAsCompleted, removeCompletedTask, setLinkClicked } = tasksSlice.actions;

// Export the reducer
export default tasksSlice.reducer;
