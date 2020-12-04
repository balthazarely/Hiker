export const DARK_MODE = "DARK_MODE";
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";

const initialState = {
  darkMode: false,
  sideBarOpen: false,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DARK_MODE":
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sideBarOpen: !state.sideBarOpen,
      };

    default:
      return state;
  }
};

export default themeReducer;
