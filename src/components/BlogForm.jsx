import { useState } from 'react'
import { CATEGORIES } from '../utils/blogUtils.js'

const EMPTY = {
  title: '', author: '', email: '', category: '', image: '', description: '',
  content: '', tags: '', publishDate: new Date().toISOString().slice(0, 10), status: 'published',
}

function validate(v) {
  const e = {}
  if (v.title.trim().length < 5) e.title = 'Title must be at least 5 characters.'
  if (!v.author.trim()) e.author = 'Enter the author name.'
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email address.'
  if (!v.category) e.category = 'Choose a category.'
  if (!/^https?:\/\/.+/i.test(v.image)) e.image = 'Enter an image URL starting with http:// or https://.'
  if (v.description.trim().length < 20) e.description = 'Description must be at least 20 characters.'
  if (v.content.trim().length < 50) e.content = 'Content must be at least 50 characters.'
  if (!v.tags.split(',').some((t) => t.trim())) e.tags = 'Add at least one tag, separated by commas.'
  if (!v.publishDate) e.publishDate = 'Pick a publish date.'
  return e
}

export default function BlogForm({ initial, onSubmit, submitLabel = 'Save blog', saving }) {
  const [values, setValues] = useState(() =>
    initial ? { ...EMPTY, ...initial, tags: (initial.tags || []).join(', ') } : EMPTY,
  )
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return
    onSubmit({
      ...values,
      title: values.title.trim(),
      tags: values.tags.split(',').map((t) => t.trim()).filter(Boolean),
    })
  }

  const field = (name, label, props = {}, as = 'input') => {
    const Tag = as
    return (
      <div className={props.col || 'col-12'}>
        <label htmlFor={name} className="form-label">{label}</label>
        <Tag
          id={name}
          name={name}
          value={values[name]}
          onChange={handleChange}
          className={`${as === 'select' ? 'form-select' : 'form-control'} ${errors[name] ? 'is-invalid' : ''}`}
          {...props.attrs}
        >
          {props.children}
        </Tag>
        {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="panel">
      <div className="row g-3">
        {field('title', 'Blog title', { col: 'col-12', attrs: { type: 'text', placeholder: 'Getting started with React' } })}
        {field('author', 'Author', { col: 'col-md-6', attrs: { type: 'text' } })}
        {field('email', 'Email', { col: 'col-md-6', attrs: { type: 'email' } })}
        {field('category', 'Category', {
          col: 'col-md-4',
          children: [<option key="" value="">Select category</option>, ...CATEGORIES.map((c) => <option key={c}>{c}</option>)],
        }, 'select')}
        {field('publishDate', 'Publish date', { col: 'col-md-4', attrs: { type: 'date' } })}
        {field('status', 'Status', {
          col: 'col-md-4',
          children: [<option key="p" value="published">Published</option>, <option key="d" value="draft">Draft</option>],
        }, 'select')}
        {field('image', 'Image URL', { attrs: { type: 'url', placeholder: 'https://images.unsplash.com/...' } })}
        {values.image && /^https?:\/\//i.test(values.image) && (
          <div className="col-12"><img src={values.image} alt="Cover preview" className="form-preview" onError={(e) => { e.currentTarget.style.display = 'none' }} /></div>
        )}
        {field('description', 'Short description', { attrs: { rows: 2 } }, 'textarea')}
        {field('content', 'Content', { attrs: { rows: 8 } }, 'textarea')}
        {field('tags', 'Tags', { attrs: { type: 'text', placeholder: 'React, JavaScript, Frontend' } })}
      </div>
      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-sticker btn-yellow" disabled={saving}>{saving ? 'Saving…' : submitLabel}</button>
        <button type="button" className="btn btn-sticker" onClick={() => history.back()}>Cancel</button>
      </div>
    </form>
  )
}
