import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HiBars3, HiPlus, HiXMark } from 'react-icons/hi2'

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <header className="site-header">
      <nav className="container d-flex align-items-center justify-content-between py-3">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark">B</span>BlogHub
        </Link>
        <button className="btn btn-sticker d-md-none px-2 py-1" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <HiXMark size={20} /> : <HiBars3 size={20} />}
        </button>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/blogs" onClick={close}>Blogs</NavLink>
          <NavLink to="/admin" end onClick={close}>Dashboard</NavLink>
          <Link to="/admin/add-blog" className="btn btn-sticker btn-yellow" onClick={close}><HiPlus /> Write a blog</Link>
        </div>
      </nav>
    </header>
  )
}
