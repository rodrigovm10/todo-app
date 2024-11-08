import pg from 'pg'
const { Client } = pg

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME
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

export const query = (text: string, params: Array<any>) => {
  return client.query(text, params)
}

export const querySelect = (text: string) => {
  return client.query(text)
}
