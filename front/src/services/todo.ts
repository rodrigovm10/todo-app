import { CreateTodo, UpdateTodo } from '@/interfaces'

export const fetchAllTodos = async () => {
  const result = await fetch('http://localhost:4000/todo')
  const data = await result.json()

  return data
}

export const fetchTodoById = async (id: number) => {
  const result = await fetch(`http://localhost:4000/todo/${id}`)
  const data = await result.json()

  return data
}

export const createTodo = async (todo: CreateTodo) => {
  const result = await fetch(`http://localhost:4000/todo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })

  const data = await result.json()
  console.log(data)
}

export const deleteTodo = async (id: number) => {
  const result = await fetch(`http://localhost:4000/todo/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await result.json()
  console.log(data)
}

export const updateTodo = async ({ id, todo }: { id: number; todo: UpdateTodo }) => {
  const result = await fetch(`http://localhost:4000/todo/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  console.log(todo)
  const data = await result.json()
  console.log(data)
}

export const updateCompleted = async ({ id, completed }: { id: number; completed: boolean }) => {
  const result = await fetch(`http://localhost:4000/todo/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ completed })
  })
  const data = await result.json()
  console.log(data)
}
