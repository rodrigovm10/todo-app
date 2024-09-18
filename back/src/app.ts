import express from 'express'
import cors from 'cors'
import { todoRouter } from './routes/todo.route'
import { connectDB } from './database/db'

const app = express()
const port = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/todo', todoRouter)

// Start the server after connecting to the database
async function startServer() {
  try {
    await connectDB() // Ensure DB connection is established
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error) {
    console.error('Failed to start the server due to DB connection error:', error)
    process.exit(1) // Exit the process if DB connection fails
  }
}

startServer()
