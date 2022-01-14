import programs from './programs.json'

let old = programs;

let faculties = []
old.data.forEach((data, i) => {
    if (!faculties.find(item => item == data.faculty))
        faculties.push(data.faculty)
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