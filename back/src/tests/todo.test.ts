import supertest from 'supertest'
import { app } from '../app'

const api = supertest(app)

describe('[routes / todo]', () => {
  let todoId = '1'

  describe('GET /api/todo', () => {
    it('should return status 404 if no todos exist', async () => {
      const { status, body } = await api.get('/api/todo')
      expect(status).toEqual(404)
      expect(body.message).toEqual('There is not todos')
    })

    it('should return status 200 and list todos if they exist', async () => {
      await api.post('/api/todo').send({ title: 'Test Todo', description: 'Test Description' })
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
      const response = await api
        .post('/api/todo')
        .send({ title: 'New Todo', description: 'New Description' })
      expect(response.status).toEqual(201)
      todoId = response.body.id // Guardar ID del todo para usarlo en otros tests
    })
  })

  describe('PATCH /api/todo/:id', () => {
    it('should return 400 if "completed" field is missing in body', async () => {
      const { status } = await api.patch(`/api/todo/1`).send({})
      expect(status).toEqual(400)
    })

    it('should return 404 if todo not found', async () => {
      const { status } = await api.patch('/api/todo/99999').send({ completed: true })
      expect(status).toEqual(404)
    })

    it('should update todo and return 201 if ID and data are valid', async () => {
      const { status } = await api.patch(`/api/todo/1`).send({ completed: true })
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
      const { status } = await api.delete(`/api/todo/1`)
      expect(status).toEqual(200)
    })
  })
})
