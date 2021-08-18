import Logo from "../components/Logo";
import { FaGoogle } from "react-icons/fa";
import { useState, useEffect } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/error/Message";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
    if (error) {
      toast.dark(error);
    }
  }, [history, error, userInfo]);

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
            <button className="btn-large-dark" type="submit">
              <FaGoogle />
              <span>Sign Up With Google</span>
            </button>
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
