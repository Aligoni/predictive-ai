import studyCenters from './studyCenters.json'

const cleanData = () => {
    let old = studyCenters;
    let cleaned = []

    let tracker = 0
    old.data.forEach((data, i) => {
        if (data.name) {
            cleaned.push(data)
        } else {
            cleaned[i - 1 - tracker].address += ', '+ data.address
            tracker++
        }
    })

    return cleaned
}

export default cleanData()