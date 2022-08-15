import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/Auth";

import { ThreeDots } from "react-loader-spinner";
import logo from "../../Assets/logo.jpg"
import { MainAuth,PageContainer } from "../../Utils/Styles";

export default function Login() {
  const { logIn } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) navigate("/home");
  }, []);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  function login(e) {
    setDisabled(true);
    e.preventDefault();
    logIn(data, setDisabled);
  }
  return (
    <PageContainer>
    <MainAuth>
      <section>
        <img src={logo} alt="" />
      </section>

      <form onSubmit={login}>
        <input
          type="email"
          name="email"
          id="email  "
          placeholder="e-mail"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="senha"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button disabled={disabled} type="submit">
          {disabled ? (
            <ThreeDots color="#FFF" height={30} width={100} />
          ) : (
            "Log In"
          )}
        </button>
        <Link to={"/signup"}>
          <p>Primeira vez? Crie a sua conta aqui!</p>
        </Link>
      </form>
    </MainAuth>
    </PageContainer>
  );
}

