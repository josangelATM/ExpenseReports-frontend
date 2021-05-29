export const formatDate = (date) => {
    
    let dateTF = new Date(date) //dateToFormat
    return(`${dateTF.getMonth() + 1 < 10 ? `0${dateTF.getMonth() + 1}` : dateTF.getMonth() + 1}-${dateTF.getDate()}-${dateTF.getFullYear()}`)
}

export const formatDateNormal = (date) =>{
    let dateArray = date.split('-')
    return(`${dateArray[1]}-${dateArray[2]}-${dateArray[0]}`)
}

export const formatDateToInitialValues = (date) => {
    return(`${date.year}-${date.month}-${date.day}`)
}


export const dateToObject = (date) =>{
    let dateArray = date.split('-')
    return({
        year: dateArray[0],
        month: dateArray[1],
        day: dateArray[2]
    })
}

export const objectDateToString = (date) =>{
    return(`${date.month}-${date.day}-${date.year}`)
}

export const checkDatesValidity = (dateFrom,dateTo,items)=>{
    const newDateFrom = new Date(dateFrom)
    const newDateTo = new Date(dateTo)
    if(newDateFrom <= newDateTo){
        const validity = items.every(item=>{
            // console.log(newDateFrom)
            // console.log(new Date(`${item.date.year}/${item.date.month}/${item.date.day-1} 19:00:00`))
            // console.log(newDateTo)
            return (newDateFrom <= new Date(`${item.date.year}/${item.date.month}/${item.date.day-1} 19:00:00`) && newDateTo >= new Date(`${item.date.year}/${item.date.month}/${item.date.day-1} 19:00:00`))
    
        }   
        )
        if(validity){
            return(true)
        }else{
            alert('Algún gasto no está dentro de las fechas seleccionadas')
            return(false)
        }
    }else{
        alert('Fecha (desde) debe ser menor a fecha (hasta)')
        return(false)
    }

}

