import z from 'zod'
import { Todo, TodoUpdateAll } from '../interfaces/todo.interface'

const todoSchema = z.object({
  title: z.string({
    invalid_type_error: 'Todo title must be a stirng',
    required_error: 'Todo title is required'
  }),
  description: z.string({ invalid_type_error: 'Todo description must be a strign' }).optional(),
  completed: z.boolean().default(false)
})

const todoUpdateSchema = z.object({
  completed: z.boolean()
})

const todoUpdateAllSchema = z.object({
  title: z
    .string({
      invalid_type_error: 'Todo title must be a stirng'
    })
    .optional(),
  description: z.string({ invalid_type_error: 'Todo description must be a strign' }).optional()
})

export function validateTodo(input: Todo) {
  return todoSchema.safeParse(input)
}

export function validateUpdateTodo(input: boolean) {
  return todoUpdateSchema.safeParse(input)
}

export function validateTodoUpdateAllSchema(input: TodoUpdateAll) {
  return todoUpdateAllSchema.safeParse(input)
}
