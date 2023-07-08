import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  ingredients: []
}

const constructorSlice = createSlice({
    name: 'BURGER_CONSTRUCTOR',
    initialState,
    reducers: {
        SET_BUN: (state, action) => {state.bun = action.payload},
        ADD_INGREDIENT: {
          reducer: (state, action) => {state.ingredients = [...state.ingredients, action.payload]}
          
          ,
          prepare: (array) => {
            const id = nanoid()
            return { payload: array = {...array, unicId: id} }
          }
        },
        DELETE_INGREDIENT: (state, action) => {state.ingredients = [...state.ingredients.filter(el => el.unicId !== action.payload )]},
        SWAP_INGREDIENT: (state, action) => {
          const ingredients = [...state.ingredients]
          const {dragIndex, hoverIndex} = action.payload
          ingredients.splice(hoverIndex, 0, ingredients.splice(dragIndex, 1)[0])
          return {...state, ingredients: ingredients};
          //Спасибо, что помогали :) Желаю вам всего хорошего, на конец-то всё заработало
        }
    }
})
export const { SET_BUN, ADD_INGREDIENT, DELETE_INGREDIENT, SWAP_INGREDIENT} = constructorSlice.actions

export default constructorSlice