import React from "react";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import { Route, Switch, useLocation } from "react-router-dom";
import TrailsPage from "./pages/TrailsPage";
import SingleTrailPage from "./pages/SingleTrailPage";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./themes/theme";
import "./styles/app.scss";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const location = useLocation();
  console.log(location);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Route>
        <NavBar />
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/trails" component={TrailsPage} /> */}
            <Route exact path={["/trails/:id"]} component={TrailsPage} />
          </Switch>
        </AnimatePresence>
      </Route>
    </ThemeProvider>
  );
};

export default App;
