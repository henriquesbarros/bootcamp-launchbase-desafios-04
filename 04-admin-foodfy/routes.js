const express = require('express')
const routes = express.Router()
const recipesController = require('./controllers/recipesController')

// MAIN

routes.get('/', recipesController.home)
routes.get('/about', recipesController.about)
routes.get('/recipes', recipesController.recipes)
routes.get('/recipes/:id', recipesController.recipe)

// ADMIN

routes.get('/admin/recipes', recipesController.index)
routes.get('/admin/recipes/create', recipesController.create)
routes.post('/admin/recipes', recipesController.post)
routes.get('/admin/recipes/:id', recipesController.show)
routes.get('/admin/recipes/:id/edit', recipesController.edit)
routes.put('/admin/recipes', recipesController.update)
routes.delete('/admin/recipes', recipesController.delete)


module.exports = routes