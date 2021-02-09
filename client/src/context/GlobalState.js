import React, { createContext, useReducer } from "react";
import { reducers } from "./AppReducer.js";
import axios from "axios";
import { API } from "../config/apiCalls.js";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn")
    ? localStorage.getItem("isLoggedIn")
    : false,
  username: localStorage.getItem("userName")
    ? localStorage.getItem("userName")
    : "",
  userId: localStorage.getItem("userId") ? localStorage.getItem("userId") : "",
  signUpData: {},
  profileData: {},
  initialMapData: [],
  currMapData: [],
  otherUserInfo: {},
  regAddress: { city: "", country: "", state: "", lat: "", lng: "" },
  isLoading: false,
  isError: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  const handleIsLoggedIn = (bol, userId) => {
    let isLoggedIn = Boolean(bol);
    dispatch({ type: "IS_LOGGED_IN", payload: { isLoggedIn, userId } });
  };

  const addProfileData = (data) => {
    dispatch({ type: "GET_PROFILE", payload: data });
  };

  const setRegAddress = (regAddress) => {
    console.log("regAddress inside setRe: ", regAddress);
    dispatch({ type: "SET_REG_ADDRESS", payload: { ...regAddress } });
  };

  const getMapData = () => {
    const { server, getMapData } = API;
    axios
      .get(`${server}${getMapData}`)
      .then((res) => {
        console.log("mapData from getMapData", res.data);
        dispatch({
          type: "GET_MAP_DATA",
          payload: res.data.map((d) => ({ ...d })),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const setCurMapData = (curMapData) => {
    dispatch({ type: "SET_CUR_MAP_DATA", payload: curMapData });
  };

  const setOhterUserInfo = (data) => {
    dispatch({ type: "VIEW_OTHER_USER", payload: data });
  };

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
        regAddress: state.regAddress,
        initialMapData: state.initialMapData,
        currMapData: state.currMapData,
        otherUserInfo: state.otherUserInfo,
        handleIsLoggedIn,
        addProfileData,
        setRegAddress,
        getMapData,
        setCurMapData,
        setOhterUserInfo,
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
