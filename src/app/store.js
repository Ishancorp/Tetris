import { configureStore } from '@reduxjs/toolkit'
import pauseReducer from './reducer/pauseSlice'
import gridReducer from './reducer/gridSlice'
import statsReducer from './reducer/statsSlice'

export default configureStore({
  reducer: {
    pause: pauseReducer,
    grid: gridReducer,
    stats: statsReducer,
  },
})
