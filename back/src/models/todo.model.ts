import { Todo } from '../interfaces/todo.interface'
import * as db from '../database/db'

export class TodoModel {
  static async getAll() {
    const text = 'SELECT * FROM todo'
    const query = await db.querySelect(text)

    return query
  }

  static async create({ input }: { input: Todo }) {
    const text = 'INSERT INTO todo(title, description, completed) VALUES($1, $2, $3)'
    const values = [input.title, input.description, input.completed]

    const query = await db.queryInsert(text, values)

    return query
  }
}
