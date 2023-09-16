import { configureStore } from '@reduxjs/toolkit'
import contReducer from './reducer/contSlice'
import gridReducer from './reducer/gridSlice'
import statsReducer from './reducer/statsSlice'

export default configureStore({
  reducer: {
    cont: contReducer,
    grid: gridReducer,
    stats: statsReducer,
  },
})
