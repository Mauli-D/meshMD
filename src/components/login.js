import React, { useState } from "react";
import Axios from "../Axios";
import { useHistory } from "react-router-dom";
import { useAppState } from "../App";

const Login = () => {
  const [state, setState] = useState({ username: "", password: "" });
  const history = useHistory();
  const { dispatch } = useAppState();

  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      ...state,
    };

    Axios.post("/api/auth/login", body)
      .then(({ data }) => {
        localStorage.setItem("token", data.user.token);
        localStorage.setItem("authorId", data.user.id);
      })
      .then(() => {
        dispatch({ type: "UPDATE", payload: { isLoggedIn: true } });
      })
      .then(() => history.push("/posts"));
  };

  return (
    <div id="login">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="col-md-12">
              <form className="form" onSubmit={handleSubmit}>
                <h3 className="text-center text-info">Login</h3>
                <div className="form-group">
                  <label htmlFor="username" className="text-info">
                    Username:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="text-info">
                    Password:
                  </label>
                  <br />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="remember-me" className="text-info" />
                  <br />
                  <input
                    type="submit"
                    name="submit"
                    className="btn btn-info btn-md"
                    value="submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login