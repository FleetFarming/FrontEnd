import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState.js";

export const AuthRoute = (props) => {
  const { isLoggedIn, type } = useContext(GlobalContext);
  console.log("inside AuthRoute: ", { ...props }, isLoggedIn);
  if (type === "guest" && isLoggedIn) return <Redirect to={"/home"} />;
  else if (type === "private" && !isLoggedIn) return <Redirect to={"/"} />;
  return <Route {...props} />;
};
