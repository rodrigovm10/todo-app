import { Router } from 'express'
import { TodoController } from '../controllers/todo.controller'

export const todoRouter = Router()

todoRouter.get('/', TodoController.getAll)
todoRouter.get('/:id', TodoController.getOne)
todoRouter.post('/', TodoController.create)
todoRouter.patch('/:id', TodoController.updateCompleted)
todoRouter.put('/:id', TodoController.updateAllTodo)
todoRouter.delete('/:id', TodoController.delete)
