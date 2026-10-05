import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BlogCard from '../components/BlogCard.jsx'
import { catColor, formatDate } from '../utils/blogUtils.js'

export default function BlogDetails() {
  const { id } = useParams()
  const { items, status } = useSelector((s) => s.blogs)
  const blog = items.find((b) => b.id === id)

  if (!blog) {
    return <div className="empty">{status === 'succeeded' ? 'This blog does not exist.' : 'Loading…'} <Link to="/blogs">Back to blogs</Link></div>
  }
  const related = items.filter((b) => b.category === blog.category && b.id !== blog.id && b.status === 'published').slice(0, 3)

  return (
    <article className="mx-auto" style={{ maxWidth: 760 }}>
      <Link to="/blogs" className="small">‹ All blogs</Link>
      <div className="mt-3 d-flex gap-2 align-items-center">
        <span className="cat-sticker static" style={{ background: catColor(blog.category) }}>{blog.category}</span>
        {blog.status === 'draft' && <span className="pill pill-draft static">Draft</span>}
      </div>
      <h1 className="display-6 hero-title my-2">{blog.title}</h1>
      <p className="lead text-muted">{blog.description}</p>
      <div className="meta mb-4">{blog.author} · <a href={`mailto:${blog.email}`}>{blog.email}</a> · {formatDate(blog.publishDate)}</div>
      <img src={blog.image} alt="" className="detail-img" />
      <div className="reading mt-4">{blog.content.split(/\n+/).map((p, i) => <p key={i}>{p}</p>)}</div>
      <div className="d-flex flex-wrap gap-2 my-4">{blog.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
      <Link to={`/admin/edit/${blog.id}`} className="btn btn-sticker btn-sm">Edit this blog</Link>
      {related.length > 0 && (
        <section className="mt-5" style={{ maxWidth: 'none' }}>
          <h2 className="h5 mb-3">More in {blog.category}</h2>
          <div className="row g-4">{related.map((b) => <div key={b.id} className="col-md-6 col-lg-4"><BlogCard blog={b} /></div>)}</div>
        </section>
      )}
    </article>
  )
}
