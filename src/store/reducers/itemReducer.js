import * as actionTypes from '../actions/actionTypes'

const initialState = {
    currentItems: [],
    totalAmount: 0.00
}

const addItem = (state,action) =>{
    return{
        ...state,
        currentItems: [...state.currentItems, action.item],
        totalAmount: (parseFloat(state.totalAmount) + parseFloat(action.item.totalItem)).toFixed(2)
    }
}

const deleteItem = (state,action) =>{
    const index = state.currentItems.findIndex(item => item.id === action.id)
    console.log(action)
    return{
        ...state,
        totalAmount: (parseFloat(state.totalAmount) - parseFloat(state.currentItems[index].totalItem)).toFixed(2),
        currentItems: state.currentItems.filter(item => item.id !== action.id)
    }
}

const clearItems = (state,action) =>{
    console.log('here')
    return{
        ...state,
        currentItems: [],
        totalAmount: 0.00
    }
}

const itemReducer = (state= initialState, action) =>{
    switch(action.type){
        case (actionTypes.ADD_ITEM): return addItem(state,action);
        case (actionTypes.DELETE_ITEM): return deleteItem(state,action);
        case (actionTypes.CLEAR_ITEMS): return clearItems(state,action);
        default: return state;
    }
}

export default itemReducer;