import {createSlice} from '@reduxjs/toolkit'

export const inboxSlice = createSlice({
    name: 'inboxSlice',
    initialState: {
        inbox: false
    },


    reducers: {
        inbox: (state, action) => {
            return {
                ...action.payload,
            }
        },


    }
})

export const {inbox} = inboxSlice.actions

export default inboxSlice.reducer