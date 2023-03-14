import {createSlice} from '@reduxjs/toolkit'

export const listUsersSlice = createSlice({
    name: 'listUsersSlice',
    initialState: {
        listUsers: false
    },


    reducers: {
        listUsers: (state, action) => {
            return {
                ...action.payload,
            }
        },


    }
})

export const {listUsers} = listUsersSlice.actions

export default listUsersSlice.reducer