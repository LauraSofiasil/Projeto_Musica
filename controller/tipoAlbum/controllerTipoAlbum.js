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
const album = require('../../model/DAO/tipoAlbum.js')

//Função para inserir uma nova música
const inserirTipoAlbum = async function(tipoAlbum, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( tipoAlbum.tipo == '' || tipoAlbum.tipo == null || tipoAlbum.tipo == undefined || tipoAlbum.tipo.length > 100  
            )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else{
                //Encaminhando os dados da música para o DAO realizar o insert no Banco de dados
                let resultTipoAlbum = await album.insertTipoAlbum(tipoAlbum)

                if(resultTipoAlbum)
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
const atualizarTipoAlbum = async function(id, tipoAlbum, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if( tipoAlbum.tipo == '' || tipoAlbum.tipo == null || tipoAlbum.tipo == undefined || tipoAlbum.tipo.length > 100 ||                                                                        
                    id == '' || id == null  || id == undefined || isNaN(id)
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //status code 400

                }else{

                    //Verifica se o ID existe no Banco de Dados
                    let result = await album.selectByIdTipoAlbum(id)

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            
                            //Update
                            tipoAlbum.id_tipo_album = id 
                            let resultTipoAlbum = await album.updateTipoAlbum(id)

                            if(resultTipoAlbum){
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
const excluirTipoAlbum = async function(id){
    try{
        if(id == '' || id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS  //status code 400
        }else{
            
            //Antes de excluir, estamos verificando se existe esse id
            let resultTipoAlbum = await album.selectByIdTipoAlbum(id)

            if(resultTipoAlbum != false || typeof(resultTipoAlbum) =='object'){
                
                if(resultTipoAlbum.length > 0){
                    //delete
                    let result = await album.deleteTipoAlbum(id)

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
const listarTipoAlbum = async function(){
    try {

        //Objet JSON
        let dadosTipoAlbum = {}

        //Chama a função para retornar as músicas do banco de dados
        let resultTipoAlbum = await album.selectAllTipoAlbum()

        if(resultTipoAlbum != false){
            if(resultTipoAlbum.length > 0 || typeof(resultTipoAlbum) == 'object'){
                //Cria um json para colocar o array de músicas
                dadosTipoAlbum.status = true,
                dadosTipoAlbum.status_code = 200,
                dadosTipoAlbum.items = resultTipoAlbum.length,
                dadosTipoAlbum.tipos = resultTipoAlbum
                
                return dadosTipoAlbum

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
const buscarTipoAlbum = async function(id){
    try{
        //Objeto JSON
        let dadosTipoAlbum = {}

        if(id == '' || id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //status code 400
        }else{

            let resultTipoAlbum = await album.selectByIdTipoAlbum(id)
                    
            if(resultTipoAlbum != false || typeof(resultTipoAlbum) == 'object'){
                if(resultTipoAlbum.length > 0){
                    //Cria um json para colocar o array de músicas
                    dadosTipoAlbum.status = true,
                    dadosTipoAlbum.status_code = 200,
                    dadosTipoAlbum.tipos = resultTipoAlbum
                    
                    return dadosTipoAlbum

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
    inserirTipoAlbum, //Ok
    atualizarTipoAlbum, //Não ok
    excluirTipoAlbum, //Ok
    listarTipoAlbum, //Ok
    buscarTipoAlbum  //Ok
}