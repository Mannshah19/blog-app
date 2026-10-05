import { Link } from 'react-router-dom'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container d-flex flex-column flex-md-row justify-content-between gap-2 py-4">
        <span className="brand-sm">BlogHub <span className="text-white-50 fw-normal">Blog Management System</span></span>
        <span className="d-flex gap-3">
          <Link to="/blogs">Blogs</Link>
          <Link to="/admin">Dashboard</Link>
          <span className="text-white-50">© {YEAR}</span>
        </span>
      </div>
    </footer>
  )
}
