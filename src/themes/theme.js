import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#FE375C", dark: "#DB1164" },
    secondary: { main: "#e8e8e8" },
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

//   MuiInput: {
//     root: {
//       top: theme.spacing(2),

//       border: `1px solid ${grey[500]}`,

//       outline: `1px solid transparent`,

//       padding: theme.spacing(1),

//       "&$focused": {
//         border: `1px solid ${theme.palette.primary.main}`,

//         outline: `1px solid ${theme.palette.primary.main}`,
//       },
//     },

//     // we don't need `focused: {}` with overrides
//   },
// };
