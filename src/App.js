import React from "react";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import { Route, Switch, useLocation } from "react-router-dom";
import TrailsPage from "./pages/TrailsPage";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./themes/theme";
import "./styles/app.scss";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/LayoutComponents/nav/Navbar";
// import NavDrawer from "./components/LayoutComponents/drawer/NavDrawer";

const App = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.auth);
  const { initalized } = useSelector((state) => state.async);

  if (!initalized) return <div>LOADING APP...</div>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <NavDrawer /> */}
      <Navbar />
      <Route>
        <AnimatePresence exitBeforeEnter>
          <motion.div key={location.pathname} exit={{ opacity: 0 }}>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path={["/trails/:id"]} component={TrailsPage} />
              <Route exact path="/profile" component={Profile} />
              {/* <Route
                exact
                path={[`/profile/${currentUser.uid}`]}
                component={Profile}
              /> */}

              <Route exact path="/" component={Home} />
            </Switch>
          </motion.div>
        </AnimatePresence>
      </Route>
    </ThemeProvider>
  );
};

export default App;
