/*********************************************************************************************************************************************************************************
 * Objetivo: Criar o CRUD de dados da tabela de música no Banco de dados
 * Data: 06/05/2025
 * Autor: Laura
 * Versão: 1.0
 * ********************************************************************************************************************************************************************************/

//import da biblioteca do prisma client para realizar as ações no Banco de dados
const {PrismaClient} = require("@prisma/client")

//Instancia da classe do prisma client(cria um objeto)
const prisma = new PrismaClient()

//async = função assíncrona

//Função para inserir uma nova música
const insertTipoAlbum = async function(tipoAlbum){

    //Mesmo que aconteça um bug de programação a API não sai do ar
    try {
        let sql = `insert into  tbl_tipo_album (tipo)
                                    values      ('${tipoAlbum.tipo}')` 
                            
        /* AWAIT:   
        * await = aguarde (ele vai executar o script e vai esperar o banco dar uma devolutiva)
        * O await só funciona se a função for assíncrona - tiver o async   */

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

//Função para atualizar uma música existente
const updateTipoAlbum = async function(tipoAlbum){
    try {
        
        let sql = `update tbl_tipo_album set tipo = '${tipoAlbum.tipo}'
                                    where id_tipo_album = ${tipoAlbum.id_tipo_album}`

        let result = await prisma.$executeRawUnsafe(sql)  //usamos o execute, porque não vai retornar nenhum dado

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
    
}

//Função para excluir uma música existente
const deleteTipoAlbum = async function(id){
    try {
        //Script SQL
        let sql = `delete from tbl_tipo_album where id_tipo_album=${id}`
        

        //Encaminha o script SQL para o banco de dados
        let result = await prisma.$executeRawUnsafe(sql)  //O delete não volta dados, então tem que ser o execute

        if(result)
            return true  //Não retorna dados, só um true para dizer que deu certo
        else
            return false

    } catch (error) {
        return false
    }
}

//Função para retornar todas as músicas do Banco de dados
const selectAllTipoAlbum = async function(){
    try {
        //Script SQL
        let sql = 'select * from tbl_tipo_album order by id_tipo_album desc'

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

//Função para buscar uma música pelo id
const selectByIdTipoAlbum = async function(id){
    try {
        //Script SQL
        let sql = `select * from tbl_tipo_album where id_tipo_album=${id}`
        

        //Encaminha o script SQL para o banco de dados
        let result = await prisma.$queryRawUnsafe(sql)    //O query volta os dados

        if(result)
            return result  //Retorna os dados do banco
        else
            return false

    } catch (error) {
        return false
    }
}


module.exports = {
    insertTipoAlbum,
    updateTipoAlbum,
    deleteTipoAlbum,
    selectAllTipoAlbum,
    selectByIdTipoAlbum
}