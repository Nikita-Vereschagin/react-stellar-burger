import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState: number = 0

const orderSlice = createSlice({
    name: 'ORDER',
    initialState,
    reducers: {
        SET_ORDER_NUMBER: (state, action: PayloadAction<number>) => {
                return state = action.payload
            }
        }
})
export const { SET_ORDER_NUMBER } = orderSlice.actions

type TOrderActionCreators = typeof orderSlice.actions

export type TOrderDetailsActions = ReturnType<TOrderActionCreators[keyof TOrderActionCreators]>

export default orderSlice