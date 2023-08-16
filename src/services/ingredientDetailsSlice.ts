import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBurgerIngredient } from "../components/burger-constructor/burger-constructor";


const initialState: {} | IBurgerIngredient = {}

const ingredientDetailsSlice = createSlice({
    name: 'INGREDIENT_DETAILS',
    initialState,
    reducers: {
        SET_INGREDIENT_DETAILS: (state, action: PayloadAction<IBurgerIngredient | {}>) => {
                return state = action.payload
            }
        }
})
export const { SET_INGREDIENT_DETAILS} = ingredientDetailsSlice.actions

export default ingredientDetailsSlice