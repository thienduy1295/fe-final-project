import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

export const initialState = {
  isLoading: false,
  error: null,
  tasksList: [],
  tasksOfStaff: [],
  countStatusType: [],
};

const slice = createSlice({
  name: "task",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getTasksSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.tasksList = action.payload.tasksList;
    },

    updateTaskReviewSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    deleteTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getStatusCountSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.countStatusType = action.payload;
    },
    getTaskOfStaffSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.tasksOfStaff = action.payload.tasksList;
    },
  },
});

export default slice.reducer;

export const getTasks = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/tasks/all");
    dispatch(slice.actions.getTasksSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};
export const getTaskOfStaff = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/tasks/incoming");
    dispatch(slice.actions.getTaskOfStaffSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const updateTaskReview = (taskId, status) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const data = {
      status,
    };
    const response = await apiService.put(`tasks/outgoing/${taskId}`, data);
    dispatch(slice.actions.updateTaskReviewSuccess(response.data));
    dispatch(getTasks());
    toast.success("Task updated successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error("Update task failed");
  }
};
export const updateTaskToReview = (taskId, status) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const data = {
      status,
    };
    const response = await apiService.put(`tasks/incoming/${taskId}`, data);
    dispatch(slice.actions.updateTaskReviewSuccess(response.data));
    dispatch(getTaskOfStaff());
    toast.success("Task updated successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error("Update task failed");
  }
};

export const createTask =
  ({ name, detail, assignee, duedate }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("tasks/createTask", {
        name,
        detail,
        assignee,
        duedate,
      });
      dispatch(slice.actions.createTaskSuccess(response.data));
      dispatch(getTasks());
      toast.success("Create task success");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error("Create task failed");
    }
  };

export const deleteTask = (taskId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`tasks/${taskId}`);
    dispatch(slice.actions.deleteTaskSuccess(response.data));
    dispatch(getTasks());
    toast.success("Delete task success");
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error("Delete task failed");
  }
};

export const getStatusCount = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("tasks/countStatus");
    dispatch(slice.actions.getStatusCountSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};
