import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const URL = "http://localhost:5000";

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  function logIn(data, setDisabled) {
    if(data.email === "" || data.password === ""){
      alert("Please complete all fields")
      setDisabled(false);
      return
    }
    const promise = axios.post(URL+"/signin", data);
    promise.then((response) => {
      setDisabled(false);
      setUser({
        ...response.data,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/home");
    });
    promise.catch((e) => {
      setDisabled(false);
      if(e.response.status === 401){
        alert("Incompatible email and password!")
      }
      if(e.response.status === 422){
        alert("Please enter a valid email!")
      }
    });
  }
  function invalidToken(){
    localStorage.removeItem("user")
    if(window.confirm("Sessão expirada. Deseja ir para a tela de login?"))navigate("/")
  }


  return (
    <AuthContext.Provider
      value={{
        user,
        logIn,
        URL,
        invalidToken,       
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;