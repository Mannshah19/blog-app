import { motion } from 'framer-motion'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import BlogCard from './BlogCard.jsx'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }

export default function BlogList({ blogs }) {
  if (!blogs.length) {
    return <div className="empty"><HiMagnifyingGlass size={28} /><p className="mb-0 mt-2">No blogs match. Clear the filters or try another keyword.</p></div>
  }
  return (
    <motion.div className="row g-4" variants={container} initial="hidden" animate="show" key={blogs.map((b) => b.id).join()}>
      {blogs.map((b) => (
        <div key={b.id} className="col-12 col-md-6 col-lg-4"><BlogCard blog={b} /></div>
      ))}
    </motion.div>
  )
}
