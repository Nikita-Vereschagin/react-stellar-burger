import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBurgerIngredient } from "../components/burger-constructor/burger-constructor";


interface IOrder {
    data: IBurgerIngredient | undefined
}

const initialState: IOrder = {
    data: undefined
}

const ingredientDetailsSlice = createSlice({
    name: 'INGREDIENT_DETAILS',
    initialState,
    reducers: {
        SET_INGREDIENT_DETAILS: (state, action: PayloadAction<IBurgerIngredient | undefined>) => {
                state.data = action.payload
            }
        }
})
export const { SET_INGREDIENT_DETAILS} = ingredientDetailsSlice.actions

export default ingredientDetailsSlice