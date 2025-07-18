import React, { useContext } from "react";
import { authContext } from "../../Context/AuthContext";

export default function LoginProtected({ children }) {
  let { token } = useContext(authContext);

  return <div>{!token ? children : <Navigate to={"/"} />}</div>;
}
