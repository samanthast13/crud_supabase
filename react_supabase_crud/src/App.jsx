import { useEffect, useState } from 'react'
import { listItems, createItem, updateItem, deleteItem } from './api'
import ItemForm from './ItemForm.jsx'

export default function App() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const run = async (fn) => {
    setError('')
    try { return await fn() } catch (e) { setError(e.message) }
  }

  useEffect(() => {
    run(async () => setItems(await listItems())).finally(() => setLoading(false))
  }, [])

  const handleSave = (values) => run(async () => {
    if (editing) {
      const updated = await updateItem(editing.id, values)
      setItems((xs) => xs.map((x) => (x.id === updated.id ? updated : x)))
      setEditing(null)
    } else {
      const created = await createItem(values)
      setItems((xs) => [created, ...xs])
    }
  })

  const toggleDone = (item) => run(async () => {
    const updated = await updateItem(item.id, { done: !item.done })
    setItems((xs) => xs.map((x) => (x.id === updated.id ? updated : x)))
  })

  const handleDelete = (item) => {
    if (!confirm(`¿Eliminar "${item.title}"?`)) return
    run(async () => {
      await deleteItem(item.id)
      setItems((xs) => xs.filter((x) => x.id !== item.id))
      if (editing?.id === item.id) setEditing(null)
    })
  }

  return (
    <main className="container">
      <h1>CRUD con React + Supabase</h1>
      {error && <p className="error">{error}</p>}

      <ItemForm key={editing?.id ?? 'new'} initial={editing} onSave={handleSave} onCancel={() => setEditing(null)} />

      {loading ? <p>Cargando…</p> : items.length === 0 ? <p>No hay registros todavía.</p> : (
        <ul className="list">
          {items.map((item) => (
            <li key={item.id} className={item.done ? 'done' : ''}>
              <input type="checkbox" checked={item.done} onChange={() => toggleDone(item)} />
              <div className="info">
                <strong>{item.title}</strong>
                {item.description && <span>{item.description}</span>}
              </div>
              <button onClick={() => setEditing(item)}>Editar</button>
              <button className="danger" onClick={() => handleDelete(item)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
