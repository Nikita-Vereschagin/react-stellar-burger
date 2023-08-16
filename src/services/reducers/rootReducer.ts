
            //Imports//

import { combineReducers } from "redux";
import constructorSlice from "../constructorSlice";
import ingredientsSlice from "../ingredientsSlice";
import orderSlice from "../orderSlice";
import ingredientDetailsSlice from "../ingredientDetailsSlice";
import userSlice from "../userSlice";
import { liveTableReducer } from "../live-table/reducer";
import { profileLiveTableReducer } from "../profile-live-table/reducer";


const rootReducer = combineReducers({
    burgerConstructor: constructorSlice.reducer,
    ingredients: ingredientsSlice.reducer,
    orderDetails: orderSlice.reducer,
    ingredientDetails: ingredientDetailsSlice.reducer,
    user: userSlice.reducer,
    liveTable: liveTableReducer,
    profileLiveTable: profileLiveTableReducer
})

export default rootReducer