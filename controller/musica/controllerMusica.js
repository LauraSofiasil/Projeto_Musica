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
const inserirMusica = async function(musica, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( musica.nome            == '' || musica.nome             == null || musica.nome           == undefined || musica.nome.length            > 100 || 
                musica.data_lancamento == '' || musica.data_lancamento == null || musica.data_lancamento == undefined || musica.data_lancamento.length > 10  || 
                musica.duracao         == '' || musica.duracao         == null || musica.duracao         == undefined || musica.duracao.length         > 8   ||
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
                    return message.ERROR_INTERNAL_SERVER_MODEL //status code 500
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE   //status code 415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER  //status code 500 
    }
}

//Função para atualizar uma música
const atualizarMusica = async function(id, musica, contentType){
    try {
        
        //Copiamos o início do código do inserirMusica
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if( musica.nome            == '' || musica.nome             == null || musica.nome            == undefined || musica.nome.length            > 100 || 
                    musica.data_lancamento == '' || musica.data_lancamento == null  || musica.data_lancamento == undefined || musica.data_lancamento.length > 10  || 
                    musica.duracao         == '' || musica.duracao         == null  || musica.duracao         == undefined || musica.duracao.length         > 8   ||
                    musica.link     == undefined || musica.link.length       > 300  ||                                     
                    musica.letra    == undefined ||                                                                        
                    id                     == '' || id                     == null  || id                     == undefined || isNaN(id)
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //status code 400

                }else{ //Copiamos só até aqu - até essa linha

                    //Verifica se o ID existe no Banco de Dados
                    let result = await musicaDAO.selectByIdMusica(id)

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            
                            //Update
                            musica.id = id //Adiciona o atributo do ID no JSON -> (musica) com os dados recebidos no corpo da requisição
                            let resultMusica = await musicaDAO.updateMusica(musica) 

                            if(resultMusica){
                                return message.SUCESS_UPDATE_ITEM //status code 200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //status code 500
                            }

                        }else{
                            return message.ERROR_NOT_FOUND //status code 404
                        }
                    }

                }
            }else{
                return message.ERROR_CONTENT_TYPE //status code 415
            }    

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //status code 500
    }
}

//Função para excluir uma música
const excluirMusica = async function(numero){
    try{
        let id = numero

        if(id == '' || id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS  //status code 400
        }else{
            
            //Antes de excluir, estamos verificando se existe esse id
            let resultMusica = await musicaDAO.selectByIdMusica(id)

            if(resultMusica != false || typeof(resultMusica) =='object'){
                
                if(resultMusica.length > 0){
                    //delete
                    let result = await musicaDAO.deleteMusica(id)

                    if(result)
                        return message.SUCESS_DELETE_ITEM  //status code 200
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL  //status code 500

                }else{
                    return message.ERROR_NOT_FOUND //status code 404
                }

            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL  //status code 500
            }

        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //status code 500
    }
}

//Função para retornar uma lista de músicas
const listarMusica = async function(){
    try {

        //Objet JSON
        let dadosMusica = {}

        //Chama a função para retornar as músicas do banco de dados
        let resultMusica = await musicaDAO.selectAllMusica()

        if(resultMusica != false){
            if(resultMusica.length > 0 || typeof(resultMusica) == 'object'){
                //Cria um json para colocar o array de músicas
                dadosMusica.status = true,
                dadosMusica.status_code = 200,
                dadosMusica.items = resultMusica.length,
                dadosMusica.musics = resultMusica
                
                return dadosMusica

            }else{
                return message.ERROR_NOT_FOUND //status code 404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //status code 500
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_MODEL //status code 500
    }
}

//Função para retornar uma música pelo ID
const buscarMusica = async function(numero){
    try{
        let id = numero

        //Objeto JSON
        let dadosMusica = {}

        if(id == '' || id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //status code 400
        }else{

            let resultMusica = await musicaDAO.selectByIdMusica(id)
                    
            if(resultMusica != false || typeof(resultMusica) == 'object'){
                if(resultMusica.length > 0){
                    //Cria um json para colocar o array de músicas
                    dadosMusica.status = true,
                    dadosMusica.status_code = 200,
                    dadosMusica.musics = resultMusica
                    
                    return dadosMusica

                }else{
                    return message.ERROR_NOT_FOUND //status code 404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //status code 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_MODEL //status code 500
    }
}

module.exports = {
    inserirMusica,   //Está tudo ok
    atualizarMusica, //Está tudo ok
    excluirMusica,   //Está tudo ok
    listarMusica,    //Está tudo ok
    buscarMusica     //Está tudo ok
}


