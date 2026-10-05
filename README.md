# BlogHub – Blog Management System

React + Vite + Redux Toolkit + React Router + Bootstrap 5, with JSON Server as the REST API.

## Features
- **UI:** Bootstrap 5 grid and forms with a custom sticker-style theme, Framer Motion animations, Heroicons (react-icons/hi2) and React Hot Toast.
- **Public:** Home, Blog list (search by title/author, filter by category, sort A–Z / Z–A / Latest / Oldest, pagination), Blog details.
- **Admin:** Dashboard (Total / Published / Drafts), Add, Edit, Delete, search, filter, sort, pagination.
- **Form validation** on every field; **Redux** async thunks (axios) for CRUD; **localStorage** remembers your sort choice.

## Routes
| Path | Page |
|---|---|
| `/` | Home |
| `/blogs` | Blog list |
| `/blogs/:id` | Blog details |
| `/admin` | Dashboard |
| `/admin/add-blog` | Add blog |
| `/admin/edit/:id` | Edit blog |

## Run locally
```bash
npm install
npm run server   # JSON Server on http://localhost:3001
npm run dev      # Vite on http://localhost:5173
```

## Structure
```
src/
├── components/  Header, Footer, BlogCard, BlogList, BlogForm, SearchBar, Pagination
├── pages/       Home, Blogs, BlogDetails, admin/{Dashboard, AddBlog, EditBlog}
├── redux/       store.js, blogSlice.js
├── utils/       blogUtils.js (filter, sort, helpers)
└── App.jsx
db.json
```

## Screenshots
Add screenshots of Home, Blog List, Add/Edit Form, Blog Details, CRUD, Search/Sort/Pagination and Dashboard here.
