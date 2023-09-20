import { configureStore } from '@reduxjs/toolkit'
import contReducer from './reducer/contSlice'
import statsReducer from './reducer/statsSlice'
import blockReducer from './reducer/blockSlice'

export default configureStore({
  reducer: {
    cont: contReducer,
    stats: statsReducer,
    block: blockReducer,
  },
})
