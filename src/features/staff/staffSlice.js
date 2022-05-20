import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

export const initialState = {
  isLoading: false,
  error: null,
  currentPageStaffs: [],
  usersById: {},
  totalPage: 1,
  // staffInfo: {},
  staffList: [],
};

const slice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getStaffsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { usersList, count, totalPage } = action.payload;
      usersList.forEach((user) => (state.usersById[user._id] = user));
      state.currentPageStaffs = usersList.map((user) => user._id);
      state.totalUsers = count;
      state.totalPage = totalPage;
    },
    deleteStaffSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getAllDataSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { userList } = action.payload;
      state.staffList = userList;
    },
  },
});

export default slice.reducer;

export const getStaffs =
  ({ filterName, page = 1, limit = 10 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get("/users/all", { params });
      dispatch(slice.actions.getStaffsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

export const deleteStaff = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/users/delete/${targetUserId}`);
    dispatch(slice.actions.deleteStaffSuccess(response.data));
    dispatch(getStaffs({ filterName: "" }));
    toast.success("Delete staff success");
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};
export const getAllData = () => async (dispatch) => {
  try {
    const response = await apiService.get(`/users/data/all`);
    dispatch(slice.actions.getAllDataSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};
