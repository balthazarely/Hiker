import { combineReducers } from "redux";
import trailReducer from "./trailReducer";
import themeReducer from "./themeReducer";
import asyncReducer from "./asyncReducer";

const rootReducer = combineReducers({
  theme: themeReducer,
  trail: trailReducer,
  async: asyncReducer,
});

export default rootReducer;
