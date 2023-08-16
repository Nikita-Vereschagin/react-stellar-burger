import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { IBurgerIngredient } from "../components/burger-constructor/burger-constructor";

interface ISliceState {
  bun: IBurgerIngredient | null,
  ingredients: IBurgerIngredient[]
}

const initialState: ISliceState = {
  bun: null,
  ingredients: []
}

const constructorSlice = createSlice({
    name: 'BURGER_CONSTRUCTOR',
    initialState,
    reducers: {
        SET_BUN: (state, action: PayloadAction<IBurgerIngredient>) => {state.bun = action.payload},
        ADD_INGREDIENT: {
          reducer: (state, action: PayloadAction<IBurgerIngredient>) => {state.ingredients = [...state.ingredients, action.payload]}
          
          ,
          prepare: (array) => {
            const id = nanoid()
            return { payload: array = {...array, unicId: id} }
          }
        },
        DELETE_INGREDIENT: (state, action: PayloadAction<number>) => {state.ingredients = [...state.ingredients.filter(el => el.unicId !== action.payload )]},
        SWAP_INGREDIENT: (state, action: PayloadAction<{dragIndex: number, hoverIndex: number}>) => {
          const ingredients = [...state.ingredients]
          const {dragIndex, hoverIndex} = action.payload
          ingredients.splice(hoverIndex, 0, ingredients.splice(dragIndex, 1)[0])
          return {...state, ingredients: ingredients};
        }
    }
})
export const { SET_BUN, ADD_INGREDIENT, DELETE_INGREDIENT, SWAP_INGREDIENT} = constructorSlice.actions

export default constructorSlice