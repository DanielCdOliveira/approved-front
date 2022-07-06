import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

import { AuthContext } from "../../Context/Auth";
import logo from "../../Assets/logo.jpg";

function Register() {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { URL } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  function newRegister(e) {
    setDisabled(true);
    e.preventDefault();
    if (data.email === "" || data.password === "" || data.name === "") {
      alert("Please complete all fields");
      setDisabled(false);
      return;
    }
    const promise = axios.post(URL + "/signup", data);
    promise.then((e) => {
      navigate("/");
    });
    promise.catch((e) => {
      setDisabled(false);
      if (e.response.status === 409) {
        alert("E-mail already registered!");
      }
      if (e.response.status === 422) {
        if (e.response.data.length >= 2)
          return alert("Invalid email and image");
        if (e.response.data[0].slice(1, 6) === "image")
          return alert("Invalid image link");
        alert("Please enter a valid email!");
      }
    });
  }

  return (
    <Main>
      <section>
        <img src={logo} alt="" />
      </section>

      <form onSubmit={newRegister}>
        <input
          disabled={disabled}
          type="email"
          name=""
          id="email-signup"
          placeholder="e-mail"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          disabled={disabled}
          type="password"
          name=""
          id="password-signup"
          placeholder="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <input
          disabled={disabled}
          type="text"
          name=""
          id="name-signup"
          placeholder="username"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <button disabled={disabled} type="submit">
          {disabled ? (
            <ThreeDots color="#FFF" height={30} width={100} />
          ) : (
            "Sign Up"
          )}
        </button>
        <Link to={"/"}>
          <p>Switch back to log in</p>
        </Link>
      </form>
    </Main>
  );
}
const Main = styled.main`
  display: flex;
  section {
    background-color: #151515;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 62vw;
    height: 100vh;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    z-index: 2;
    img{
        width: 80%;
    }
    h1 {
      font-family: "Passion One", cursive;
      font-size: 106px;
      color: #ffffff;
    }
    h2 {
      font-family: "Oswald", sans-serif;
      font-size: 43px;
      color: #ffffff;
    }
  }
  form {
    right: 0;
    top: 0;
    width: 38vw;
    height: 100vh;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
      width: 80%;
      max-width: 450px;
      height: 65px;
      margin-bottom: 13px;
      border-radius: 6px;
      border: none;
      padding: 12px 17px;
      font-size: 27px;
      font-family: "Oswald", sans-serif;
      font-weight: 700;
    }
    button {
      width: 80%;
      max-width: 450px;
      height: 65px;
      background-color: #1877f2;
      border-radius: 6px;
      border: none;
      outline-style: none;
      font-family: "Oswald", sans-serif;
      font-weight: 700;
      color: #ffffff;
      font-size: 27px;
      margin-bottom: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    p {
      font-family: "Lato", sans-serif;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      color: #ffffff;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  @media (max-width: 600px) {
    flex-direction: column;
    section {
      width: 100vw;
      padding-left: 0px;
      height: 175px;
      align-items: center;
      text-align: center;
      padding: 0 69px;
      box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
      img{
        width: auto;
        height: 100%;
    }
      h1 {
        font-size: 4.8em;
      }
      h2 {
        font-size: 1.4em;
      }
    }
    form {
      width: 100vw;
      height: calc(100vh - 175px);
      justify-content: flex-start;
      padding-top: 40px;
      input {
        height: 55px;
        font-size: 22px;
      }
      button {
        height: 55px;
        font-size: 22px;
      }
    }
  }
  @media (max-width: 300px) {
      section{img{
        width: 80vw;
        height: auto;}
      
    }
`;
export default Register;
