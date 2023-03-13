import {createSlice} from '@reduxjs/toolkit'

export const listAdminSlice = createSlice({
    name: 'listAdminSlice',
    initialState:
        false
    ,


    reducers: {
        listAdmin: (state, action) => {
            return {
                ...action.payload,
            }
        },


    }
})

export const {listAdmin} = listAdminSlice.actions

export default listAdminSlice.reducer