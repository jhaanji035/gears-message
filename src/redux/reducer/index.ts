import { MessageState, messageReducer } from './messageReducer'

export interface MainState {
    messages: MessageState
}

 const reducer = {
    messages: messageReducer,
  }
export default reducer
