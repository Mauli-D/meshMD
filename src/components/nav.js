import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../App";

/***********************
  Nav Component
 ***********************/

const Nav = (props) => {
  const { appState, dispatch } = useAppState();
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold rounded ml-auto collapsed"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {" "}
            <i className="fas fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
                <li className="nav-item mx-0 mx-lg-1">
                  <Link
                    className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                    to="/posts"
                  >
                    Posts
                  </Link>
                </li>
              {appState.isLoggedIn && (
                <li className="nav-item mx-0 mx-lg-1">
                  <Link
                    className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                    to="/create-post"
                  >
                    Create Post
                  </Link>
                </li>
              )}
              {!appState.isLoggedIn && (
                <li className="nav-item mx-0 mx-lg-1">
                  <Link
                    className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                    to="/Login"
                  >
                    Login
                  </Link>
                </li>
              )}
              {appState.isLoggedIn ? (
                <li className="nav-item mx-0 mx-lg-1">
                  <Link
                    className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                    to="/login"
                    onClick={() => {
                      dispatch({
                        type: "UPDATE",
                        payload: { isLoggedIn: false },
                      });
                      localStorage.clear();
                    }}
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <li className="nav-item mx-0 mx-lg-1">
                  <Link
                    className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                    to="/Register"
                  >
                    Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Nav;
