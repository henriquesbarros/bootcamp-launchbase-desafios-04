const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/professores', function(req, res){
    return res.render('teachers/teacher')
})

routes.get('/professores/criar', function(req, res){
    return res.render('teachers/create')
})

routes.post('/professores', teachers.post)

module.exports = routes