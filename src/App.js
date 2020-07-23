import React, { useEffect, useReducer } from "react";
import "./styles.css";
import $ from "jquery";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/nav";
import GetPosts from "./components/get";
import LogIn from "./components/login";
import Register from "./components/register";
import CreatePost from "./components/createpost";

export const AppContext = React.createContext();

export function useAppState() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within a AppContext");
  }
  return context;
}
const Appstate = { isLoggedIn: false };
function AppReducer(state = Appstate, action) {
  switch (action.type) {
    case "UPDATE": {
      return { ...state, ...action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const App = () => {
  const [state, dispatch] = useReducer(AppReducer, Appstate);

  useEffect(() => {
    $(".collapse ul li a").click(function () {
      /* always close responsive nav after click */
      $(".navbar-toggler:visible").click();
    });
  }, []);

  return (
    <AppContext.Provider value={{ dispatch, appState: state }}>
      <Router>
        <Nav />
        <Switch>
        <Route path="/create-post">
            <CreatePost />
          </Route>
          <Route path="/posts">
            <GetPosts />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
