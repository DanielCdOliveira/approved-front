import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import { AuthContext } from "../../Context/Auth";
import logo from "../../Assets/logo.jpg";
import { MainAuth } from "../../Utils/Styles";

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
    <MainAuth>
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
          placeholder="senha"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <input
          disabled={disabled}
          type="text"
          name=""
          id="name-signup"
          placeholder="nome de usuário"
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
          <p>Voltar para login</p>
        </Link>
      </form>
    </MainAuth>
  );
}

export default Register;
