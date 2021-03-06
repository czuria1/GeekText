
import {REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_FROM_LIST_TO_CART, ADD_TO_SFL, REMOVE_FROM_SFL} from './action-types/cart-actions';

export const addFromListToCart= (book)=>{
    return{
        type: ADD_FROM_LIST_TO_CART,
        book
    }
}

export const removeItem=(book)=>{
    return{
        type: REMOVE_ITEM,
        book
    }
}

export const subtractQuantity=(book)=>{
    return{
        type: SUB_QUANTITY,
        book
    }
}

export const addQuantity=(book)=>{
    return{
        type: ADD_QUANTITY,
        book
    }
}

export const addToSaveForLater=(book)=>{
    return{
        type: ADD_TO_SFL,
        book
    }
}

export const removeFromSaveForLater=(book)=>{
    return{
        type: REMOVE_FROM_SFL,
        book
    }
}
