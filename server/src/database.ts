import {open} from "sqlite"
import {Database} from "sqlite3"

async function get_DatabaseConnection() {

    const data = await open({
        filename:"database.db",
        driver: Database
    })

    await data.exec(
        `Create table if not exists Usuario (
            ID     integer primary key autoincrement,
            LOGIN  text    not null    unique,
            SENHA  text    not null
        );
        
        Create table if not exists Produto(
            ID    integer primary key autoincrement,
            NOME  text    not null    unique,
            QUANT int     not null,
            SETOR text    not null
        );
    `)

    try {
        await data.run(`Insert into Usuario(login, senha) values ("Admin","1234")`)
        console.log("Usuário cadatrado com sucesso")
    } catch(e){
        console.log("🚫 - Usuario já cadastrado")
    }

    class Admin {
        static tokens: {[token:string]:{id:number}} = {}

        static get_Permissão(token: string){
            return Admin.tokens[token] ? true : false
        }

        static async get_Token(login: string, senha: string){
            const Dado_Select = await data?.all(`
                Select ID from USUARIO where LOGIN=:Login and SENHA=:Senha limit 1
            `, {
                ":Login": login,
                ":Senha": senha
            })

            if(Dado_Select?.length && Dado_Select.length > 0){
                const token = require('crypto').randomBytes(10).toString('hex')
                Admin.tokens[token] = { id: Dado_Select[0].id}
                return token;
                
            } else {
                return null
            }
        }

        static async RegistrarUsuario(login:string, senha:string){
            try{
                const Dado_Insert = await data?.run (`
                    Insert into Usuario(login, senha) values(:Login, :Senha) 
                `, {
                    ":Login": login,
                    ":Senha": senha
                })
                return Dado_Insert.lastID

            } catch(e){
                return null
            }
        }
    }

    class Produto extends Admin {

        static async RegistrarItens(Nome:string, Quant:number, Setor:string) {
            try{
                const Dado_Insert = await data?.run (`
                    Insert into Produto(nome, quant, setor) values(:Nome, :Quant, :Setor) 
                `, {
                    ":Nome": Nome,
                    ":Quant": Quant,
                    ":Setor": Setor
                })
                return Dado_Insert.lastID

            } catch(e){
                return null
            }
        }
    }
    return {data, Admin, Produto}
}

export{get_DatabaseConnection}