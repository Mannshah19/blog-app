import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blogSlice.js'

const store = configureStore({ reducer: { blogs: blogReducer } })
export default store
