import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AlignRight } from "react-feather";
import Modal from "react-modal";

import { useGlobal } from "../../context/globalContext";

import "./Navbar.css";

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ececec",
  },
};

export default function Navbar() {
  function toggleSignUpModal() {
    setModalOpen((prev) => !prev);
  }
  const {
    isModalOpen,
    setModalOpen,
    formValues,
    setFormValues,
    signUp,
    modalState,
    setModalState,
    signIn,
    token,
    isLoggedIn,
    logout,
    getUser,
    setUser,
  } = useGlobal();

  useEffect(() => {
    if (token && isLoggedIn) {
      getUser().then((user) => setUser(user));
    }
  }, [token]);

  return (
    <nav>
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Auth Modal"
      >
        <div className="modalContainer">
          <h2>{modalState === "signup" ? "SignUp Form" : "SignIn Form"}</h2>
          <hr />
          <span>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({ ...formValues, email: e.target.value })
              }
              placeholder="JohnDoe@email.com"
            />
          </span>
          <span>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formValues.password}
              placeholder="123123123"
              onChange={(e) =>
                setFormValues({ ...formValues, password: e.target.value })
              }
            />
          </span>
          <button
            onClick={() => {
              modalState === "signup" ? signUp(formValues) : signIn(formValues);
              setModalOpen(false);
            }}
          >
            {modalState === "signup" ? "Sign Up" : "Sign In"}
          </button>
          <button
            onClick={() => {
              setFormValues({ email: "user@email.com", password: "123123123" });
            }}
          >
            Prefill
          </button>
          <button onClick={() => console.log(token, isLoggedIn)}>Log</button>
          <span
            id="instead"
            onClick={() => {
              setModalState((prevState) =>
                prevState === "signup" ? "signin" : "signup",
              );
            }}
          >
            <u>{modalState === "signup" ? "Sign In" : "Sign Up"} instead...</u>
          </span>
        </div>
      </Modal>
      <div className="nav-container">
        <h2>
          <AlignRight />
          <Link to="/">DAILY JOURNAL</Link>
        </h2>
        <span />
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button onClick={() => logout()}>Logout</button>
            ) : (
              <button onClick={toggleSignUpModal}>Sign Up</button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
