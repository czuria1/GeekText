
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_FROM_LIST_TO_CART} from './action-types/cart-actions';

export const addToCart= (id)=>{
    return{
        type: ADD_TO_CART,
        id
    }
}

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
