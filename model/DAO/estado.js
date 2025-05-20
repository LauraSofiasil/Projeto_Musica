/*********************************************************************************************************************************************************************************
 * Objetivo: Criar o CRUD de dados da tabela de Estado no Banco de dados
 * Data: 20/05/2025
 * Autor: Laura
 * Versão: 1.0
 * ********************************************************************************************************************************************************************************/

//import da biblioteca do prisma client para realizar as ações no Banco de dados
const {PrismaClient} = require("@prisma/client")

//Instancia da classe do prisma client(cria um objeto)
const prisma = new PrismaClient()



//Função para inserir um novo país
const insertEstado = async function(estado){

    //Mesmo que aconteça um bug de programação a API não sai do ar
    try {
        let sql = `insert into tbl_estado (estado)
                                values  ('${estado.estado}')` 
                            
      
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

//Função para atualizar um país existente
const updateEstado = async function(estado){
    try {
        
        let sql = `update tbl_estado set estado = '${estado.estado}'
                                    where id_estado = ${estado.id_estado}`

        let result = await prisma.$executeRawUnsafe(sql)  //usamos o execute, porque não vai retornar nenhum dado

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
    
}

//Função para excluir um país existente
const deleteEstado = async function(id_estado){
    try {
        //Script SQL
        let sql = `delete from tbl_estado where id_estado=${id_estado}`
        

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

//Função para retornar todos os paises do Banco de dados
const selectAllEstado = async function(){
    try {
        //Script SQL
        let sql = 'select * from tbl_estado order by id_estado desc'

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

//Função para buscar um país pelo id
const selectByIdEstado = async function(id_estado){
    try {
        //Script SQL
        let sql = `select * from tbl_estado where id_estado=${id_estado}`
        

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

//insertMusica()
//selectByIdMusica()
//deleteMusica(2)

module.exports = {
    insertEstado,
    updateEstado,
    deleteEstado,
    selectAllEstado,
    selectByIdEstado
}