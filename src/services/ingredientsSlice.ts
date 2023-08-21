import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBurgerIngredient } from "../components/burger-constructor/burger-constructor";

interface IIngredients extends IBurgerIngredient{
    count?: number
}

interface IIngredientList {
    ingredientsList: IIngredients[] | IBurgerIngredient[] | []
}

const initialState: IIngredientList = {
    ingredientsList: []
}

const ingredientsSlice = createSlice({
    name: 'INGREDIENT',
    initialState,
    reducers: {
        SET_APIDATA: {
            reducer: (state, action: PayloadAction<IBurgerIngredient[]>) => {
                state.ingredientsList = action.payload
            },
            prepare: (array) => {
                return { payload: array = array.map((el: IBurgerIngredient) => {return {...el, count: 0}})} 
              }
        },
        INCREASE: (state, action) => {state.ingredientsList = state.ingredientsList.map(el =>{ 
                if (el._id === action.payload._id && el.type === action.payload.type && action.payload.type !== 'bun' && el.count)  {return {...el, count: el.count + 1}} 
                else if (el._id === action.payload._id && el.type === action.payload.type && action.payload.type === 'bun' && el.count) {return {...el, count: 1}}
                else if (el._id !== action.payload._id && el.type === action.payload.type && action.payload.type === 'bun' && el.count) {return {...el, count: 0}}
                else return el 
            })
        },
        DECREASE: (state, action) => {state.ingredientsList = state.ingredientsList.map(el => el._id === action.payload._id && el.count ? {...el, count: el.count - 1} : el )}
        },
        
})
export const { SET_APIDATA, INCREASE, DECREASE } = ingredientsSlice.actions

type TIngredientsActionCreators = typeof ingredientsSlice.actions

export type TIngredientsActions = ReturnType<TIngredientsActionCreators[keyof TIngredientsActionCreators]>

export default ingredientsSlice