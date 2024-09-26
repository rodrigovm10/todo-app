import { Todo, TodoUpdate, TodoUpdateAll } from '../interfaces/todo.interface'
import * as db from '../database/db'

export class TodoModel {
  static async getAll() {
    const text = 'SELECT * FROM todo'
    const query = await db.querySelect(text)

    return query
  }

  static async getOne({ input }: { input: number }) {
    const text = 'SELECT * FROM todo WHERE id = $1'
    const values = [input]

    const query = await db.query(text, values)

    return query
  }

  static async create({ input }: { input: Todo }) {
    const text = 'INSERT INTO todo(title, description, completed) VALUES($1, $2, $3)'
    const values = [input.title, input.description, input.completed]

    const query = await db.query(text, values)

    return query
  }

  static async updateCompleted({ input }: { input: TodoUpdate }) {
    const text = 'UPDATE todo SET completed = $1 WHERE id = $2'
    const values = [input.completed, input.id]

    const query = await db.query(text, values)

    return query
  }

  static async updateAllTodo({ input, id }: { input: TodoUpdateAll; id: number }) {
    const { rows } = await this.getOne({ input: id })
    let { title, description } = {
      title: input?.title ?? rows[0].title,
      description: input?.description ?? rows[0].description
    }

    const text = 'UPDATE todo SET title = $1, description = $2 WHERE id = $3'
    const values = [title, description, id]
    console.log(values)

    const query = await db.query(text, values)

    return query
  }

  static async delete({ input }: { input: number }) {
    const text = 'DELETE FROM todo WHERE id = $1'
    const values = [input]

    const query = await db.query(text, values)

    return query
  }
}
