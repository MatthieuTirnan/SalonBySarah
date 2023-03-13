import {createSlice} from '@reduxjs/toolkit'

export const prestationSlice = createSlice({
    name: "prestationSlice",
    initialState: {
        "prestation": false
    },


    reducers: {
        prestation: (state, action) => {
            return {
                ...action.payload,
            }
        },


    }
})

export const {prestation} = prestationSlice.actions

export default prestationSlice.reducer