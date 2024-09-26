import { Request, Response } from 'express'
import {
  validateTodo,
  validateUpdateTodo,
  validateTodoUpdateAllSchema
} from '../schemas/todo.schema'
import { TodoModel } from '../models/todo.model'

export class TodoController {
  static async getAll(req: Request, res: Response) {
    const result = await TodoModel.getAll()

    if (result.rows.length === 0) {
      return res.status(200).json({ message: 'There is not todos' })
    }

    res.status(200).json(result.rows)
  }

  static async getOne(req: Request, res: Response) {
    const { id } = req.params
    const result = await TodoModel.getOne({ input: Number(id) })

    // If rowCount === 0
    if (!result.rowCount) {
      return res.status(200).json({ message: `There is not todo with ID ${id}` })
    }

    res.status(200).json(result.rows)
  }

  static async create(req: Request, res: Response) {
    const result = validateTodo(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    await TodoModel.create({ input: result.data })

    res.status(201).json({ message: 'Todo created!' })
  }

  static async updateCompleted(req: Request, res: Response) {
    const { id } = req.params
    const result = validateUpdateTodo(req.body)

    if (!id) {
      return res.status(400).json({ message: 'Todo ID must be in the URL!' })
    }

    if (result.error) {
      return res.status(400).json({ message: 'Todo completed must be in the body' })
    }

    const todoUpdated = await TodoModel.updateCompleted({
      input: { completed: result.data.completed, id: Number(id) }
    })

    if (todoUpdated.rowCount === 0) {
      return res.status(200).json({ message: `There is not todo with ID ${id} to update` })
    }

    res.status(201).json({ message: 'Todo status updated!' })
  }

  static async updateAllTodo(req: Request, res: Response) {
    const { id } = req.params
    const { title, description } = req.body

    if (!title && !description) {
      return res.status(400).json({ error: 'Todo title or description is not in the body' })
    }
    await TodoModel.updateAllTodo({ input: { title, description }, id: Number(id) })

    res.status(201).json({ message: 'Todo Updated!' })
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ message: 'Todo ID must be in the URL!' })
    }

    const todoDeleted = await TodoModel.delete({ input: Number(id) })

    if (todoDeleted.rowCount === 0) {
      return res.status(200).json({ message: 'Cannot find todo to delete' })
    }

    res.status(200).json({ message: 'Todo deleted!' })
  }
}
