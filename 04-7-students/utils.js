module.exports = {
    age: function(timestamp){
        const today = new Date
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear() // 22
        const month = today.getMonth() - birthDate.getMonth() // - 2

        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
            age = age - 1
        }

        return age
    },
    graduation: function(schooling){
        switch (schooling){
            case 'medium':
                return "Ensino Médio Completo"
            case 'higher':
                return "Ensino Superior Completo"
            case 'masters':
                return "Mestrado"
            case 'doctorate':
                return "Doutorado"
            default:
                return "Escolaridade não especificada."
        }
    },
    date: function(timestamp){
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },
    grade: function(school_year) {
        switch(school_year){
            case '5EF':
                return "5ª Ano do Ensino Fundamental"
            case '6EF':
                return "6ª Ano do Ensino Fundamental"
            case '7EF':
                return "7ª Ano do Ensino Fundamental"
            case '8EF':
                return "8ª Ano do Ensino Fundamental"
            case '9EF':
                return "9ª Ano do Ensino Fundamental"
            case '1EM':
                return "1ª Ano do Ensino Médio"
            case '2EM':
                return "2ª Ano do Ensino Médio"
            case '3EM':
                return "3ª Ano do Ensino Médio"
            default:
                return "Ano escolar não especificado."
        }
    }
}

