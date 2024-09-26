export interface Todo {
  id: number
  title: string
  description?: string
  completed: boolean
}

export interface CreateTodo {
  title: string
  description?: string
}
