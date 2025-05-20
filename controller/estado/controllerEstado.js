/*********************************************************************************************************************************************************************************
 * Objetivo: Controller responsável pela integração entre o APP e a Model (CRUD de Dados)
 *              Validações, tratamento de dados etc...
 * Data: 20/02/2025
 * Autor: Laura
 * Versão: 1.0  
 * ********************************************************************************************************************************************************************************/

//import do arquivo de menssagem e status code
const message = require('../../modulo/config.js')

//import do DAO para realizar o CRUD no Banco de dados
const estadoDAO = require('../../model/DAO/estado.js')

//Função para inserir um novo estado
const inserirEstado = async function(estado, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( estado.estado == '' || estado.estado == null || estado.estado == undefined || estado.estado.length > 100 
            )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else{
                //Encaminhando os dados da música para o DAO realizar o insert no Banco de dados
                let resultEstado = await estadoDAO.insertEstado(estado)

                if(resultEstado)
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

//Função para retornar uma lista de estados
const listarEstados = async function(){
    try {

        //Objet JSON
        let dadosEstado = {}

        //Chama a função para retornar as músicas do banco de dados
        let resultEstado = await estadoDAO.selectAllEstado()

        if(resultEstado != false){
            if(resultEstado.length > 0 || typeof(resultEstado) == 'object'){
                //Cria um json para colocar o array de músicas
                dadosEstado.status = true,
                dadosEstado.status_code = 200,
                dadosEstado.items = resultEstado.length,
                dadosEstado.paises = resultEstado
                
                return dadosEstado

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
const buscarEstado = async function(id_estado){
    try{
        //Objeto JSON
        let dadosEstado = {}

        if(id_estado == '' || id_estado == null || id_estado == undefined || isNaN(id_estado)){
            return message.ERROR_REQUIRED_FIELDS //status code 400
        }else{

            let resultEstado = await estadoDAO.selectByIdEstado(id_estado)
                    
            if(resultEstado != false || typeof(resultEstado) == 'object'){
                if(resultEstado.length > 0){
                    //Cria um json para colocar o array de músicas
                    dadosEstado.status = true,
                    dadosEstado.status_code = 200,
                    dadosEstado.estados = resultEstado
                    
                    return dadosEstado

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

//Função para excluir uma música
const excluirEstado = async function(id_estado){
    try{
        if(id_estado == '' || id_estado == null || id_estado == undefined || isNaN(id_estado)){
            return message.ERROR_REQUIRED_FIELDS  //status code 400
        }else{
            
            //Antes de excluir, estamos verificando se existe esse id
            let resultEstado = await estadoDAO.selectByIdEstado(id_estado)

            if(resultEstado != false || typeof(resultEstado) =='object'){
                
                if(resultEstado.length > 0){
                    //delete
                    let result = await estadoDAO.deleteEstado(id_estado)

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

//Função para atualizar um estado
const atualizarEstado = async function(id_estado, estado, contentType){
    try {
        
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if( estado.estado == '' || estado.estado == null || estado.estado == undefined || estado.estado.length > 100 ||
                    id_estado == '' || id_estado == null || id_estado == undefined || isNaN(id_estado)
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //status code 400
                }else{

                    let result = await estadoDAO.selectByIdEstado(id_estado)

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            
                            //Update
                            estado.id_estado = id_estado //Adiciona o atributo do ID no JSON -> (musica) com os dados recebidos no corpo da requisição
                            let resultEstado = await estadoDAO.updateEstado(estado)

                            if(resultEstado){
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

module.exports = {
    inserirEstado, //ok
    listarEstados, //0k
    buscarEstado, //ok
    excluirEstado, //ok
    atualizarEstado //ok

}