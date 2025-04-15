/*********************************************************************************************************************************************************************************
 * Objetivo: Criar o CRUD de dados da tabela de gravadora no Banco de dados
 * Data: 10/04/2025
 * Autor: Laura
 * Versão: 1.0
 * ********************************************************************************************************************************************************************************/

const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

//Iserir uma nova gravadora
const insertGravadora = async function(gravadora){

    try {
        let sql = `insert into tbl_gravadora ( nome,
                                               telefone,
                                               email)
                                values         ('${gravadora.nome}',
                                                '${gravadora.telefone}',
                                                '${gravadora.email}')`
        //Executa o script SQL no Banco de dados e aguarda o resultado (true e  false)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Atualizar uma gravadora existente
const updateGravadora = async function(gravadora){
        try {
            
            let sql = `update tbl_gravadora set nome     = '${gravadora.nome}',
                                                telefone = '${gravadora.telefone}',
                                                email    = '${gravadora.email}'
                                            where id_gravadora = ${gravadora.id}`

            let result = await prisma.$executeRawUnsafe(sql) //Apenas executa

            if(result)
                return true
            else
                return false

        } catch (error) {
            return false
        }
}

//Excluir uma gravadora
const deleteGravadora = async function(id){
    try {
        
        let sql = `delete from tbl_gravadora where id_gravadora=${id}`

        let result = await prisma.$executeRawUnsafe(sql)  //não volta dados, apenas executa

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Retornar todas as gravadoras do Banco de Dados
const selectAllGravadora = async function(){
    try {
        
        let sql = 'select * from tbl_gravadora'

        let result = await prisma.$queryRawUnsafe(sql)  //volta os dados do banco

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retornar uma gravadora pelo id
const selectByIdGravadora = async function(id){
    
    try {

        let sql = `select * from tbl_gravadora where id_gravadora =${id}`

        let resutado = await prisma.$queryRawUnsafe(sql) //O query volta os dados

        if(resutado)
            return resutado
        else
            return false

    } catch (error) {
        return false
    }
}

//selectByIdGravadora(2)

module.exports = {
    insertGravadora,
    updateGravadora,
    deleteGravadora,
    selectAllGravadora,
    selectByIdGravadora
}