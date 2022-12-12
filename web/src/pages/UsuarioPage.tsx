import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UsuarioPage() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    const token = localStorage.getItem("token");

    ev.preventDefault();

    const response = await fetch(`http://localhost:8080/Usuario`, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({ login, senha }),
    });

    const RespostaJSON = await response.json();

    if (response.status == 401) {
      alert(`Erro durante o seu cadastro: ${RespostaJSON}`);
      localStorage.removeItem("token");
      navigate("/login");
      return;
    } else {
      if (response.status == 400) {
        alert(`Não foi possivel cadastrar seu novo usuário: ${RespostaJSON}`);
        setLogin("");
        setSenha("");
        return;
      } else {
        setLogin("");
        setSenha("");
        alert(
          `\n Novo administrador Cadastrado: \n \uD83E\uDC82 Nome: ${login}`
        );
      }
    }
  }

  return (
    <main>
      <form onSubmit={onSubmit} id="form_usuario">
        <h1>Cadastre Usuário </h1>
        <p>Cadastre um novo usuário para ele fazer login!</p>
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
        <button type="submit">Cadastrar</button>
      </form>
    </main>
  );
}
