export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null
  const go = (p) => { onChange(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  return (
    <nav aria-label="Pagination" className="mt-4">
      <ul className="pagination justify-content-center flex-wrap mb-0">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => go(page - 1)}>Previous</button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => go(p)} aria-current={p === page ? 'page' : undefined}>{p}</button>
          </li>
        ))}
        <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => go(page + 1)}>Next</button>
        </li>
      </ul>
    </nav>
  )
}
