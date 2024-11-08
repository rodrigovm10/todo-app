import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useTodoContext } from '@/hooks/useTodoContext'

export function Form() {
  const { newTodo, onChangeDescription, onChangeTitle, addTodo } = useTodoContext()

  return (
    <div className='flex flex-col gap-y-3'>
      <Input
        type='text'
        value={newTodo.title}
        onChange={e => onChangeTitle(e.target.value)}
        placeholder='Añade un título'
        className='flex-grow mr-2'
      />
      <Textarea
        placeholder='Añade una descripción (opcional)'
        value={newTodo.description}
        onChange={e => onChangeDescription(e.target.value)}
        className='w-full'
      />
      <Button onClick={addTodo}>Añadir</Button>
    </div>
  )
}
