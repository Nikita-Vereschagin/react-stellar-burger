
            //Imports//

import { combineReducers } from "redux";
import constructorSlice from "../constructorSlice";
import ingredientsSlice from "../ingredientsSlice";
import orderSlice from "../orderSlice";
import ingredientDetailsSlice from "../ingredientDetailsSlice";

const rootReducer = combineReducers({
    burgerConstructor: constructorSlice.reducer,
    ingredients: ingredientsSlice.reducer,
    orderDetails: orderSlice.reducer,
    ingredientDetails: ingredientDetailsSlice.reducer
})

export default rootReducer