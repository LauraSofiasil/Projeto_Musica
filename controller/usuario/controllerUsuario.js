/*********************************************************************************************************************************************************************************
 * Objetivo: Controller responsável pela integração entre o APP e a Model (CRUD de Dados)
 *              Validações, tratamento de dados etc...
 * Data: 15/04/2025
 * Autor: Laura
 * Versão: 1.0  
 * ********************************************************************************************************************************************************************************/

const message = require('../../modulo/config.js')

const usuarioDAO = require('../../model/DAO/usuario.js')

//Função para inserir uma nova música
const inserirUsuario = async function(usuario, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( usuario.nome            == '' || usuario.nome             == null || usuario.nome           == undefined ||  usuario.nome.length            > 100 || 
                usuario.data_nascimento == '' || usuario.data_nascimento  == null || usuario.data_nascimento == undefined || usuario.data_nascimento.length > 10  || 
                usuario.email           == '' || usuario.email            == null || usuario.demail          == undefined || usuario.email.length         > 100   ||
                usuario.senha           == '' || usuario.senha            == null || usuario.senha           == undefined || usuario.senha             > 20
            )
            {
                return message.ERROR_REQUIRED_FIELDS //400
            }else{

                let resultUsuario = await usuarioDAO.insertUsuario(usuario)

                if(resultUsuario)
                    return message.SUCESS_CREATED_ITEM //201
                else{
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE   //status code 415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER  //status code 500 
    }
}

const atualizarUsuario = async function(){

}

const excluirUsuario = async function(){

}

const listarUsuario = async function(){

}

const buscarUsuario = async function(){

}


module.exports = {
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario
}