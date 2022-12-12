import { Link } from "react-router-dom";

export default function EscolhaPage() {
  return (
    <main>
      <h1>Cadastre</h1>
      <div>
        <Link to="/login">Logar</Link>
        <Link to="/usuario">Cadastrar</Link>
        <Link to="/cadastro">Itens</Link>
      </div>
    </main>
  );
}
