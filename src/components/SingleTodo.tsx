import { Todo } from '../model'
import React, { useEffect, useRef, useState } from 'react'
import { FiEdit3, FiTrash2 } from 'react-icons/fi'
import { MdDone } from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
  index: number
  todo: Todo
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()
    setTodos(
      todos.map(task => (task.id === id ? { ...todo, todo: editTodo } : task))
    )
    setEdit(false)
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter(task => task.id !== id))
  }

  const handleDone = (id: number) => {
    setTodos(
      todos.map(task =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    )
  }

  console.log(todo)
  return (
    <Draggable
      draggableId={todo.id.toString()}
      index={index}>
      {provided => (
        <form
          className='todos_single'
          onSubmit={e => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              className='edit_input'
              onChange={e => setEditTodo(e.target.value)}
            />
          ) : todo.isDone ? (
            <s className='todos_single_text done_task'>{todo.todo}</s>
          ) : (
            <span className='todos_single_text'>{todo.todo}</span>
          )}

          <div className='iconset'>
            <span
              className='icon'
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit)
                }
              }}>
              <FiEdit3 />
            </span>
            <span
              className='icon'
              onClick={() => handleDelete(todo.id)}>
              <FiTrash2 />
            </span>
            <span
              className='icon'
              onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  )
}
