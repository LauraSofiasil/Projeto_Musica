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

module.exports = {
    inserirTipoArtista
}