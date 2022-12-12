import { get_DatabaseConnection } from "./Database";
import  Express from "express";
import bodyParser from "body-parser";
const cors = require("cors");

async function Iniciar() {
    const { data, Admin, Produto} = await get_DatabaseConnection();
    const Server = Express();

    Server.use(bodyParser.json())
    Server.use(cors())

    Server.use("/secure/:token", (req, res, next) => {
        if(!Admin.get_Permissão(req.params.token)){
            res.statusCode = 401
            res.send("É necessário um token! \n para isso realize o login de maneira correta")
            return
        }
        next()
    })

    Server.post("/secure/:token/CadastroIten", async (req, res) => {
        const {produto, quantidade, setor} = req.body;
        const id_ProdutoNovo  = await Produto.RegistrarItens(produto, quantidade, setor) 
    
        if (!id_ProdutoNovo) {
            res.statusCode = 400
            res.json("Ele já se encontra na nossa base de dados")
            return
        } else {
            res.json({ id_ProdutoNovo})
        }
    })

    Server.post("/secure/:token/Usuario", async (req, res) => {
        const {login, senha} = req.body;
        const id_Usuario = await Admin.RegistrarUsuario(login, senha)

        if(!id_Usuario) {
            res.statusCode = 400
            res.json("Colaborar já cadastrado na base de dados")
            return
        } else {
            res.json({id_Usuario})
        }
    })

    Server.post("/Login", async (req, res) => {
        const {login, senha} = req.body
        const token = await Admin.get_Token(login, senha)

        if(token){
            res.statusCode = 200
            res.json({token})
            return

        } else {
            res.statusCode = 401
            res.json("Os seus dados informados não conferem")
        }
    })

    Server.listen(8080, () => console.log("⚡ - Servidor HTTP rodando"))
}

Iniciar();