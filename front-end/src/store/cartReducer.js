import { createSlice, current } from '@reduxjs/toolkit';
import { isEqual } from 'lodash-es';
 
// toogle show hide panel cart
const initialState = {
    cart: ''
}

export const todoProductReducer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        todoProduct: (state=initialState, action) => {
            switch(action.payload.type){
                case 'FETCH_CART':
                    console.log(action.payload)
                    state.cart = action.payload.cart
                    break;
                case 'CLEAR_CART_LOG_OUT':
                    state.cart = ''
                    break;
                case 'ADD_TO_CART':
                    
                    break
                case 'REMOVE_FROM_CART':
                    let temp1 = [...state.cart.cartItemId]
                    temp1.splice(temp1.findIndex(item  => item._id === action.payload.cartItem._id), 1)
                    state.cart = {
                        ...state.cart,
                        cartItemId: temp1,
                        mount : state.cart.mount - action.payload.cartItem.quantity,
                        totalPrice: state.cart.totalPrice - action.payload.cartItem.total
                    }
                    break
                default:
                    return state;
            }
      }
    }
  });  
  export const { todoProduct } = todoProductReducer.actions;
  
  export default todoProductReducer.reducer;
  
