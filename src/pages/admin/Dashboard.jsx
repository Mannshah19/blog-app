import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { HiCheckCircle, HiPencilSquare, HiPencil, HiEye, HiSquares2X2, HiPlus, HiTrash } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../../components/SearchBar.jsx'
import Pagination from '../../components/Pagination.jsx'
import { deleteBlog } from '../../redux/blogSlice.js'
import { CATEGORIES, SORTS, applyFilters, formatDate } from '../../utils/blogUtils.js'

const PER_PAGE = 8

export default function Dashboard() {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((s) => s.blogs)
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [blogStatus, setBlogStatus] = useState('')
  const [sort, setSort] = useState('latest')
  const [page, setPage] = useState(1)

  const reset = (setter) => (v) => { setter(v); setPage(1) }

  const published = items.filter((b) => b.status === 'published').length
  const filtered = useMemo(() => applyFilters(items, { q, category, status: blogStatus, sort }), [items, q, category, blogStatus, sort])
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleDelete = async (b) => {
    if (!window.confirm(`Delete "${b.title}"? This cannot be undone.`)) return
    const res = await dispatch(deleteBlog(b.id))
    if (deleteBlog.fulfilled.match(res)) toast.success('Blog deleted')
    else toast.error('Could not delete the blog')
  }

  const stats = [
    { label: 'Total blogs', value: items.length, color: '#8b6cff', Icon: HiSquares2X2 },
    { label: 'Published', value: published, color: '#2ec4b6', Icon: HiCheckCircle },
    { label: 'Drafts', value: items.length - published, color: '#ffd23f', Icon: HiPencil },
  ]

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h1 className="h2 mb-0">Dashboard</h1>
        <Link to="/admin/add-blog" className="btn btn-sticker btn-yellow"><HiPlus /> Add blog</Link>
      </div>
      {status === 'failed' && <div className="alert alert-danger">Could not load blogs ({error}). Run <code>npm run server</code>.</div>}

      <div className="row g-3 mb-4">
        {stats.map((s) => (
          <div key={s.label} className="col-4">
            <div className="stat" style={{ background: s.color }}>
              <s.Icon className="stat-icon" size={26} />
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-2 mb-3">
        <div className="col-lg-4"><SearchBar value={q} onChange={reset(setQ)} /></div>
        <div className="col-6 col-lg-2">
          <select className="form-select" aria-label="Category" value={category} onChange={(e) => reset(setCategory)(e.target.value)}>
            <option value="">All categories</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-6 col-lg-2">
          <select className="form-select" aria-label="Status" value={blogStatus} onChange={(e) => reset(setBlogStatus)(e.target.value)}>
            <option value="">Any status</option><option value="published">Published</option><option value="draft">Draft</option>
          </select>
        </div>
        <div className="col-12 col-lg-3">
          <select className="form-select" aria-label="Sort" value={sort} onChange={(e) => reset(setSort)(e.target.value)}>
            {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      <div className="panel p-0 table-responsive">
        <table className="table align-middle mb-0">
          <thead><tr><th>Title</th><th>Author</th><th>Category</th><th>Date</th><th>Status</th><th className="text-end">Actions</th></tr></thead>
          <tbody>
            {visible.map((b) => (
              <tr key={b.id}>
                <td className="fw-medium"><Link to={`/blogs/${b.id}`} title="View"><HiEye className="me-1" />{b.title}</Link></td>
                <td>{b.author}</td>
                <td>{b.category}</td>
                <td className="text-nowrap">{formatDate(b.publishDate)}</td>
                <td><span className={`pill static ${b.status === 'draft' ? 'pill-draft' : 'pill-ok'}`}>{b.status === 'draft' ? 'Draft' : 'Published'}</span></td>
                <td className="text-end text-nowrap">
                  <Link to={`/admin/edit/${b.id}`} className="btn btn-sm btn-outline-primary me-1"><HiPencilSquare /> Edit</Link>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(b)}><HiTrash /> Delete</button>
                </td>
              </tr>
            ))}
            {!visible.length && <tr><td colSpan="6" className="text-center text-muted py-5">No blogs found. Change the filters or add a new blog.</td></tr>}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </>
  )
}
