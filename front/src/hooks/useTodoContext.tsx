import { useContext } from 'react'
import { TodoContext } from '@/context/todoContext'

export function useTodoContext() {
  const context = useContext(TodoContext)

  if (context === undefined) {
    throw new Error('useTodoContext debe usarse dentro de un provider')
  }

  return context
}
