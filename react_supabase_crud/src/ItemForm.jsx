import { useState } from 'react'

export default function ItemForm({ initial, onSave, onCancel }) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')

  const submit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    await onSave({ title: title.trim(), description: description.trim() || null })
    if (!initial) { setTitle(''); setDescription('') }
  }

  return (
    <form onSubmit={submit} className="form">
      <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">{initial ? 'Guardar' : 'Agregar'}</button>
      {initial && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  )
}
