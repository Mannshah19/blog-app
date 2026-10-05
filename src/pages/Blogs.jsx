import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BlogList from '../components/BlogList.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Pagination from '../components/Pagination.jsx'
import { CATEGORIES, SORTS, applyFilters, loadPref, savePref } from '../utils/blogUtils.js'

const PER_PAGE = 6

export default function Blogs() {
  const { items, status, error } = useSelector((s) => s.blogs)
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  const [category, setCategory] = useState(params.get('category') || '')
  const [sort, setSort] = useState(() => loadPref('blog-sort', 'latest'))
  const [page, setPage] = useState(1)

  useEffect(() => { savePref('blog-sort', sort) }, [sort])
  const reset = (setter) => (v) => { setter(v); setPage(1) }

  const filtered = useMemo(() => applyFilters(items, { q, category, sort, status: 'published' }), [items, q, category, sort])
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <>
      <h1 className="h2 mb-4">All blogs</h1>
      <div className="row g-2 mb-4">
        <div className="col-lg-5"><SearchBar value={q} onChange={reset(setQ)} /></div>
        <div className="col-6 col-lg-3">
          <select className="form-select" aria-label="Category" value={category} onChange={(e) => reset(setCategory)(e.target.value)}>
            <option value="">All categories</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-6 col-lg-3">
          <select className="form-select" aria-label="Sort" value={sort} onChange={(e) => reset(setSort)(e.target.value)}>
            {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>
      {status === 'loading' && <div className="empty">Loading blogs…</div>}
      {status === 'failed' && <div className="alert alert-danger">Could not load blogs ({error}). Run <code>npm run server</code>.</div>}
      {status === 'succeeded' && (
        <>
          <p className="text-muted small">{filtered.length} result{filtered.length === 1 ? '' : 's'}</p>
          <BlogList blogs={visible} />
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </>
  )
}
