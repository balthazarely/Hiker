import { combineReducers } from "redux";
import trailReducer from "./trailReducer";
import singleTrailReducer from "./singleTrailReducer";
import themeReducer from "./themeReducer";
import asyncReducer from "./asyncReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  theme: themeReducer,
  trail: trailReducer,
  singleTrail: singleTrailReducer,
  async: asyncReducer,
  auth: authReducer,
});

export default rootReducer;
