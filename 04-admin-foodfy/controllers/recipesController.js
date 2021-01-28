const recipesData = require('../data.json')
const fs = require('fs')

// MAIN

exports.home = function(req, res){
    return res.render('main/home', { recipes: recipesData.recipes })
}

exports.about = function(req, res){
    return res.render('main/about')
}

exports.recipes = function(req, res){
    return res.render('main/recipes', { recipes: recipesData.recipes })
}

exports.recipe = function(req, res){
    const { id } = req.params
    res.render('main/recipe', { recipe: recipesData.recipes[id - 1] })
}

// ADMIN

exports.index = function(req, res){
    return res.render('admin/recipes', { recipes: recipesData.recipes })
}

exports.create = function(req, res){
    return res.render('admin/create')
}

exports.post = function(req, res) {
    let id = 1
    const lastRecipe = recipesData.recipes[recipesData.recipes.length - 1]
    if (lastRecipe) {
        id = lastRecipe.id + 1
    }

    recipesData.recipes.push({
        id,
        ...req.body
    })

    fs.writeFile("data.json", JSON.stringify(recipesData, null, 2), function(err){
        if (err) return res.send("Erro na escrita do arquivo!")

        return res.redirect(`/admin/recipes/${id}`)
    })
    
}

exports.show = function(req, res){
    const id = req.params.id

    const foundRecipe = recipesData.recipes.find(function(recipe){
        return recipe.id == id
    })

    if (!foundRecipe) return res.send("Receita não encontrada")

    const recipe = {
        id: Number(id),
        ...foundRecipe
    }

    res.render('admin/recipe', { recipe })
}

exports.edit = function(req, res){
    const { id } = req.params

    const foundRecipe = recipesData.recipes.find(function(recipe){
        return recipe.id == id
    })

    if (!foundRecipe) return res.send("Professor não encontrado")

    res.render('admin/edit', { recipe: foundRecipe })
}

exports.update = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundRecipe = recipesData.recipes.find(function(recipe, foundIndex){
        if ( recipe.id == id ) {
            index = foundIndex
            return true
        } 
    })

    if (!foundRecipe) return res.send("Receita não encontrada")

    const recipe = {
        ...foundRecipe,
        ...req.body,
        id: Number(id)
    }

    recipesData.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(recipesData, null, 2), function(err){
        if (err) return res.send("Erro na escrita do arquivo!")

        return res.redirect(`/admin/recipes/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredRecipes = recipesData.recipes.filter(function(recipes){
        return recipes.id != id
    })

    recipesData.recipes = filteredRecipes

    fs.writeFile("data.json", JSON.stringify(recipesData, null, 2), function(err){
        if (err) return res.send("Erro na escrita do arquivo!")

        return res.redirect("/admin/recipes")
    })
}