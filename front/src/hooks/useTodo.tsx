import { Todo } from '@/interfaces'
import { fetchAllTodos } from '@/services/todo'
import { useEffect, useState } from 'react'

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isEditingTodo, setIsEditingTodo] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const todosFetched = await fetchAllTodos()
      setTodos(todosFetched)
    }

    fetchData()
  }, [])

  return { todos, setIsEditingTodo, isEditingTodo }
}
