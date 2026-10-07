import supabase from './supabase-client'

const TABLE = 'items'

export async function listItems() {
  const { data, error } = await supabase.from(TABLE).select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createItem(item) {
  const { data, error } = await supabase.from(TABLE).insert(item).select().single()
  if (error) throw error
  return data
}

export async function updateItem(id, changes) {
  const { data, error } = await supabase.from(TABLE).update(changes).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteItem(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}
