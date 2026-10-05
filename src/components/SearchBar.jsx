export default function SearchBar({ value, onChange, placeholder = 'Search by title or author' }) {
  return (
    <input
      type="search"
      className="form-control"
      aria-label="Search blogs"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
