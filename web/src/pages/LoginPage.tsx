import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const response = await fetch("http://localhost:8080/Login", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({ login, senha }),
    });
    const RespostaJSON = await response.json();

    if (response.status == 401) {
      alert(`Houve um problema: ${RespostaJSON}`);
      localStorage.removeItem("token");
      return;
    } else {
      localStorage.setItem("token", RespostaJSON.token);
      navigate("/escolha");
    }
  }

  return (
    <main>
      <form onSubmit={onSubmit} id="form_login">
        <h1>Login</h1>
        <p>Faça login informando os seus dados !</p>
        <div>
          <label htmlFor="login">Login</label>
          <input
            value={login}
            onChange={(ev) => setLogin(ev.currentTarget.value)}
            type="text"
            name="login"
            id="login"
          />
        </div>
        <div>
          <label htmlFor="senha">Senha</label>
          <input
            value={senha}
            onChange={(ev) => setSenha(ev.currentTarget.value)}
            type="password"
            name="senha"
            id="senha"
          />
        </div>
        <button type="submit">Acessar</button>
      </form>
    </main>
  );
}
