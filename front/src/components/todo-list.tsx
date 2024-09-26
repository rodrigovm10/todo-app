import { Trash2 } from 'lucide-react'
import { useTodo } from '@/hooks/useTodo'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Todo } from '@/interfaces'
import { Textarea } from './ui/textarea'

export function TodoList() {
  const { todos } = useTodo()
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  return (
    <>
      <ul className='space-y-3'>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => setEditingTodo(todo)}
            className='flex items-center justify-between p-3 bg-white shadow-sm rounded-lg'
          >
            <div className='flex items-center'>
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.completed}
                // onCheckedChange={() => toggleTodo(todo.id)}
                className='mr-3'
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`text-sm ${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-700'
                }`}
              >
                {todo.title}
              </label>
            </div>
            <Button
              variant='ghost'
              // onClick={() => removeTodo(todo.id)}
              className='text-gray-500 hover:text-red-500'
            >
              <Trash2 className='h-4 w-4' />
              <span className='sr-only'>Remove todo</span>
            </Button>
          </li>
        ))}
      </ul>
      <Dialog
        open={editingTodo !== null}
        onOpenChange={() => setEditingTodo(null)}
      >
        {' '}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Todo</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label
                htmlFor='title'
                className='text-right'
              >
                Título
              </Label>
              <Input
                id='title'
                defaultValue={editingTodo?.title}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label
                htmlFor='description'
                className='text-right'
              >
                Descripción
              </Label>
              <Textarea
                id='description'
                defaultValue={editingTodo?.description}
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
