
export function validateExpiration(stringDate){
    console.log(stringDate)
    const now = new Date()
    let expirateDate = new Date(stringDate)

    const differenceMs = now - expirateDate
    const differenceDays = differenceMs / (1000 * 60 * 60 * 24)

    console.log(differenceDays)

    if(differenceDays<0){
        return 'Vigente'
    }

    if(differenceDays>7){
        return 'Caducado'
    }

    return 'Por caducar'
}