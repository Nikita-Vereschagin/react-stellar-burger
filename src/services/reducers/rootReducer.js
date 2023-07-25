
            //Imports//

import { combineReducers } from "redux";
import constructorSlice from "../constructorSlice";
import ingredientsSlice from "../ingredientsSlice";
import orderSlice from "../orderSlice";
import ingredientDetailsSlice from "../ingredientDetailsSlice";
import userSlice from "../userSlice";

const rootReducer = combineReducers({
    burgerConstructor: constructorSlice.reducer,
    ingredients: ingredientsSlice.reducer,
    orderDetails: orderSlice.reducer,
    ingredientDetails: ingredientDetailsSlice.reducer,
    user: userSlice.reducer
})

export default rootReducer