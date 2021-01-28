const recipes = document.querySelectorAll('.recipe');

for (let recipe of recipes) {
    recipe.addEventListener('click', function(){
        const recipeId = recipe.getAttribute('id')
        window.location.href = `/recipes/${recipeId}`
    })
}

// SHOW AND HIDE

const recipeInfo = document.querySelectorAll('.recipe-information') 
const showInfo = document.querySelectorAll('.show') 

for (let i = 0; i < showInfo.length; i++) {
    showInfo[i].addEventListener('click', function(){
        if(recipeInfo[i].classList.contains('hidden')){
            recipeInfo[i].classList.remove('hidden')
            showInfo[i].innerHTML = "ESCONDER"
        } else {
            recipeInfo[i].classList.add('hidden')
            showInfo[i].innerHTML = "MOSTRAR"
        }
    })
}

