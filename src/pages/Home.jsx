import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { HiArrowUpRight, HiMagnifyingGlass } from 'react-icons/hi2'
import SearchBar from '../components/SearchBar.jsx'
import BlogList from '../components/BlogList.jsx'
import { CATEGORIES, applyFilters, catColor, formatDate } from '../utils/blogUtils.js'

export default function Home() {
  const { items, status, error } = useSelector((s) => s.blogs)
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const published = useMemo(() => applyFilters(items, { status: 'published', sort: 'latest' }), [items])
  const [featured, ...rest] = published
  const search = (e) => { e.preventDefault(); navigate(`/blogs?q=${encodeURIComponent(q)}`) }
  const marquee = [...CATEGORIES, ...CATEGORIES]

  return (
    <>
      <section className="row align-items-center g-4 g-lg-5 mb-5">
        <div className="col-lg-6">
          <span className="count-sticker">{published.length || '–'} stories live</span>
          <h1 className="hero-title mt-3">Stories for people who build things.</h1>
          <p className="lead my-3">React, backend, DevOps, design and more, written by developers who ship.</p>
          <form onSubmit={search} className="search-box">
            <HiMagnifyingGlass size={20} />
            <SearchBar value={q} onChange={setQ} />
            <button className="btn btn-sticker btn-yellow">Search</button>
          </form>
        </div>
        <div className="col-lg-6">
          {featured && (
            <motion.div initial={{ opacity: 0, rotate: 4, y: 30 }} animate={{ opacity: 1, rotate: 2, y: 0 }} transition={{ type: 'spring', damping: 14 }}>
              <Link to={`/blogs/${featured.id}`} className="featured" style={{ background: catColor(featured.category) }}>
                <img src={featured.image} alt="" />
                <div className="featured-body">
                  <span className="cat-sticker static">{featured.category}</span>
                  <h2 className="h3 mt-2 mb-1">{featured.title} <HiArrowUpRight /></h2>
                  <span className="meta">{featured.author} · {formatDate(featured.publishDate)}</span>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      <div className="marquee" aria-label="Categories">
        <div className="marquee-track">
          {marquee.map((c, i) => (
            <Link key={i} to={`/blogs?category=${encodeURIComponent(c)}`} className="chip" style={{ background: catColor(c) }}>{c}</Link>
          ))}
        </div>
      </div>

      {status === 'loading' && <div className="empty">Loading blogs…</div>}
      {status === 'failed' && <div className="alert alert-danger">Could not load blogs ({error}). Start the API with <code>npm run server</code>.</div>}

      <div className="d-flex justify-content-between align-items-end my-4">
        <h2 className="mb-0">Fresh off the press</h2>
        <Link to="/blogs" className="fw-bold">All blogs <HiArrowUpRight /></Link>
      </div>
      <BlogList blogs={rest.slice(0, 3)} />
    </>
  )
}
