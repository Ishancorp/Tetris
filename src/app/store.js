import { configureStore } from '@reduxjs/toolkit'
import scoreReducer from './reducer/scoreSlice'

export default configureStore({
  reducer: {
    score: scoreReducer
  },
})
