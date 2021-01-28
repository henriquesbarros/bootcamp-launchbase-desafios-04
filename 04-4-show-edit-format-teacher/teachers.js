const fs = require('fs')
const data = require('./data.json')
const { age, graduation, date } = require('./utils')

exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    for(key of keys) {
        if (req.body[key] == "") {
            return res.send("Por favor, preencha todos os campos!")
        }
    }

    let { avatar_url, name, birth, schooling, type_class, acting } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        name,
        avatar_url,
        birth,
        schooling,
        type_class,
        acting,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Erro na escrita do arquivo!")

        return res.redirect('/professores')
    })
}

exports.show = function(req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher) res.send("Professor não encontrado!")

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        schooling: graduation(foundTeacher.schooling),
        acting: foundTeacher.acting.split(","),
        created_at: new Intl.DateTimeFormat('pt-br').format(foundTeacher.created_at)
    }

    return res.render('teachers/show', { teacher })
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Professor não encontrado")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render('teachers/edit', { teacher })
}