import { useTodo } from '@/hooks/useTodo'
import { createContext, ReactNode } from 'react'
import { CreateTodo, Todo, UpdateTodo } from '@/interfaces'

interface TodoContextType {
  todos: Todo[]
  isEditingTodo: boolean
  newTodo: CreateTodo
  addTodo: () => Promise<void>
  removeTodo: (id: number) => Promise<void>
  editTodo: ({ id, todo }: { id?: number; todo: UpdateTodo }) => Promise<void>
  toggleTodo: ({ id, completed }: { id: number; completed: boolean }) => Promise<void>
  onChangeTitle: (title: string) => void
  onChangeDescription: (title: string) => void
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined)

export function TodoProvider({ children }: { children: ReactNode }) {
  const {
    todos,
    isEditingTodo,
    newTodo,
    addTodo,
    removeTodo,
    editTodo,
    toggleTodo,
    onChangeDescription,
    onChangeTitle
  } = useTodo()

  return (
    <TodoContext.Provider
      value={{
        todos,
        isEditingTodo,
        newTodo,
        addTodo,
        removeTodo,
        editTodo,
        toggleTodo,
        onChangeDescription,
        onChangeTitle
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
