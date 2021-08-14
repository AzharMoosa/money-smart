import React from "react";
import Logo from "../components/Logo";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { useEffect } from "react";
import Message from "../components/error/Message";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="logo-container">
          <Logo />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            suscipit leo a.
          </p>
        </div>

        <div className="login-box">
          <h1>Log In</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="auth-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="auth-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn-large" type="submit">
              Log In
            </button>
            <button className="btn-large-dark" type="submit">
              <FaGoogle />
              <span>Log In With Google</span>
            </button>
          </form>

          {error && <Message error={error} />}

          <div className="login-box-footer">
            <p>
              Don't have an account?{"  "}
              <Link className="highlight-pink" to={`/register`}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
