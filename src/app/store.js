import { configureStore } from '@reduxjs/toolkit'
import scoreReducer from './reducer/scoreSlice'
import rowsReducer from './reducer/rowsSlice'
import pauseReducer from './reducer/pauseSlice'

export default configureStore({
  reducer: {
    score: scoreReducer,
    rows: rowsReducer,
    pause: pauseReducer,
  },
})
