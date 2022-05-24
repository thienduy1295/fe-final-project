import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

export const initialState = {
  isLoading: false,
  error: null,
  projectList: [],
};

const slice = createSlice({
  name: "project",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAllProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log(action.payload);
      const { projectList } = action.payload;
      state.projectList = projectList;
    },
  },
});

export default slice.reducer;

export const getAllProject = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/project/all");
    dispatch(slice.actions.getAllProjectSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};
