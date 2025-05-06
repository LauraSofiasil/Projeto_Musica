/*********************************************************************************************************************************************************************************
 * Objetivo: Controller responsável pela integração entre o APP e a Model (CRUD de Dados)
 *              Validações, tratamento de dados etc...
 * Data: 22/04/2025
 * Autor: Laura
 * Versão: 1.0  
 * ********************************************************************************************************************************************************************************/

const message = require('../../modulo/config.js')

const tipoArtistaDAO = require('../../model/DAO/tipoArtista.js')

//Função para inserir um novo gênero
const inserirTipoArtista = async function(tipoArtista, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json'){
            
            if(tipoArtista.tipo == '' || tipoArtista.tipo == null || tipoArtista.tipo == undefined || tipoArtista.tipo.length > 100){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{

                let resultTipoArtista = await tipoArtistaDAO.insertTipoArtista(tipoArtista)

                if(resultTipoArtista){
                    return message.SUCESS_CREATED_ITEM //201
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para atualizar um gênero
const atualizarTipoArtista = async function(id, tipoArtista, contentType){
 try {
        
        //Copiamos o início do código do inserirMusica
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if( tipoArtista.tipo            == '' || tipoArtista.tipo             == null || tipoArtista.tipo            == undefined || tipoArtista.tipo.length            > 100 ||                                                                        
                    id                     == '' || id                     == null  || id                     == undefined || isNaN(id)
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //status code 400

                }else{ //Copiamos só até aqu - até essa linha

                    //Verifica se o ID existe no Banco de Dados
                    let result = await tipoArtistaDAO.selectByIdTipoArtista(id)

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            
                            //Update
                            tipoArtista.id = id //Adiciona o atributo do ID no JSON -> (musica) com os dados recebidos no corpo da requisição
                            let resultTipoArtista = await tipoArtistaDAO.updateTipoArtista(id)

                            if(resultTipoArtista){
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

//Função para excluir um gênero
const excluirTipoArtista = async function(id){
    try{
            if(id == '' || id == null || id == undefined || isNaN(id)){
                return message.ERROR_REQUIRED_FIELDS  //status code 400
            }else{
                    
                    //Antes de excluir, estamos verificando se existe esse id
                let resultTipoArtista = await tipoArtistaDAO.selectByIdTipoArtista(id)
        
                if(resultTipoArtista != false || typeof(resultTipoArtista) =='object'){
                        
                    if(resultTipoArtista.length > 0){
                            
                        let result = await tipoArtistaDAO.deleteTipoArtista(id)
        
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

//Função para retornar uma lista de gêneros
const listarTipoArtista = async function(){
    try {
    
            let dadosTipoArtista = {}
    
            let resultTipoArtista = await tipoArtistaDAO.selectAllTipoArtista()
    
            if(resultTipoArtista != false){
                if(resultTipoArtista.length > 0 || typeof(resultTipoArtista) == 'object'){
                    
                    dadosTipoArtista.status = true,
                    dadosTipoArtista.status_code = 200,
                    dadosTipoArtista.items = resultTipoArtista.length,
                    dadosTipoArtista.artista = resultTipoArtista
    
                    return dadosTipoArtista
    
                }else{
                    return message.ERROR_NOT_FOUND
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
            
        } catch (error) {
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
}

//Função para retornar um gênero pelo ID
const buscarTipoArtista = async function(id){
    try {
            
            let dadosTipoArtista = {}
    
            if(id == '' || id == null || id == undefined || isNaN(id)){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
    
                let resultTipoArtista = await tipoArtistaDAO.selectByIdTipoArtista(id)
    
                if(resultTipoArtista != false || typeof(resultTipoArtista) == 'object'){
                    if(resultTipoArtista.length >0){
    
                        dadosTipoArtista.status = true,
                        dadosTipoArtista.status_code = 200,
                        dadosTipoArtista.genero = resultTipoArtista
    
                        return dadosTipoArtista
                    }else{
                        return message.ERROR_NOT_FOUND //404
                    }
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        } catch (error) {
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
}

module.exports = {
    inserirTipoArtista,  //Ok
    atualizarTipoArtista, //Ok
    excluirTipoArtista, //Ok
    listarTipoArtista, //Ok
    buscarTipoArtista //Ok
}