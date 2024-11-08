import { Form } from '@/components/form'
import { Header } from '@/components/header'
import { TodoList } from '@/components/todo-list'
import { TodoProvider } from '@/context/todoContext'

export default function App() {
  return (
    <TodoProvider>
      <div className='min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div className='mt-8 space-y-6'>
            <Header />
            <Form />
            <TodoList />
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}
