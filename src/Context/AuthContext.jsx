import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import for Vite + ESM

export let authContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem("userToken");
    return storedToken ? jwtDecode(storedToken) : null;
  });

  async function verifyToken() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      localStorage.setItem("userId", data.decoded.id);
    } catch (err) {
      console.log(err);
      // toast.error("Session expired, please login again.");
      setUser(null);
      setToken(null);
      localStorage.removeItem("userId");
      localStorage.removeItem("userToken");
    }
  }

  useEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    if (token) {
      setUser(jwtDecode(token));
    }
  }, [token]);

  return (
    <authContext.Provider
      value={{ token, setToken, user, setUser, verifyToken }}
    >
      {children}
    </authContext.Provider>
  );
}
