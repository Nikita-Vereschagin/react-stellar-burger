import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ingredientsList: []
}

const ingredientsSlice = createSlice({
    name: 'INGREDIENT',
    initialState,
    reducers: {
        SET_APIDATA: {
            reducer: (state, action) => {
                state.ingredientsList = action.payload
            },
            prepare: (array) => {
                return { payload: array = array.map(el => {return {...el, count: 0}})} 
              }
        },
        INCREASE: (state, action) => {state.ingredientsList = state.ingredientsList.map(el =>{ 
                if (el._id === action.payload._id && el.type === action.payload.type && action.payload.type !== 'bun')  {return {...el, count: el.count + 1}} 
                else if (el._id === action.payload._id && el.type === action.payload.type && action.payload.type === 'bun') {return {...el, count: 1}}
                else if (el._id !== action.payload._id && el.type === action.payload.type && action.payload.type === 'bun') {return {...el, count: 0}}
                else return el 
            })
        },
        DECREASE: (state, action) => {state.ingredientsList = state.ingredientsList.map(el => el._id === action.payload._id ? {...el, count: el.count - 1} : el )}
        },
        
})
export const { SET_APIDATA, INCREASE, DECREASE } = ingredientsSlice.actions

export default ingredientsSlice