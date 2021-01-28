const fs = require('fs')
const data = require('../data.json')
const { age, grade, date } = require('../utils')

exports.index = function(req, res) {
    const students = data.students.map(function(student){
        return {
            ...student,
            school_year: grade(student.school_year)
        }
    })

    return res.render('students/index', { students })
}

exports.create = function(req, res){
    return res.render('students/create')
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    for(key of keys) {
        if (req.body[key] == "") {
            return res.send("Por favor, preencha todos os campos!")
        }
    }

    let { avatar_url, name, birth, email, school_year, workload } = req.body

    let id = 1
    const lastStudent = data.students[data.students.length - 1]
    if (lastStudent) {
        id = lastStudent.id + 1
    }

    birth = Date.parse(birth)
    const created_at = Date.now()

    data.students.push({
        id,
        name,
        avatar_url,
        birth,
        email,
        school_year,
        workload,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Erro na escrita do arquivo!")

        return res.redirect(`estudantes/${id}`)
    })
}

exports.show = function(req, res) {
    const { id } = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if (!foundStudent) res.send("Professor não encontrado!")

    const student = {
        ...foundStudent,
        age: age(foundStudent.birth),
        school_year: grade(foundStudent.school_year),
        created_at: new Intl.DateTimeFormat('pt-br').format(foundStudent.created_at)
    }

    return res.render('students/show', { student })
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if (!foundStudent) return res.send("Professor não encontrado")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return res.render('students/edit', { student })
}

exports.update = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex){
        if (student.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundStudent) return res.send("Professor não encontrado")

    const student = {
        ...foundStudent,
        ...req.body,
        id: Number(id)
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Erro na escrita do arquivo!")

        return res.redirect(`/professores/${id}`)
    })

}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredStudents = data.students.filter(function(student){
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Erro na escrita do arquivo!")

        return res.redirect("/estudantes")
    })
}