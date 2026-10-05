import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { fetchBlogs } from './redux/blogSlice.js'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Blogs from './pages/Blogs.jsx'
import BlogDetails from './pages/BlogDetails.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import AddBlog from './pages/admin/AddBlog.jsx'
import EditBlog from './pages/admin/EditBlog.jsx'

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => { dispatch(fetchBlogs()) }, [dispatch])

  return (
    <div className="app-shell">
      <Toaster position="top-right" toastOptions={{ style: { border: '3px solid #17142a', boxShadow: '4px 4px 0 #17142a', borderRadius: 12, fontWeight: 600, color: '#17142a' } }} />
      <Header />
      <main className="container py-4 py-lg-5 flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/add-blog" element={<AddBlog />} />
          <Route path="/admin/edit/:id" element={<EditBlog />} />
          <Route path="*" element={<div className="empty">Page not found.</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
