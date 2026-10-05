import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatDate, catColor } from '../utils/blogUtils.js'

const cardVariants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }

export default function BlogCard({ blog }) {
  const { id, title, author, category, image, description, tags = [], publishDate, status } = blog
  return (
    <motion.article
      className="blog-card h-100"
      variants={cardVariants}
      whileHover={{ x: -4, y: -4, boxShadow: '9px 9px 0 #17142a' }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Link to={`/blogs/${id}`} className="blog-card-img" style={{ background: catColor(category) }}>
        <img src={image} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.visibility = 'hidden' }} />
        <span className="cat-sticker" style={{ background: catColor(category) }}>{category}</span>
        {status === 'draft' && <span className="pill pill-draft">Draft</span>}
      </Link>
      <div className="p-3 d-flex flex-column gap-2 flex-grow-1">
        <h3 className="h5 mb-0"><Link to={`/blogs/${id}`}>{title}</Link></h3>
        <p className="small mb-0 text-secondary">{description}</p>
        <div className="d-flex flex-wrap gap-1 mt-1">
          {tags.slice(0, 3).map((t) => <span key={t} className="tag">#{t}</span>)}
        </div>
        <div className="meta mt-auto pt-2">{author} · {formatDate(publishDate)}</div>
      </div>
    </motion.article>
  )
}
