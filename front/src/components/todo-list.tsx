import { Todo } from '@/interfaces'
import { Pencil, Trash2 } from 'lucide-react'
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
import { Textarea } from '@/components/ui/textarea'

export function TodoList() {
  const { todos, removeTodo, editTodo } = useTodo()
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  return (
    <>
      {typeof todos.length === 'undefined' && (
        <p className='text-2xl text-center opacity-30'>No hay Tareas</p>
      )}
      <ul className='space-y-3'>
        {todos.length &&
          todos?.map(todo => (
            <li
              key={todo.id}
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
              <div>
                <Button
                  variant='ghost'
                  onClick={() => setEditingTodo(todo)}
                  className='text-gray-500 hover:text-red-500'
                >
                  <Pencil className='h-4 w-4' />
                  <span className='sr-only'>Editar tarea</span>
                </Button>
                <Button
                  variant='ghost'
                  onClick={() => removeTodo(todo.id)}
                  className='text-gray-500 hover:text-red-500'
                >
                  <Trash2 className='h-4 w-4' />
                  <span className='sr-only'>Eliminar tarea</span>
                </Button>
              </div>
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
                onChange={e =>
                  setEditingTodo(prevState => {
                    if (prevState) {
                      return { ...prevState, title: e.target.value }
                    } else {
                      return { id: 0, description: '', title: e.target.value, completed: false }
                    }
                  })
                }
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
                onChange={e =>
                  setEditingTodo(prevState => {
                    if (prevState) {
                      return { ...prevState, description: e.target.value }
                    } else {
                      return { id: 0, description: '', title: e.target.value, completed: false }
                    }
                  })
                }
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                editTodo({
                  id: editingTodo?.id,
                  todo: { title: editingTodo?.title, description: editingTodo?.description }
                })
                setEditingTodo(null)
              }}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
