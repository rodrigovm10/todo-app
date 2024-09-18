import pg from 'pg'
const { Client } = pg

const client = new Client({
  user: 'rvega',
  password: 'isa042023',
  host: '127.0.0.1',
  port: 5432,
  database: 'todo'
})

export async function connectDB() {
  try {
    await client.connect()
    console.log('Database connected successfully')
    return client
  } catch (error) {
    console.error('Failed to connect to the database:', error)
  }
}

export const queryInsert = (text: string, params: Array<any>) => {
  return client.query(text, params)
}

export const querySelect = (text: string) => {
  return client.query(text)
}
