import React, { useState } from 'react'
import { BiLayer } from 'react-icons/bi'
import './App.css'
import InputField from './components/InputField'
import { TodoList } from './components/TodoList'
import { Todo } from './model'


const App : React.FC = () => {

  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if(todo){
      setTodos([
        ...todos,
        {
          id:Date.now(), 
          todo:todo, 
          isDone:false
        }
      ])
      setTodo("")
    }
  }

  return (
    <div className="App">
      <span className="heading">Hyland TaskMaker</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      {
        (todos.length >= 1) ? 
        (
          <TodoList todos={todos} setTodos={setTodos}/>
        ) : 
        (
          <div className='no_task_message'>
             <BiLayer className='no_task_icon'/>
            <h1>You don't have any tasks yet</h1>
          </div>
        )
      }
    </div>
  )
}

export default App
