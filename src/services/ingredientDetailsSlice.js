import { createSlice } from "@reduxjs/toolkit";

const ingredientDetailsSlice = createSlice({
    name: 'INGREDIENT_DETAILS',
    initialState: null,
    reducers: {
        SET_INGREDIENT_DETAILS: (state, action) => {
                return state = action.payload
            }
        }
})
export const { SET_INGREDIENT_DETAILS} = ingredientDetailsSlice.actions

export default ingredientDetailsSlice