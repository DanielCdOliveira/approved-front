import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const URL = "https://localhost:5000";

  const [user, setUser] = useState({});
  const [hashtags, setHashtags] = useState()
  const [ trendingUpdate, setTrendingUpdate] = useState(false)
  const [ hashtagsUpdated, setHashtagsUpdated ] = useState(false)

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
      navigate("/timeline");
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

  const getTrending = () => {
    axios.get(URL + "/hashtag")
    .then((answer) => {setHashtags(answer.data)})
    .catch((e) => window.confirm(e.response.data));
  }

  const deleteHashtag = (id, config) => {
    axios.delete(URL + `/delete/hashtag/${id}`, config)
    .then(() => {setTrendingUpdate(!trendingUpdate)})
    .catch((e) => window.confirm(e.response.data));
  }

  const updateHashtags = (obj, config) => {
    axios.post(URL + `/update/hashtag`, obj, config)
    .then(() => setHashtagsUpdated(true))
    .catch((e) => window.confirm(e.response.data))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        logIn,
        URL,
        hashtags,
        getTrending,
        invalidToken,
        deleteHashtag,
        trendingUpdate,
        setTrendingUpdate,
        updateHashtags,
        hashtagsUpdated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;