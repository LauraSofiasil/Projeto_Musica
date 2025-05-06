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
const updateTipoArtista = async function(tipoArtista){
    try {
            
        let sql = `update tbl_tipo_artista set tipo = '${tipoArtista.tipo}'
                                        where id_tipo_artista = ${tipoArtista.id}`

        let result = await prisma.$executeRawUnsafe(sql) //Apenas executa

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Função para excluir um gênero existente
const deleteTipoArtista = async function(id){
    try {
        
        let sql = `delete from tbl_tipo_artista where id_tipo_artista=${id}`
        
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
const selectAllTipoArtista = async function(){
    try {
        
        let sql = 'select * from tbl_tipo_artista order by id_tipo_artista desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false      
    }
}

//Função para buscar um tipo de artista pelo id
const selectByIdTipoArtista = async function(id){
    try {
        
        let sql = `select * from tbl_tipo_artista where id_tipo_artista=${id}`

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
    insertTipoArtista, //Ok
    selectAllTipoArtista, //Ok
    selectByIdTipoArtista, //Ok
    deleteTipoArtista, //Ok
    updateTipoArtista //Ok

}