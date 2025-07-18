import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../Context/AuthContext";

export default function ProtetedRoutes({ children }) {
  let { token } = useContext(authContext);

  return <div>{token ? children : <Navigate to={"/login"} />}</div>;
}
