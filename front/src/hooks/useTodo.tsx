import { Todo, CreateTodo, UpdateTodo } from '@/interfaces'
import { fetchAllTodos, createTodo, deleteTodo, updateTodo, updateCompleted } from '@/services/todo'
import { useCallback, useEffect, useState } from 'react'

const NEW_TODO_STATE = { title: '', description: '' }

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isEditingTodo, setIsEditingTodo] = useState(false)
  const [newTodo, setNewTodo] = useState<CreateTodo>(NEW_TODO_STATE)

  const fetchData = useCallback(async () => {
    const todosFetched = await fetchAllTodos()
    setTodos(todosFetched)
  }, [])

  const onChangeTitle = (title: string) => {
    setNewTodo(prevTodo => ({ ...prevTodo, title }))
  }

  const onChangeDescription = (description: string) => {
    setNewTodo(prevTodo => ({ ...prevTodo, description }))
  }

  const addTodo = useCallback(async () => {
    await createTodo(newTodo)
    setNewTodo(NEW_TODO_STATE)
    await fetchData() // Refresca los todos después de agregar
  }, [newTodo, fetchData])

  const removeTodo = useCallback(
    async (id: number) => {
      await deleteTodo(id)
      await fetchData() // Refresca los todos después de eliminar
    },
    [fetchData]
  )

  const editTodo = useCallback(
    async ({ id, todo }: { id?: number; todo: UpdateTodo }) => {
      if (id) {
        await updateTodo({ id, todo })
        await fetchData() // Refresca los todos después de editar
      }
    },
    [fetchData]
  )

  const toggleTodo = useCallback(
    async ({ id, completed }: { id: number; completed: boolean }) => {
      await updateCompleted({ id, completed })
      await fetchData() // Refresca los todos después de cambiar el estado
    },
    [fetchData]
  )

  useEffect(() => {
    fetchData()
  }, [todos])

  return {
    todos,
    newTodo,
    isEditingTodo,
    setIsEditingTodo,
    addTodo,
    removeTodo,
    editTodo,
    toggleTodo,
    onChangeTitle,
    onChangeDescription
  }
}
