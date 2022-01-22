import programs from './programs.json'

let old = programs;

let faculties = []
old.data.forEach((data, i) => {
    let found = faculties.findIndex(item => item.faculty == data.faculty)
    if (found == -1) {
        // faculties.push(data.faculty)
        faculties.push({
            faculty: data.faculty,
            programs: [{
                code: data.code,
                name: data.program
            }]
        })
    } else {
        faculties[found].programs.push({
            code: data.code,
            name: data.program
        })
    }
})

// old.data.forEach((data, i) => {
//     let index = faculties.findIndex(item => item == data.faculty)
//     faculties[index] = {
//         faculty: faculties[index],
//         programs: 
//     }
// })

module.exports = {
    programs: programs.data,
    faculties
}