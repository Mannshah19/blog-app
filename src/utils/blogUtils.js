export const CATEGORIES = ['Technology', 'Backend', 'Design', 'DevOps', 'Data Science', 'Mobile', 'Security', 'Cloud']

export const SORTS = [
  { value: 'latest', label: 'Latest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'az', label: 'Title A–Z' },
  { value: 'za', label: 'Title Z–A' },
]

export const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''

export function applyFilters(blogs, { q = '', category = '', status = '', sort = 'latest' }) {
  const term = q.trim().toLowerCase()
  const list = blogs.filter(
    (b) =>
      (!term || b.title.toLowerCase().includes(term) || b.author.toLowerCase().includes(term)) &&
      (!category || b.category === category) &&
      (!status || b.status === status),
  )
  const sorters = {
    latest: (a, b) => new Date(b.publishDate) - new Date(a.publishDate),
    oldest: (a, b) => new Date(a.publishDate) - new Date(b.publishDate),
    az: (a, b) => a.title.localeCompare(b.title),
    za: (a, b) => b.title.localeCompare(a.title),
  }
  return [...list].sort(sorters[sort])
}

export const loadPref = (key, fallback) => {
  try { return localStorage.getItem(key) ?? fallback } catch { return fallback }
}
export const savePref = (key, value) => {
  try { localStorage.setItem(key, value) } catch { /* storage unavailable */ }
}

export const CAT_COLORS = {
  Technology: '#8b6cff', Backend: '#ff6b6b', Design: '#ffd23f', DevOps: '#2ec4b6',
  'Data Science': '#ff9f1c', Mobile: '#5bc0ff', Security: '#b8f35a', Cloud: '#ff8fd8',
}
export const catColor = (c) => CAT_COLORS[c] || '#d9d4ff'
