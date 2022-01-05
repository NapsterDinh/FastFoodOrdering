import { createSlice } from '@reduxjs/toolkit';
import { NavItem } from 'react-bootstrap';

// toogle show hide panel cart
const initialState = {
  value: '',
  currentItem : null
};
const countSumTopping = (arr) => 
{
  let tempToppingOverview = ''
  arr.map((item, index) => {
    if(index === 0)
    {
      tempToppingOverview += item.type
    }
    else
    {
      tempToppingOverview += ` - ${item.type}`
    }
  })
  return tempToppingOverview
}
export const toggleDetailProduct = createSlice({
  name: 'product',
  initialState,
  reducers: {
    showHideDetailProduct: (state, action) => {
      if(action.payload.status === 'SHOW')
      {
          state.value = 'show'
          state.currentItem = {
            ...action.payload.chooseItem,
            cartAmount : 1,
            note: '',
            cart_overview: action.payload.chooseItem.size[0].type,
            cart_overview_size: action.payload.chooseItem.size[0].type,
            cart_overview_topping: '',
            total: action.payload.chooseItem.price,
            size_choosen:action.payload.chooseItem.size[0],
            topping_choosen: []
          }
      }
      else
      {
          state.value =''
          state.currentItem = null
      }
    },
    actionCustomItemCart: (state, action) => {
      let currentProduct = state.currentItem
      switch (action.payload.type) {
        case 'INCREASE_AMOUNT':
          currentProduct.cartAmount = currentProduct.cartAmount === 20 ? 20 : currentProduct.cartAmount + 1;
          currentProduct.total = currentProduct.price * currentProduct.cartAmount
          break;
        case 'DECREASE_AMOUNT':
          currentProduct.cartAmount = currentProduct.cartAmount === 1 ? 1 : currentProduct.cartAmount - 1;
          currentProduct.total = currentProduct.price * currentProduct.cartAmount
          break;
        case 'SET_CHOOSE_OPTION':
          if(action.payload.payload.typeChosen === 'SIZE')
          {
            currentProduct.cart_overview_size = currentProduct.cart_overview_size
                                              .replace(currentProduct.size_choosen.type, action.payload.payload.item_choose.type)
            currentProduct.size_choosen = action.payload.payload.item_choose
          }
          else
          {
            //check topping appear in array
            const index_choose = currentProduct.topping_choosen.findIndex(c => c._id === action.payload.payload.item_choose._id);
            if(index_choose === -1)
            {
              currentProduct.topping_choosen.push(action.payload.payload.item_choose)
            }
            else
            {
              currentProduct.topping_choosen.splice(index_choose, 1)
            }
            
            currentProduct.cart_overview_topping = countSumTopping(currentProduct.topping_choosen)
          }
          
          //set total
          let tempTotal = currentProduct.size_choosen.price;

          let sum_topping = 0
          currentProduct.topping_choosen.map((item,index) => {
              sum_topping += item.price
          })

          tempTotal += sum_topping

          currentProduct.cart_overview = currentProduct.cart_overview_size + " - " + currentProduct.cart_overview_topping

          currentProduct.total =  tempTotal * currentProduct.cartAmount

          currentProduct.price = tempTotal
          break;

        default:
          break;
      }
    }
  }
});
export const { showHideDetailProduct, actionCustomItemCart} = toggleDetailProduct.actions;

export default toggleDetailProduct.reducer;