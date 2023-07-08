import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'ORDER',
    initialState: null,
    reducers: {
        SET_ORDER_NUMBER: (state, action) => {
                return state = action.payload
            }
        }
})
export const { SET_ORDER_NUMBER } = orderSlice.actions

export default orderSlice