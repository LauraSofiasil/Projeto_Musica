/*********************************************************************************************************************************************************************************
 * Objetivo: Criar o CRUD de dados da tabela de usuário no Banco de dados
 * Data: 15/04/2025
 * Autor: Laura
 * Versão: 1.0
 * ********************************************************************************************************************************************************************************/

const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

const insertUsuario = async function(usuario){
    try {
        let sql = `insert into tbl_usuario ( nome, 
                                            data_nascimento, 
                                            email,
                                            senha)
                                values      ('${usuario.nome}',
                                             '${usuario.data_nascimento}',
                                             '${usuario.email}',
                                             '${usuario.senha}')` 
                            
        //Executa o script SQL no Banco de dados e aguarda o resultado (true e  false)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false   //Bug no banco de dados

    } catch (error) {
        return false      //Bug de programação
    }
}

const updateUsuario = async function(){

}

const deleteUsuario = async function(){

}

const selectAllUsuario = async function(){

}

const selectByIdUsuario = async function(){

}

module.exports = {
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}