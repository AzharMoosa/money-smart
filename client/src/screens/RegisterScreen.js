import Logo from "../components/Logo";
import { FaGoogle } from "react-icons/fa";
import { useState, useEffect } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { Link } from "react-router-dom";
import { register, loginWithGoogle } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

const RegisterScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [clientId, setClientId] = useState();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, userInfo } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { error: errorLogin, userInfo: googleLogin } = userLogin;

  const responseGoogle = async (response) => {
    const { profileObj } = response;
    const { givenName: firstName, familyName: lastName, email } = profileObj;
    dispatch(loginWithGoogle(firstName, lastName, email));
  };

  useEffect(() => {
    const addGoogleClientId = async () => {
      const { data } = await axios.get("/api/config/google");
      setClientId(data);
    };

    if (!clientId) {
      addGoogleClientId();
    }

    if (userInfo) {
      history.push("/");
    }
    if (googleLogin) {
      history.push("/");
    }
    if (error) {
      toast.dark(error);
    }
    if (errorLogin) {
      toast.dark(errorLogin);
    }
  }, [history, clientId, error, userInfo, errorLogin, googleLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords Do Not Match");
      toast.dark(message);
    } else {
      dispatch(register(firstName, lastName, email, password));
    }
  };

  return (
    <div className="signup-screen">
      <div className="signup-container">
        <div className="logo-container">
          <Logo />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            suscipit leo a.
          </p>
        </div>

        <div className="signup-box">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
          />
          <h1>Sign Up</h1>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="name-input">
              <div className="auth-input">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="firstName"
                  id="firstName"
                  value={firstName}
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="auth-input">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="lastName"
                  id="lastName"
                  value={lastName}
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="auth-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="auth-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordStrengthBar
                password={password}
                barColors={[
                  "#c9d6df",
                  "#ff6384",
                  "#ffcd56",
                  "#36a2eb",
                  "#4bc0c0",
                ]}
              />
            </div>
            <div className="auth-input">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button className="btn-large" type="submit">
              Sign Up
            </button>
            {clientId && (
              <GoogleLogin
                clientId={`${clientId}`}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    type="button"
                    className="btn-large-dark"
                  >
                    <FaGoogle />
                    <span>Log In With Google</span>
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            )}
          </form>

          <div className="signup-box-footer">
            <p>
              Already have an account?{"  "}
              <Link className="highlight-green" to={`/login`}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
