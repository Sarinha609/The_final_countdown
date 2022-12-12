import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroPage() {
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [setor, setSetor] = useState("");

  const navigate = useNavigate();

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8080/secure/${token}/CadastroIten`,
      {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({ produto, quantidade, setor }),
      }
    );

    const RespostaJSON = await response.json();

    if (response.status == 401) {
      alert(`Erro durante o seu cadastro: ${RespostaJSON}`);
      localStorage.removeItem("token");
      navigate("/login");
      return;
    } else {
      if (response.status == 400) {
        alert(`Não foi possivel cadastrar seu novo item: ${RespostaJSON}`);
        setProduto("");
        setQuantidade("");
        setSetor("");
        return;
      } else {
        setProduto("");
        setQuantidade("");
        setSetor("");
        alert(
          `\n Seu novo item está cadastrado com sucesso: \n \uD83E\uDC82 Nome: ${produto}`
        );
      }
    }
  }

  return (
    <main>
      <form onSubmit={onSubmit} id="form_cadastro">
        <h1>Cadastro de itens</h1>
        <p>Registre as novas plantas que acabaram de chegar!</p>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            value={produto}
            onChange={(ev) => setProduto(ev.currentTarget.value)}
            type="text"
            name="nome"
            id="nome"
          />
        </div>
        <div>
          <label htmlFor="quantidade">Quantidade</label>
          <input
            value={quantidade}
            onChange={(ev) => setQuantidade(ev.currentTarget.value)}
            type="number"
            name="quantidade"
            id="quantidade"
          />
        </div>
        <div>
          <label htmlFor="input_setor">Setor</label>
          <input
            value={setor}
            onChange={(ev) => setSetor(ev.currentTarget.value)}
            type="list"
            name="input_setor"
            id="input_setor"
            list="Setor"
          />
        </div>

        <datalist id="Setor">
          <option>Flores</option>
          <option>Árvores</option>
          <option>Bonsai</option>
          <option>Suculentas</option>
          <option>Árvores frutíferas</option>
        </datalist>

        <button type="submit">Cadastrar</button>
      </form>
    </main>
  );
}
