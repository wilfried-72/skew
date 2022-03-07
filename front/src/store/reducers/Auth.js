/*
 * Import Actions { ... }
 * ********************** */
import * as Actions from "../actions/ActionTypes";

/*
 * Selector
 * ******** */
const initialState = {
    user: {},
    flash: "",
    flashCon: "",
    authenticate: null,
    dataChange: {}
};

/*
 * Reducers
 * ******** */
export function AuthReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
        case Actions.LOGIN:
            return {
                ...state,
                flashCon: action.payload.flash,
                authenticate: action.payload.authenticate,
                user: action.payload.token,
            };
        case Actions.REGISTER:
            return {
                ...state,
                flash: action.payload.flash,
            };
        case Actions.CHECKTOKEN:
            return {
                ...state,
                flash: action.payload.flash,
                user: action.payload.user,
            };
        case Actions.CHANGEMDP:
            return {
                ...state,
                dataChange: action.payload.flash,
            };
    }
}

/*
 * Getters
 * ******* */
