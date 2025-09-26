import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import type { ILoginData, PropsType, ContextType } from "../services/interfaces";

export let AuthContext = createContext<ContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

export default function AuthContextProvider({ children }: PropsType) {
  const [loginData, setLoginData] = useState<ILoginData | null>(null);

  function SaveLogenData() {
    let EnToken = localStorage.getItem("token");
    console.log("Token from localStorage:", EnToken);

    if (EnToken) {
      const rawToken = EnToken.startsWith("Bearer ") ? EnToken.slice(7) : EnToken;
      try {
        const DeToken = jwtDecode<ILoginData>(rawToken);
        console.log("Decoded JWT:", DeToken);
        setLoginData(DeToken);
      } catch (err) {
        console.error("Error decoding token:", err);
        setLoginData(null);
      }
    }
  }

  function logOut() {
    localStorage.removeItem("token");
    setLoginData(null);
  }

  useEffect(() => {
    SaveLogenData();
  }, []);

  return (
    <AuthContext.Provider value={{ SaveLogenData, loginData, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
