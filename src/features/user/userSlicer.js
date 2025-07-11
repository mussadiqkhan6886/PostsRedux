import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: 1, name: "John"},
    {id: 2, name: "Max"},
    {id: 3, name: "Adam"}
]

const userSlicer = createSlice({
    name: "user",
    initialState,
    reducers: {
        
    }
})

export const selectAll = state => state.user

export default userSlicer.reducer