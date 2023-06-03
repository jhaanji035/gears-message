import { createAction, createReducer } from '@reduxjs/toolkit'
import { stat } from 'fs'
import { act } from 'react-dom/test-utils'
import { MESSAGE_LOAD } from '../actions'

export interface MessageState {
    list: any
}
const initialState: MessageState = {
    list: {}
}
const loadMessage = createAction(MESSAGE_LOAD)


export const messageReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loadMessage, (state, action) => {
            return {
                ...state, 
                list: [action.payload]
            }
        })
})