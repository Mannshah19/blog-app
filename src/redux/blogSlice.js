import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:3001/blogs'

export const fetchBlogs = createAsyncThunk('blogs/fetch', async () => (await axios.get(API)).data)
export const addBlog = createAsyncThunk('blogs/add', async (blog) => (await axios.post(API, blog)).data)
export const updateBlog = createAsyncThunk('blogs/update', async ({ id, ...rest }) =>
  (await axios.put(`${API}/${id}`, { id, ...rest })).data,
)
export const deleteBlog = createAsyncThunk('blogs/delete', async (id) => {
  await axios.delete(`${API}/${id}`)
  return id
})

const blogSlice = createSlice({
  name: 'blogs',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (s) => { s.status = 'loading'; s.error = null })
      .addCase(fetchBlogs.fulfilled, (s, a) => { s.status = 'succeeded'; s.items = a.payload })
      .addCase(fetchBlogs.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message })
      .addCase(addBlog.fulfilled, (s, a) => { s.items.push(a.payload) })
      .addCase(updateBlog.fulfilled, (s, a) => {
        s.items = s.items.map((b) => (b.id === a.payload.id ? a.payload : b))
      })
      .addCase(deleteBlog.fulfilled, (s, a) => { s.items = s.items.filter((b) => b.id !== a.payload) })
  },
})

export default blogSlice.reducer
