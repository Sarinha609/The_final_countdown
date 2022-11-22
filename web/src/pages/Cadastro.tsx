export default function Cadastro(){
    return (
        <main>
        <form id="form_cadastro">
            <h1>Cadastro de itens</h1>
            <p>Registre os novos itens que acabaram de chegar !</p>
            <div>
                <label htmlFor="nome">Nome</label>
                <input type="text" name="nome" id="nome"/>
            </div>
            <div>
                <label htmlFor="quantidade">Quantidade</label>
                <input type="number" name="quantidade" id="quantidade"/>
            </div>
            <div>
                <label htmlFor="input_setor">Setor</label>
                <input type="list" name="input_setor" id="input_setor" list="Setor"/>
            </div>

            <datalist id="Setor">
                <option>Alimentos</option>
                <option>Eletrônicos</option>
                <option>Brinquedos</option>
                <option>Decoração</option>
                <option>Móveis</option>
            </datalist>

            <button>Cadastrar</button>
        </form>
    </main>
    )
}