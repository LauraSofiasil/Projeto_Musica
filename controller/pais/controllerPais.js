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
const paisDAO = require('../../model/DAO/pais.js')

//Função para inserir uma nova música
const inserirPais = async function(pais, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( pais.pais == '' || pais.pais == null || pais.pais == undefined || pais.pais.length > 100 
            )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else{
                //Encaminhando os dados da música para o DAO realizar o insert no Banco de dados
                let resultPais = await paisDAO.insertPais(pais)

                if(resultPais)
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
const atualizarPais = async function(id, pais, contentType){
    try {
        
        //Copiamos o início do código do inserirMusica
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if( pais.pais == '' || pais.pais == null || pais.pais == undefined || pais.pais.length > 100 || 
                    id        == '' || id        == null  || id       == undefined || isNaN(id)
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //status code 400

                }else{ //Copiamos só até aqu - até essa linha

                    //Verifica se o ID existe no Banco de Dados
                    let result = await paisDAO.selectByIdPais(id)

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            
                            //Update
                            pais.id_pais = id //Adiciona o atributo do ID no JSON -> (musica) com os dados recebidos no corpo da requisição
                            let resultPais = await paisDAO.updatePais(pais) 

                            if(resultPais){
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
const excluirPais = async function(id){
    try{
        if(id == '' || id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS  //status code 400
        }else{
            
            //Antes de excluir, estamos verificando se existe esse id
            let resultPais = await paisDAO.selectByIdPais(id)

            if(resultPais != false || typeof(resultPais) =='object'){
                
                if(resultPais.length > 0){
                    //delete
                    let result = await paisDAO.deletePais(id)

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
const listarPais = async function(){
    try {

        //Objet JSON
        let dadosPais = {}

        //Chama a função para retornar as músicas do banco de dados
        let resultPais = await paisDAO.selectAllPais()

        if(resultPais != false){
            if(resultPais.length > 0 || typeof(resultPais) == 'object'){
                //Cria um json para colocar o array de músicas
                dadosPais.status = true,
                dadosPais.status_code = 200,
                dadosPais.items = resultPais.length,
                dadosPais.paises = resultPais
                
                return dadosPais

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
const buscarPais = async function(id){
    try{
        //Objeto JSON
        let dadosPais = {}

        if(id == '' || id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //status code 400
        }else{

            let resultPais = await paisDAO.selectByIdPais(id)
                    
            if(resultPais != false || typeof(resultPais) == 'object'){
                if(resultPais.length > 0){
                    //Cria um json para colocar o array de músicas
                    dadosPais.status = true,
                    dadosPais.status_code = 200,
                    dadosPais.paises = resultPais
                    
                    return dadosPais

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
    inserirPais,   //Está tudo ok
    atualizarPais, //Está tudo ok
    excluirPais,   //Está tudo ok
    listarPais,    //Está tudo ok
    buscarPais     //Está tudo ok
}