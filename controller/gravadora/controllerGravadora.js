/*********************************************************************************************************************************************************************************
 * Objetivo: Controller responsável pela integração entre o APP e a Model (CRUD de Dados)
 *              Validações, tratamento de dados etc...
 * Data: 10/04/2025
 * Autor: Laura
 * Versão: 1.0  
 * ********************************************************************************************************************************************************************************/

const message = require('../../modulo/config.js')

const gravadoraDAO = require('../../model/DAO/gravadora.js')

//Função para inserir uma nova gravadora
const inserirGravadora = async function(gravadora, contentType){
    try {
            if(String(contentType).toLowerCase() == 'application/json')
            {
                if( gravadora.nome     == '' || gravadora.nome     == null || gravadora.nome     == undefined || gravadora.nome     > 100 ||
                    gravadora.telefone == '' || gravadora.telefone == null || gravadora.telefone == undefined || gravadora.telefone > 20  ||
                    gravadora.email    == '' || gravadora.email    == null || gravadora.email    == undefined || gravadora.email    > 100
                ){
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    let resultGravadora = await gravadoraDAO.insertGravadora(gravadora)

                    if(resultGravadora)
                        return message.SUCESS_CREATED_ITEM //201
                    else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500 na model
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 na controler
    }
}

const atualizarGravadora = async function(id, gravadora, contentType){

    try {
        
        if(String(contentType).toLowerCase() == 'application/json'){
            
            if( gravadora.nome     == '' || gravadora.nome     == null || gravadora.nome     == undefined || gravadora.nome.length > 100 ||
                gravadora.telefone == '' || gravadora.telefone == null || gravadora.telefone == undefined || gravadora.telefone.length > 20 ||
                gravadora.email    == '' || gravadora.email    == null || gravadora.email    == undefined || gravadora.email.length > 100 ||
                id                 == '' || id                 == null || id                 == undefined || isNaN(id)
            ){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                
                //Verifica se o ID existe no Banco de Dados
                let result = await gravadoraDAO.selectByIdGravadora(id)

                if(result != false || typeof(result) == 'object'){

                    //Update
                    if(result.length > 0){

                        gravadora.id = id //adiciona o atributo do id no json
                        let resultGravadora = await gravadoraDAO.updateGravadora(gravadora)

                        if(resultGravadora){
                            return message.SUCESS_UPDATE_ITEM //200
                        }else{
                            return message.ERROR_INTERNAL_SERVER_MODEL //500
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
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirGravadora = async function(id){

    try {
        
        if(id == '' || id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            
            //Busca primeiro o id para ver se existe
            let resultGravadora = await gravadoraDAO.selectByIdGravadora(id)

            if(resultGravadora != false || typeof(resultGravadora) == 'object'){
                
                if(resultGravadora.length > 0){
                    let resultado = await gravadoraDAO.deleteGravadora(id)

                    if(resultado)
                        return message.SUCESS_DELETE_ITEM //200
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500

                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para listar todas as gravadoras
const listarGravadora = async function(){
    try {
        
        let dadosGravadora = {}

        let resultGravadora = await gravadoraDAO.selectAllGravadora()

        if(resultGravadora != false){

            //Se resultGravadora for maior que 0 e tiver conteúdo 'faça isso'
            if(resultGravadora > 0 || typeof(resultGravadora) == 'object'){

                dadosGravadora.status = true,
                dadosGravadora.status_code = 200,
                dadosGravadora.items = resultGravadora.length,
                dadosGravadora.gravadoras = resultGravadora

                return dadosGravadora
            }else{
                return message.ERROR_NOT_FOUND //404 -> sem itens para retorno
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL // 500
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_MODEL // 500
    }
}

const buscarGravadora = async function(id){

    try {
        
        let dadosGravadora = {}

        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            let resultGravadora = await gravadoraDAO.selectByIdGravadora(id)

            if(resultGravadora != false || typeof(resultGravadora) == 'object'){
                if(resultGravadora.length > 0){
                    dadosGravadora.status = true,
                    dadosGravadora.status_code = 200,
                    dadosGravadora.gravadora = resultGravadora

                    return dadosGravadora
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
    inserirGravadora,   //Está tudo ok
    listarGravadora,    //Está tudo ok
    atualizarGravadora, //Está tudo ok
    excluirGravadora,  //Está tudo ok
    buscarGravadora    //Está tudo ok
}