import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Trash2 } from 'lucide-react'
import { fetchAllTodos } from '@/services/fetch'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  useEffect(() => {
    async function fetchData() {
      await fetchAllTodos()
    }

    fetchData()
  }, [])

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Todo List</h2>
        </div>
        <div className='mt-8 space-y-6'>
          <div className='flex'>
            <Input
              type='text'
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
              placeholder='Add a new todo'
              className='flex-grow mr-2'
            />
            <Button onClick={addTodo}>Add</Button>
          </div>
          <ul className='space-y-3'>
            {todos.map(todo => (
              <li
                key={todo.id}
                className='flex items-center justify-between p-3 bg-white shadow-sm rounded-lg'
              >
                <div className='flex items-center'>
                  <Checkbox
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    className='mr-3'
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`text-sm ${
                      todo.completed ? 'line-through text-gray-500' : 'text-gray-700'
                    }`}
                  >
                    {todo.text}
                  </label>
                </div>
                <Button
                  variant='ghost'
                  onClick={() => removeTodo(todo.id)}
                  className='text-gray-500 hover:text-red-500'
                >
                  <Trash2 className='h-4 w-4' />
                  <span className='sr-only'>Remove todo</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
