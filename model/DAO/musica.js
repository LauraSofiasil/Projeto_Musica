/*********************************************************************************************************************************************************************************
 * Objetivo: Criar o CRUD de dados da tabela de música no Banco de dados
 * Data: 11/02/2025
 * Autor: Laura
 * Versão: 1.0
 * ********************************************************************************************************************************************************************************/


//iport da biblioteca do prisma client para realizar as ações no Banco de dados
const {PrismaClient} = require("@prisma/client")

//async = função assíncrona

//Função para inserir uma nova música
const insertMusica = async function(musica){
    
    //Instancia da classe do prisma client(cria um objeto)
    const prisma = new PrismaClient()
    
    let sql = `insert into tbl_musica ( nome, 
                                        duracao, 
                                        data_lancamento, 
                                        letra, 
                                        link)
                            values      ( ${musica.nome},
                                          ${musica.duracao},
                                          ${musica.data_lancamento},
                                          ${musica.letra},
                                          ${musica.link}
                                          )` 

    /* AWAIT:   
    * await = aguarde (ele vai executar o script e vai esperar o banco dar uma devolutiva)
    * O await só funciona se a função for assíncrona - tiver o async   */

    //Executa o script SQL no Banco de dados e aguarda o resultado (true e  false)
    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false

}

//Função para atualizar uma música existente
const updateMusica = async function(){

}

//Função para excluir uma música existente
const deleteMusica = async function(){

}

//Função para retornar todas as músicas do Banco de dados
const selectAllMusica = async function(){

}

//Função para buscar uma música pelo id
const selectByIdMusica = async function(){

}


insertMusica()

module.exports = {
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByIdMusica
}