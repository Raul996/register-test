import React, { useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../redux/reducers/registerReduser";
import { AppDispatch } from "../redux/store";
import "./PageStyle.css";
import CircleIndicators from "../Components/CircleIndicators";
import { validateEmail, validatePassword } from "../utils/validators";
import LoadingCircle from "../Components/Loading";
import useAuth from "../utils/useAuth";
import { useNavigate } from "react-router-dom";

type UserForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormAction = {
  type: "name" | "email" | "password" | "confirmPassword";
  payload: string;
};

const reducer = (state: UserForm, action: FormAction) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "confirmPassword":
      return { ...state, confirmPassword: action.payload };
    default:
      return state;
  }
};

const initialState: UserForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const { hasError, error, isLoading } = useSelector(
    (state: any) => state.registerReduser
  );

  const navigate = useNavigate();
  const isAuth = useAuth();

  useEffect(() => {
    if (isAuth) {
      navigate("/user");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    if (hasError) {
      alert(error.message);
    }
  }, [hasError, error]);

  const dispatch = useDispatch<AppDispatch>();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [state, dispatchForm] = useReducer(reducer, initialState);

  const next = () => {
    if (currentIndex === 0) {
      if (state.name === "" || state.email === "") {
        alert("Please fill in all fields");
        return;
      }

      if (!validateEmail(state.email)) {
        alert("Please enter a valid email");
        return;
      }
    }
    if (currentIndex === 1) {
      if (state.password === "" || state.confirmPassword === "") {
        alert("Please fill in all fields");
        return;
      }

      if (!validatePassword(state.password)) {
        alert(
          "Password must be at least 8 characters long and contain at least one number and one letter"
        );
        return;
      }

      if (state.password !== state.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      dispatch(registerUser(state));
      return;
    }

    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const firstPage = () => (
    <div className={"formContainer"}>
      <h1 className="textColor">Register</h1>
      <div className={"form"}>
        <div className={"formGroup"}>
          <label className="textColor" htmlFor="name">
            Name
          </label>
          <input
            className="formInput"
            placeholder="Name"
            type="text"
            id="name"
            value={state.name}
            onChange={(e) =>
              dispatchForm({
                type: "name",
                payload: e.target.value,
              })
            }
          />
        </div>

        <div className={"formGroup"}>
          <label className="textColor" htmlFor="email">
            Email
          </label>
          <input
            className="formInput"
            type="email"
            placeholder="Email"
            id="email"
            value={state.email}
            onChange={(e) =>
              dispatchForm({
                type: "email",
                payload: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );

  const secondPage = () => (
    <div className={"formContainer"}>
      <h1 className="textColor">Register</h1>
      <div className={"form"}>
        <div className={"formGroup"}>
          <label className="textColor" htmlFor="password">
            Password
          </label>
          <input
            className="formInput"
            type="password"
            placeholder="Password"
            id="password"
            value={state.password}
            onChange={(e) =>
              dispatchForm({ type: "password", payload: e.target.value })
            }
          />
        </div>

        <div className={"formGroup"}>
          <label className="textColor" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="formInput"
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            value={state.confirmPassword}
            onChange={(e) =>
              dispatchForm({ type: "confirmPassword", payload: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className={"pageContainer"}>
      <CircleIndicators activeIndex={currentIndex} />

      {currentIndex === 0 && firstPage()}
      {currentIndex === 1 && secondPage()}

      <div className="controlButtons">
        <button className="button" onClick={prev}>
          Prev
        </button>
        <button className="button" onClick={next}>
          {currentIndex === 1 ? "Register" : "Next"}
        </button>
      </div>

      {isLoading && <LoadingCircle />}
    </div>
  );
};

export default RegisterPage;
