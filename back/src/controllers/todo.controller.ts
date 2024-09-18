import { Request, Response } from 'express'
import { validateTodo, validateUpdateTodo } from '../schemas/todo.schema'
import { TodoModel } from '../models/todo.model'

export class TodoController {
  static async getAll(req: Request, res: Response) {
    const result = await TodoModel.getAll()

    if (result.rows.length === 0) {
      return res.status(200).json({ message: 'There is not todos' })
    }

    res.status(200).json(result.rows)
  }

  static async create(req: Request, res: Response) {
    const result = validateTodo(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newTodo = await TodoModel.create({ input: result.data })

    res.status(201).json({ message: 'Todo created!', result: newTodo })
  }

  static async updateTodo(req: Request, res: Response) {
    const { id } = req.params
    const result = validateUpdateTodo(req.body)

    if (!id) {
      return res.status(400).json({ message: 'Todo ID must be in the URL!' })
    }

    if (result.error) {
      return res.status(400).json({ message: 'Todo completed must be' })
    }

    const todoUpdated = await TodoModel.update({
      input: { completed: result.data.completed, id: Number(id) }
    })

    res.status(201).json({ message: 'Todo updated!', result: todoUpdated })
  }
}
