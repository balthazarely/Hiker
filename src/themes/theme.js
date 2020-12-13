import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#07AEE9", dark: "#007EB9" },
    secondary: { main: "#244E95" },
  },
});

theme.props = {
  MuiButton: {
    disableElevation: true,
  },
};
theme.overrides = {
  MuiButton: {
    root: {
      borderRadius: 0, // square corners
      textTransform: "none", // removes uppercase transformation
    },

    containedPrimary: {
      "&:hover": {
        // changes colors for hover state
        backgroundColor: theme.palette.primary.dark,
        color: "white",
      },
    },
    containedSecondary: {
      fontWeight: 700, // makes text bold
    },
  },
};
export default theme;
