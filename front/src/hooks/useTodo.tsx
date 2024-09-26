import { Todo, CreateTodo, UpdateTodo } from '@/interfaces'
import { fetchAllTodos, createTodo, deleteTodo, updateTodo, updateCompleted } from '@/services/todo'
import { useEffect, useState } from 'react'

const NEW_TODO_STATE = { title: '', description: '' }

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isEditingTodo, setIsEditingTodo] = useState(false)
  const [newTodo, setNewTodo] = useState<CreateTodo>(NEW_TODO_STATE)

  const addTodo = async () => {
    await createTodo(newTodo)
    setNewTodo(NEW_TODO_STATE)
  }

  const removeTodo = async (id: number) => {
    await deleteTodo(id)
  }

  const editTodo = async ({ id, todo }: { id?: number; todo: UpdateTodo }) => {
    if (id) {
      await updateTodo({ id, todo })
    }
  }

  const toggleTodo = async ({ id, completed }: { id: number; completed: boolean }) => {
    await updateCompleted({ id, completed })
  }

  useEffect(() => {
    async function fetchData() {
      const todosFetched = await fetchAllTodos()
      setTodos(todosFetched)
    }

    fetchData()
  }, [addTodo, removeTodo, editTodo])

  return {
    todos,
    setIsEditingTodo,
    isEditingTodo,
    addTodo,
    setNewTodo,
    newTodo,
    removeTodo,
    editTodo,
    toggleTodo
  }
}
