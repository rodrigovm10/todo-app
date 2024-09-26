export interface Todo {
  title: string
  description?: string
  completed: boolean
}

export interface TodoUpdate {
  id: number
  completed: boolean
}