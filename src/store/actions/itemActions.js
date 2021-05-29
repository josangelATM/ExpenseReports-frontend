import * as actionTypes from './actionTypes'

export const addItem = (item) =>{
    return{
        type: actionTypes.ADD_ITEM,
        item
    }
}

export const deleteItem = (id) =>{
    return{
        type: actionTypes.DELETE_ITEM,
        id
    }
}

export const clearItems = () =>{
    return{
        type: actionTypes.CLEAR_ITEMS
    }
}