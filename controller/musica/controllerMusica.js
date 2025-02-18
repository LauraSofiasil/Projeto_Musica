/*********************************************************************************************************************************************************************************
 * Objetivo: Controller responsável pela integração entre o APP e a Model (CRUD de Dados)
 *              Validações, tratamento de dados etc...
 * Data: 18/02/2025
 * Autor: Laura
 * Versão: 1.0  
 * ********************************************************************************************************************************************************************************/

//import do arquivo de menssagem e status code
const message = require('../../modulo/config.js')

//import do DAO para realizar o CRUD no Banco de dados
const musicaDAO = require('../../model/DAO/musica.js')

//Função para inserir uma nova música
const inserirMusica = async function(musica){

    if( musica.nome            == '' || musica.nome            == null || musica.nome            == undefined || musica.nome.length            > 100 || 
        musica.data_lancamento == '' || musica.data_lancamento == null || musica.data_lancamento == undefined || musica.data_lancamento.length > 10  || 
        musica.duracao         == '' || musica.duracao         == null || musica.duracao         == undefined || musica.duracao.length         > 5   ||
        musica.link     == undefined || musica.link.length       > 300 ||
        musica.letra    == undefined 
    )
    {
        return message.ERROR_REQUIRED_FIELDS //status code 400
    }else{
        //Encaminhando os dados da música para o DAO realizar o insert no Banco de dados
        let resultMusica = await musicaDAO.insertMusica(musica)

        if(resultMusica)
            return message.SUCESS_CREATED_ITEM //status code 201
        else{
            return message.ERROR_INTERNAL_SERVER //status code 500
        }
    }
}

//Função para atualizar uma música
const atualizarMusica = async function(){

}

//Função para excluir uma música
const excluirMusica = async function(){

}

//Função para retornar uma lista de músicas
const listarMusica = async function(){

}

//Função para retornar uma música pelo ID
const buscarMusica = async function(){

}



module.exports = {
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    listarMusica,
    buscarMusica
}


