import supertest from 'supertest'
import { app } from '../app'
import { TodoModel } from '../models/todo.model'
import { QueryResult } from 'pg'

const api = supertest(app)

describe('[routes / todo]', () => {
  let todoId: string

  beforeAll(async () => {
    const newTodo = {
      title: 'Setup Todo',
      description: 'This todo is for setup purposes',
      completed: false
    }

    const result: QueryResult = {
      rows: [{ ...newTodo }],
      rowCount: 1,
      command: 'INSERT',
      oid: 0,
      fields: []
    }

    jest.spyOn(TodoModel, 'create').mockResolvedValue(result)
    const response = await api.post('/api/todo').send(newTodo)
    todoId = response.body.id // Asigna el ID del todo para usarlo en PATCH
  })

  describe('GET /api/todo', () => {
    it('should return status 404 if no todos exist', async () => {
      const emptyResult: QueryResult = {
        rows: [],
        rowCount: 0,
        command: '',
        oid: 0,
        fields: []
      }
      jest.spyOn(TodoModel, 'getAll').mockResolvedValue(emptyResult)
      const { status, body } = await api.get('/api/todo')
      expect(status).toEqual(404)
      expect(body.message).toEqual('There is not todos')
    })

    it('should return status 200 and list todos if they exist', async () => {
      const resultWithTodos: QueryResult = {
        rows: [{ title: 'Test Todo', description: 'Test Description' }],
        rowCount: 1,
        command: '',
        oid: 0,
        fields: []
      }
      jest.spyOn(TodoModel, 'getAll').mockResolvedValue(resultWithTodos)
      const { status, body } = await api.get('/api/todo')
      expect(status).toEqual(200)
      expect(Array.isArray(body)).toBe(true)
    })
  })

  describe('POST /api/todo', () => {
    it('should return 400 if data is invalid', async () => {
      const { status } = await api.post('/api/todo').send({ description: 'Incomplete data' })
      expect(status).toEqual(400)
    })

    it('should create a todo and return 201 if data is valid', async () => {
      const newTodo = {
        id: '2',
        title: 'New Todo',
        description: 'New Description',
        completed: false
      }
      const result: QueryResult = {
        rows: [newTodo], // Se devuelve el nuevo todo en `rows`
        rowCount: 1,
        command: 'INSERT',
        oid: 0,
        fields: []
      }

      jest.spyOn(TodoModel, 'create').mockResolvedValue(result)
      const response = await api.post('/api/todo').send(newTodo)
      expect(response.status).toEqual(201)
    })
  })

  describe('PATCH /api/todo/:id', () => {
    it('should return 400 if "completed" field is missing in body', async () => {
      const { status } = await api.patch(`/api/todo/${todoId}`).send({})
      expect(status).toEqual(400)
    })

    it('should return 404 if todo not found', async () => {
      const notFoundResult: QueryResult = {
        rows: [],
        rowCount: 0,
        command: '',
        oid: 0,
        fields: []
      }
      jest.spyOn(TodoModel, 'updateCompleted').mockResolvedValue(notFoundResult)

      const { status } = await api.patch('/api/todo/99999').send({ completed: true })
      expect(status).toEqual(404)
    })

    it('should update todo and return 201 if ID and data are valid', async () => {
      const updatedTodoResult: QueryResult = {
        rows: [{ id: todoId, completed: true }],
        rowCount: 1,
        command: 'UPDATE',
        oid: 0,
        fields: []
      }

      jest.spyOn(TodoModel, 'updateCompleted').mockResolvedValue(updatedTodoResult)

      const { status } = await api.patch(`/api/todo/${todoId}`).send({ completed: true })
      expect(status).toEqual(201)
    })
  })

  describe('PUT /api/todo/:id', () => {
    it('should return 400 if title and description is missing in body', async () => {
      const { status } = await api.put(`/api/todo/1`).send({})
      expect(status).toEqual(400)
    })

    it('should update todo and return 201 if data is valid', async () => {
      const { status } = await api
        .put(`/api/todo/1`)
        .send({ title: 'Updated Title', description: 'Updated Description' })
      expect(status).toEqual(201)
    })
  })

  describe('DELETE /api/todo/:id', () => {
    it('should return 404 if todo not found', async () => {
      const { status } = await api.delete('/api/todo/99999')
      expect(status).toEqual(404)
    })

    it('should delete todo and return 200 if ID is valid', async () => {
      const deleteResult: QueryResult = {
        rows: [{ id: todoId }],
        rowCount: 1,
        command: 'DELETE',
        oid: 0,
        fields: []
      }

      jest.spyOn(TodoModel, 'delete').mockResolvedValue(deleteResult)

      const { status } = await api.delete(`/api/todo/${todoId}`)
      expect(status).toEqual(200)
    })
  })
})
