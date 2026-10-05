import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from '../../components/BlogForm.jsx'
import toast from 'react-hot-toast'
import { updateBlog } from '../../redux/blogSlice.js'

export default function EditBlog() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, status } = useSelector((s) => s.blogs)
  const blog = items.find((b) => b.id === id)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  if (!blog) return <div className="empty">{status === 'succeeded' ? 'Blog not found.' : 'Loading…'} <Link to="/admin">Back to dashboard</Link></div>

  const handleSubmit = async (data) => {
    setSaving(true)
    const res = await dispatch(updateBlog({ ...data, id }))
    setSaving(false)
    if (updateBlog.fulfilled.match(res)) { toast.success('Changes saved'); navigate('/admin') }
    else setError('Could not update the blog. Check that the JSON server is running.')
  }

  return (
    <div className="mx-auto" style={{ maxWidth: 820 }}>
      <h1 className="h2 mb-4">Edit blog</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <BlogForm initial={blog} onSubmit={handleSubmit} submitLabel="Save changes" saving={saving} />
    </div>
  )
}
