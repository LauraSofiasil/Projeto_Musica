/*********************************************************************************************************************************************************************************
 * Objetivo: Criar uma API para realizar integração com o banco de dados
 * Data: 18/02/2025
 * Autor: Laura
 * Versão: 1.0
 * 
 * Observações:
 *** Para criar uma API devemos instalar:
 *      express          npm install express --save  
 *      cors             npm install cors --save               
 *      body-parser      npm install body-parser --save      
 * 
 *** Para criar uma interação com o Banco de dados devemos instalar:
 *      prisma           npm install prisma --save 
 *      @prisma/client   npm install @prisma/client --save   
 *
 *** Sincronizar um comando com o Prisma 
 *      npx prisma migrate dev
 * 
 *** Após a instalação do Prisma e @prisma/client devemos:
 *      npx prisma init   Para inicializar o prisma do projeto
 * 
 *** Após esse comando você deverá consigurar o .env e o schema.prisma, e rodar o comando:
 *      npx prisma migrate dev
 * 
 * ********************************************************************************************************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Cria um objeto para o body do tipo JSON
const bodyParserJSON = bodyParser.json()

//Cria um objeto do app para criar a API
const app = express()

//Import das Controllers do projeto
const controllerMusicas = require('./controller/musica/controllerMusica.js')
const controllerGravadora = require('./controller/gravadora/controllerGravadora.js')
const controllerUsuario = require('./controller/usuario/controllerUsuario.js')
const controllerGenero = require('./controller/genero/controllerGenero.js')
const controllerTipoArtista = require('./controller/tipoArtista/tipoArtista.js')

//Consgurações de permições do cors para API
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS' )

    app.use(cors())

    next()
})

//ENDPOINT para inserir uma nova música
app.post('/v1/controle-musicas/musica', cors(), bodyParserJSON, async function(request, response){
    
    let contentType = request.headers['content-type']
    //Recebe os dados do body da requisição
    let dadosBody = request.body

    //Chama a função da Controller para iserir os dados e aguarda retorno da função
    let resultMusica = await controllerMusicas.inserirMusica(dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//ENDPOINT para listar todas as músicas
app.get('/v1/controle-musicas/musica', cors(), async function(request, response){

    let resultMusica = await controllerMusicas.listarMusica()

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//ENDPOINT para buscar uma música
app.get('/v1/controle-musicas/musica/:id', cors(), async function(request, response){

    let id = request.params.id
    
    let resultMusica = await controllerMusicas.buscarMusica(id)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//ENDPOINT para excluir uma música pelo id
app.delete('/v1/controle-musicas/musica/:id', cors(), async function(request, response){

    //Sempre que for buscar pelo id tem que ser via params
    let id = request.params.id

    let resultMusica = await controllerMusicas.excluirMusica(id)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//ENDPOINT para atualizar uma música
app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content=type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da música
    let idMusica = request.params.id

    //Recebe os dados da requisição
    let dadosBody = request.body

    //Chama a função e encaminha os argumentos: ID, Body e Content-Type
    let resultMusica = await controllerMusicas.atualizarMusica(idMusica, dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
    
})

//ENDPOINT para inserir uma nova gravadora
app.post('/v1/controle-musicas/gravadora', cors(), bodyParserJSON, async function(request, response){
    
    let contentType = request.headers['content-type']

    let bodyDados = request.body

    let resultGravadora = await controllerGravadora.inserirGravadora(bodyDados, contentType)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

//ENDPOINT para listar todas as gravadoras
app.get('/v1/controle-musicas/gravadoras', cors(), async function(request, response){
    
    let resultGravadora = await controllerGravadora.listarGravadora()

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

//ENDPOINT para buscar uma gravadora pelo id
app.get('/v1/controle-musicas/gravadora/:id', cors(), async function(request, response){

    let id = request.params.id

    let resultGravadora = await controllerGravadora.buscarGravadora(id)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

//ENDPOINT para excluir uma gravadora pelo id
app.delete('/v1/controle-musicas/gravadora/:id', cors(), async function(request, response){

    let id = request.params.id

    let resultGravadora = await controllerGravadora.excluirGravadora(id)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

//ENDPOINT para atualizar uma gravadora
app.put('/v1/controle-musicas/gravadora/:id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let idGravadora = request.params.id

    let dadosBody = request.body

    let resultGravadora = await controllerGravadora.atualizarGravadora(idGravadora, dadosBody, contentType)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

//ENDPOINT para inserir um novo usuario
app.post('/v1/controle-musicas/usuario', cors(), bodyParserJSON, async function(request, response){
    
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    //Chama a função da Controller para iserir os dados e aguarda retorno da função
    let resultUsuario = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.get('/v1/controle-musicas/usuarios', cors(), async function(request, response){

    let resultUsuario = await controllerUsuario.listarUsuario()

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

//ENDPOINT para buscar usuário pelo id
app.get('/v1/controle-musicas/usuario/:id', cors(), async function(request, response){

    let id = request.params.id

    let resultUsuario = await controllerUsuario.buscarUsuario(id)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

//ENDPOINT para excluir um usuário pelo id
app.delete('/v1/controle-musicas/usuario/:id', cors(), async function(request, response){

    let id = request.params.id

    let resultUsuario = await controllerUsuario.excluirUsuario(id)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

//ENDPOINT para atualizar um usuário pelo id
app.put('/v1/controle-musicas/usuario/:id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let id = request.params.id

    let dadosBody = request.body

    let resultUsuario = await controllerUsuario.atualizarUsuario(id, dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

//ENDPOINT para inserir um gênero
app.post('/v1/controle-musicas/genero', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//ENDPOINT para listar todos os gêneros
app.get('/v1/controle-musicas/generos', cors(), async function(request, response){
    
    let resultGenero = await controllerGenero.listarGenero()

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//ENDPOINT para buscar um gênero pelo id
app.get('/v1/controle-musicas/genero/:id', cors(), async function(request, response){

    let idGenero = request.params.id

    let resultGenero = await controllerGenero.buscarGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//ENDPOINT para excluir um gênero pelo id
app.delete('/v1/controle-musicas/genero/:id', cors(), async function(request, response){

    let id = request.params.id

    let resultGenero = await controllerGenero.excluirGenero(id)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.put('/v1/controle-musicas/genero/:id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let idGenero = request.params.id

    let dadosBody = request.body

    let resultGenero = await controllerGenero.atualizarGenero(idGenero, dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//ENDPOINT para inserir um novo tipo de artista
app.post('/v1/controle-musicas/tipoartista', cors(), bodyParserJSON, async function(request, response){
    
    let contentType = request.headers['content-type']

    let bodyDados = request.body

    let resultTipoArtista = await controllerTipoArtista.inserirTipoArtista(bodyDados, contentType)

    response.status(resultTipoArtista.status_code)
    response.json(resultTipoArtista)
})

app.listen(8080, function(){
    console.log('API funcionando e aguardando requisições...')
})
