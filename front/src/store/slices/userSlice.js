import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        pseudo: "",
        email: "",
        isAdmin: false,
        _id: "",
        jwt: "",
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