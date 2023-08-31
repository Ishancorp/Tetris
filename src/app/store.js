import { configureStore } from '@reduxjs/toolkit'
import scoreReducer from './reducer/scoreReducer'

export default configureStore({
  reducer: {
    score: scoreReducer
  },
})
