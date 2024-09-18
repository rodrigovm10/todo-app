export const fetchAllTodos = async () => {
  const data = await fetch('http://localhost:3000/todo')
  console.log(data)
}

CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL, 
    description VARCHAR(255),
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);