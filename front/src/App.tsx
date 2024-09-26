import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TodoList } from './components/todo-list'
import { Textarea } from './components/ui/textarea'

import { createTodo } from './services/todo'
import { CreateTodo } from './interfaces'

export default function App() {
  const [newTodo, setNewTodo] = useState<CreateTodo>({ title: '', description: '' })

  const addTodo = async () => {
    await createTodo(newTodo)
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Todo List</h2>
        </div>
        <div className='mt-8 space-y-6'>
          <div className='flex flex-col gap-y-3'>
            <Input
              type='text'
              value={newTodo.title}
              onChange={e => setNewTodo(prevTodo => ({ ...prevTodo, title: e.target.value }))}
              placeholder='Añade un título'
              className='flex-grow mr-2'
            />
            <Textarea
              placeholder='Añade una descripción (opcional)'
              onChange={e => setNewTodo(prevTodo => ({ ...prevTodo, description: e.target.value }))}
              className='w-full'
            />
            <Button onClick={addTodo}>Añadir</Button>
          </div>
          <TodoList />
        </div>
      </div>
    </div>
  )
}
