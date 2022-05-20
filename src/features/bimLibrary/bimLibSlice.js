import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";

export const initialState = {
  isLoading: false,
  error: null,
  currentPageBims: [],
  bimsById: {},
  totalPage: 1,
};

const slice = createSlice({
  name: "bimLib",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createBimSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getBimSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { bimsList, count, totalPage } = action.payload;
      bimsList.forEach((bim) => (state.bimsById[bim._id] = bim));
      state.currentPageBims = bimsList.map((bim) => bim._id);
      state.totalBims = count;
      state.totalPage = totalPage;
    },
    deleteBimSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    editBimSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getSingleBimSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const createBim =
  ({ name, imageUrl, fileUrl, type }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // upload image to cloudinary
      const fileUrlCloud = await cloudinaryUpload(fileUrl);
      const imageUrlCloud = await cloudinaryUpload(imageUrl);
      const response = await apiService.post("/bimLibrary/createBim", {
        name,
        imageUrl: imageUrlCloud,
        fileUrl: fileUrlCloud,
        type,
      });
      dispatch(slice.actions.createBimSuccess(response.data));
      dispatch(getBims({ filterName: "" }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getBims =
  ({ filterName, page = 1, limit = 10, filterType }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      if (filterType) params.type = filterType;
      const response = await apiService.get("/bimLibrary/all", { params });
      dispatch(slice.actions.getBimSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getSingleBim = (bimId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/bimLibrary/${bimId}`);
    dispatch(slice.actions.getSingleBimSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const deleteBim = (bimId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/bimLibrary/${bimId}`);
    dispatch(slice.actions.deleteBimSuccess(response.data));
    dispatch(getBims({ filterName: "" }));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const editBim =
  ({ bimId, name, imageUrl, fileUrl, type }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        name,
        type,
      };
      if (imageUrl instanceof File) {
        const imageUrlFile = await cloudinaryUpload(imageUrl);
        data.imageUrl = imageUrlFile;
      }
      if (fileUrl instanceof File) {
        const fileUrlFile = await cloudinaryUpload(fileUrl);
        data.fileUrl = fileUrlFile;
      }
      const response = await apiService.put(`/bimLibrary/${bimId}`, data);
      dispatch(slice.actions.editBimSuccess(response.data));
      dispatch(getBims({ filterName: "" }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

export default slice.reducer;
