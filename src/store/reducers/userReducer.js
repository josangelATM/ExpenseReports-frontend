import * as actionTypes from '../actions/actionTypes'

const user = JSON.parse(localStorage.getItem('user_expenseReport'))

const initialState = user ? //Check if there is user logged (local storage)
        {isLogged: true, user} 
        : {isLogged: false, user: null}
 
const login = (state, action) => {
    return{
        ...state,
        isLogged: true,
        user:action.user
    }

}

const logout = (state, action) => {
    localStorage.removeItem('user_expenseReport');
    return{
        ...state,
        isLogged: false,
        user:null
    }

}


const userReducer = (state = initialState, action) => {
    switch(action.type){
        case (actionTypes.LOGIN): return login(state,action); 
        case (actionTypes.LOGOUT): return logout(state,action);
        default: return state;
    }
    

}

export default userReducer;