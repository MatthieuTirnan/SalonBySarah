import {createSlice} from '@reduxjs/toolkit'

export const articleSLice = createSlice({
    name: 'articleSLice',
    initialState: {
        "article": false
    },


    reducers: {
        article: (state, action) => {
            return {
                ...action.payload,
            }
        },


    }
})

export const {article} = articleSLice.actions

export default articleSLice.reducer