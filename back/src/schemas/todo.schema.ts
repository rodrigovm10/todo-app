import z from 'zod'
import { Todo } from '../interfaces/todo.interface'

const todoSchema = z.object({
  title: z.string({
    invalid_type_error: 'Todo title must be a stirng',
    required_error: 'Todo title is required'
  }),
  description: z.string({ invalid_type_error: 'Todo description must be a strign' }).optional(),
  completed: z.boolean().default(false)
})

export function validateTodo(input: Todo) {
  return todoSchema.safeParse(input)
}
