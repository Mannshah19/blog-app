import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BlogForm from '../../components/BlogForm.jsx'
import toast from 'react-hot-toast'
import { addBlog } from '../../redux/blogSlice.js'

export default function AddBlog() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (data) => {
    setSaving(true)
    const res = await dispatch(addBlog(data))
    setSaving(false)
    if (addBlog.fulfilled.match(res)) { toast.success('Blog added'); navigate('/admin') }
    else setError('Could not save the blog. Check that the JSON server is running.')
  }

  return (
    <div className="mx-auto" style={{ maxWidth: 820 }}>
      <h1 className="h2 mb-4">Add blog</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <BlogForm onSubmit={handleSubmit} submitLabel="Add blog" saving={saving} />
    </div>
  )
}
