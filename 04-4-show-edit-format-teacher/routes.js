const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/', function(req, res){
    return res.redirect('/professores')
})

routes.get('/professores', function(req, res){
    return res.render('teachers/teacher')
})

routes.get('/professores/criar', function(req, res){
    return res.render('teachers/create')
})

routes.get('/professores/:id', teachers.show)

routes.get('/professores/:id/editar', teachers.edit)

routes.post('/professores', teachers.post)

module.exports = routes