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
            if( usuario.nome            == '' || usuario.nome             == null || usuario.nome           == undefined ||  usuario.nome.length              > 100 || 
                usuario.data_nascimento == '' || usuario.data_nascimento  == null || usuario.data_nascimento == undefined || usuario.data_nascimento.length   > 10  || 
                usuario.email           == '' || usuario.email            == null || usuario.email          == undefined || usuario.email.length              > 100   ||
                usuario.senha           == '' || usuario.senha            == null || usuario.senha           == undefined || usuario.senha.length             > 20
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

const atualizarUsuario = async function(id, usuario, contentType){

    try {
        
        if(String(contentType).toLowerCase() == 'application/json'){
            if(usuario.nome             == '' || usuario.nome              == null || usuario.nome           == undefined ||  usuario.nome.length             > 100 || 
                usuario.data_nascimento == '' || usuario.data_nascimento  == null || usuario.data_nascimento == undefined || usuario.data_nascimento.length   > 10  || 
                usuario.email           == '' || usuario.email            == null || usuario.email          == undefined  || usuario.email.length             > 100 ||
                usuario.senha           == '' || usuario.senha            == null || usuario.senha           == undefined || usuario.senha.length             > 20  ||
                id                      == '' || id                       == null || id                      == undefined || isNaN(id) 
            ){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                
                let result = await usuarioDAO.selectByIdUsuario(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){

                        usuario.id = id

                        let resultUsuario = await usuarioDAO.updateUsuario(usuario)

                        if(resultUsuario){
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
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const excluirUsuario = async function(id){
    try {
        
        if(id == '' || id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Antes de excluir, estamos verificando se existe esse id
            let resultUsuario = await usuarioDAO.selectByIdUsuario(id)

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0){

                    let result = await usuarioDAO.deleteUsuario(id)

                    if(result)
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

//Função para listar todos os usuários
const listarUsuario = async function(){
    try {
        
        let dadosUsuario = {}

        let resultUsuario = await usuarioDAO.selectAllUsuario()

        if(resultUsuario != false){
            if(resultUsuario.length > 0 || typeof(resultUsuario) == 'object'){
                
                //Criando um json com os dados do usuário
                dadosUsuario.status = true,
                dadosUsuario.status_code = 200,
                dadosUsuario.items = resultUsuario.length,
                dadosUsuario.usuarios = resultUsuario

                return dadosUsuario
                
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_MODEL //500
    }
}

//Função para buscar um usuário pelo id
const buscarUsuario = async function(id){

    try {
        
        let dadosUsuario = {}

        if(id == '' || id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // 400
        }else{
            
            let resultUsuario = await usuarioDAO.selectByIdUsuario(id)

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0){

                    dadosUsuario.status = true,
                    dadosUsuario.status_code = 200,
                    dadosUsuario.usuario = resultUsuario

                    return dadosUsuario

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
    inserirUsuario,  //OK
    atualizarUsuario, //OK
    excluirUsuario, //OK
    listarUsuario,  //OK
    buscarUsuario  //OK
}