/*********************************************************************************************************************************************************************************
 * Objetivo: Criar o CRUD de dados da tabela de tipo de artista no Banco de dados
 * Data: 22/04/2025
 * Autor: Laura
 * Versão: 1.0
 * ********************************************************************************************************************************************************************************/

const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

//Função para inserir uma nova música
const insertTipoArtista = async function(tipoArtista){
    try {
        
        let sql = `insert into tbl_tipo_artista (tipo) values('${tipoArtista.tipo}')` 

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false   

    } catch (error) {
        return false
    }
}

//Função para atualizar um gênero existente
const updateGenero = async function(genero){
    try {
        
        let sql = `update tbl_genero set tipo = '${genero.tipo}' where id_tipo_artista = ${genero.id}`

        let result = await prisma.$executeRawUnsafe(sql)  

        if(result)
            return true
        else
            return false

    } catch (error) {
        
    }
    
}

//Função para excluir um gênero existente
const deleteGenero = async function(id){
    try {
        
        let sql = `delete from tbl_genero where id_genero=${id}`
        
        let result = await prisma.$executeRawUnsafe(sql) 

        if(result)
            return true 
        else
            return false

    } catch (error) {
        return false
    }
}

//Função para retornar todas os gêneros do Banco de dados
const selectAllGenero = async function(){
    try {
        
        let sql = 'select * from tbl_genero order by id_genero desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false      
    }
}

//Função para buscar um gênero pelo id
const selectByIdGenero = async function(id){
    try {
        
        let sql = `select * from tbl_genero where id_genero=${id}`

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
    insertTipoArtista
}