import { configureStore } from '@reduxjs/toolkit'
import scoreReducer from './reducer/scoreSlice'
import rowsReducer from './reducer/rowsSlice'

export default configureStore({
  reducer: {
    score: scoreReducer,
    rows: rowsReducer,
  },
})
