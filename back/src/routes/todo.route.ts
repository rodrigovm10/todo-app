import { Router } from 'express'
import { TodoController } from '../controllers/todo.controller'

export const todoRouter = Router()

todoRouter.get('/')
todoRouter.post('/', TodoController.create)
todoRouter.get('/', TodoController.getAll)
