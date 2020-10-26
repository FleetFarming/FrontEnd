import React, { createContext, useReducer } from "react";
import { reducers } from "./AppReducer.js";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn")
    ? localStorage.getItem("isLoggedIn")
    : false,
  username: localStorage.getItem("userName")
    ? localStorage.getItem("userName")
    : "",
  userId: localStorage.getItem("userId")
    ? localStorage.getItem("userId")
    : "",
  signUpData: {},
  profileData: {},
  isLoading: false,
  isError: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  const handleIsLoggedIn = (bol, userId) => {
    let isLoggedIn = Boolean(bol)
    dispatch({ type: "IS_LOGGED_IN", payload: {isLoggedIn, userId} });
  };

  const addProfileData = (data) => {
    dispatch({type: "GET_PROFILE", payload: data})
  }

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        isLoading: state.isLoading,
        isError: state.isError,
        signUpData: state.signUpData,
        userId: state.userId,
        username: state.username,
        profileData: state.profileData,
        handleIsLoggedIn,
        addProfileData,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

// let object = {
//   firstName: "first",
//   lastName: "last",
//   email: "email",
//   password: "password",
//   address: {
//     street: "somethingh ere",
//     zipCode: "",
//     state: "",
//     phone_no: "",
//   },
//   description: ""
// }
