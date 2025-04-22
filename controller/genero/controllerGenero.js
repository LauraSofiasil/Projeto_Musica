/*********************************************************************************************************************************************************************************
 * Objetivo: Controller responsável pela integração entre o APP e a Model (CRUD de Dados)
 *              Validações, tratamento de dados etc...
 * Data: 22/04/2025
 * Autor: Laura
 * Versão: 1.0  
 * ********************************************************************************************************************************************************************************/

const message = require('../../modulo/config.js')

const generoDAO = require('../../model/DAO/genero.js')

//Função para inserir um novo gênero
const inserirGenero = async function(genero, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json'){
            
            if(genero.tipo == '' || genero.tipo == null || genero.tipo == undefined || genero.tipo.length > 100){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{

                let resultGenero = await generoDAO.insertGenero(genero)

                if(resultGenero){
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
const atualizarGenero = async function(id, genero, contentType){

    try {
        
        if(String(contentType).toLowerCase() == 'application/json'){
            if(genero.tipo == '' || genero.tipo == null || genero.tipo == undefined || genero.tipo.length > 100 ||
                id == '' || id == null || id == undefined || isNaN(id)
            ){
                return message.ERROR_REQUIRED_FIELDS //400
            
            }else{
                let result = await generoDAO.selectByIdGenero(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){

                        genero.id_genero = id

                        let resultGenero = await generoDAO.updateGenero(id)

                        if(resultGenero){
                            return message.SUCESS_UPDATE_ITEM //200
                        }else{
                            return message.ERROR_INTERNAL_SERVER_MODEL
                        }

                    }else{
                        return message.ERROR_NOT_FOUND //404
                    }
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Função para excluir um gênero
const excluirGenero = async function(id){
    try{
        if(id == '' || id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS  //status code 400
        }else{
                
                //Antes de excluir, estamos verificando se existe esse id
            let resultGenero = await generoDAO.selectByIdGenero(id)
    
            if(resultGenero != false || typeof(resultGenero) =='object'){
                    
                if(resultGenero.length > 0){
                        
                    let result = await generoDAO.deleteGenero(id)
    
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
const listarGenero = async function(){
    try {

        let dadosGenero = {}

        let resultGenero = await generoDAO.selectAllGenero()

        if(resultGenero != false){
            if(resultGenero.length > 0 || typeof(resultGenero) == 'object'){
                
                dadosGenero.status = true,
                dadosGenero.status_code = 200,
                dadosGenero.items = resultGenero.length,
                dadosGenero.genro = resultGenero

                return dadosGenero

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
const buscarGenero = async function(id){
    try {
        
        let dadosGenero = {}

        if(id == '' || id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            let resultGenero = await generoDAO.selectByIdGenero(id)

            if(resultGenero != false || typeof(resultGenero) == 'object'){
                if(resultGenero.length >0){

                    dadosGenero.status = true,
                    dadosGenero.status_code = 200,
                    dadosGenero.genero = resultGenero

                    return dadosGenero
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
    inserirGenero,   //OK
    atualizarGenero,
    excluirGenero,
    listarGenero, //OK
    buscarGenero //OK
}


