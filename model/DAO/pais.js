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



//Função para inserir uma nova música
const insertPais = async function(pais){

    //Mesmo que aconteça um bug de programação a API não sai do ar
    try {
        let sql = `insert into tbl_pais ( pais)
                                values  ('${pais.pais}')` 
                            
      
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
const updatePais = async function(pais){
    try {
        
        let sql = `update tbl_pais set pais = '${pais.pais}'
                                    where id_pais = ${pais.id}`

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
const deletePais = async function(id){
    try {
        //Script SQL
        let sql = `delete from tbl_pais where id_pais=${id}`
        

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
const selectAllPais = async function(){
    try {
        //Script SQL
        let sql = 'select * from tbl_pais order by id_pais desc'

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
const selectByIdPais = async function(id){
    try {
        //Script SQL
        let sql = `select * from tbl_pais where id_pais=${id}`
        

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
    insertPais,
    updatePais,
    deletePais,
    selectAllPais,
    selectByIdPais
}