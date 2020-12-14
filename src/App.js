import React from "react";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import { Route, Switch, useLocation } from "react-router-dom";
import TrailsPage from "./pages/TrailsPage";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import theme from "./themes/theme";
import {
  CircularProgress,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core/";
import "./styles/app.scss";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/LayoutComponents/nav/Navbar";
import { ToastContainer } from "react-toastify";
import About from "./pages/About";

const App = () => {
  const location = useLocation();
  const { initalized } = useSelector((state) => state.async);

  if (!initalized)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress />
      </div>
    );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position='top-right' hideProgressBar={true} autoClose={2000}/>
      <Navbar />
      <Route>
        <AnimatePresence exitBeforeEnter>
          <motion.div key={location.pathname} exit={{ opacity: 0 }}>
            <Switch location={location} key={location.pathname}>
            <Route exact path="/about" component={About} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path={["/trails/:id"]} component={TrailsPage} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/" component={Home} />
            </Switch>
          </motion.div>
        </AnimatePresence>
      </Route>
    </ThemeProvider>
  );
};

export default App;
