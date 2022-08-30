import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Todo } from '../model'
import { SingleTodo } from './SingleTodo'
import './styles.css'

interface Props {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  completedTask: Todo[]
  setCompletedTask: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const TodoList = ({
  todos,
  setTodos,
  completedTask,
  setCompletedTask,
}: Props) => {
  return (
    <div className='container'>
      <Droppable droppableId='TodoList'>
        {provided => (
          <div
            className='todos'
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <span className='todos_heading'>Active</span>
            {todos?.map((task, index) => (
              <SingleTodo
                index={index}
                todo={task}
                todos={todos}
                key={task.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId='TodoRemove'>
        {provided => (
          <div
            className='todos remove'
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <span className='todos_heading'>Completed Task</span>
            {completedTask?.map((task, index) => (
              <SingleTodo
                index={index}
                todo={task}
                todos={completedTask}
                key={task.id}
                setTodos={setCompletedTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
