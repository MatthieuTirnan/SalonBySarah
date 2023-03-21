import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {

        isAdmin: false,

        isMatch: false
    },


    reducers: {
        user: (state, action) => {
            return {
                ...action.payload,
            }
        },


    }
})

export const {user} = userSlice.actions

export default userSlice.reducer