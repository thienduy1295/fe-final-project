import { configureStore, combineReducers } from "@reduxjs/toolkit";
import staffReducer, {
  initialState as staffState,
} from "../features/staff/staffSlice";
import bimLibReducer, {
  initialState as bimState,
} from "../features/bimLibrary/bimLibSlice";
import taskReducer, {
  initialState as taskState,
} from "../features/task/taskSlice";
import userReducer, {
  initialState as userState,
} from "../features/user/userSlice";
import projectReducer, {
  initialState as projectState,
} from "../features/project/projectSlice";

const combinedReducer = combineReducers({
  staff: staffReducer,
  bimLib: bimLibReducer,
  task: taskReducer,
  user: userReducer,
  project: projectReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "app/logout") {
    state = {
      staff: staffState,
      bimLib: bimState,
      task: taskState,
      user: userState,
      project: projectState,
    };
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
