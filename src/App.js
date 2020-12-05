import React from "react";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import { Route, Switch, useLocation } from "react-router-dom";
import TrailsPage from "./pages/TrailsPage";
import UserPage from "./pages/UserPage";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./themes/theme";
import "./styles/app.scss";
import { AnimatePresence, motion } from "framer-motion";
import NavDrawer from "./components/LayoutComponents/drawer/NavDrawer";
const App = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const location = useLocation();
  console.log(location);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavDrawer />
      <Route>
        <AnimatePresence exitBeforeEnter>
          <motion.div key={location.pathname} exit={{ opacity: 0 }}>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/user" component={UserPage} />
              <Route exact path={["/trails/:id"]} component={TrailsPage} />
              <Route exact path="/" component={Home} />
            </Switch>
          </motion.div>
        </AnimatePresence>
      </Route>
    </ThemeProvider>
  );
};

export default App;
