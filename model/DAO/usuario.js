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
        let sql = `insert into tbl_usuario (nome, 
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

const updateUsuario = async function(usuario){

    try {
        
        let sql = `update tbl_usuario set nome       = '${usuario.nome}',
                                          data_nascimento = '${usuario.data_nascimento}',
                                          email           = '${usuario.email}',
                                          senha           = '${usuario.senha}'
                                        where id_usuario = ${usuario.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteUsuario = async function(id){

    try {
        
        let sql = `delete from tbl_usuario where id_usuario=${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else 
            return false

    } catch (error) {
        return false
    }
}

//Função para retornar todos os usuários
const selectAllUsuario = async function(){
    try {
        //Script SQL
        let sql = 'select * from tbl_usuario order by id_usuario desc'

        //Encaminha o script SQL para o banco de dados
        let result = await prisma.$queryRawUnsafe(sql)   //O query volta os dados

        if(result)
            return result  //Retorna os dados do banco
        else
            return false

    } catch (error) {
        return false
    }
}

const selectByIdUsuario = async function(id){

    try {
        
        let sql = `select * from tbl_usuario where id_usuario=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertUsuario, //OK
    updateUsuario,  //OK
    deleteUsuario,  //OK
    selectAllUsuario,  //OK
    selectByIdUsuario  //OK
}