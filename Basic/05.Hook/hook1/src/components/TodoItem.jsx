// ✨rafce
import React from 'react'

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div>
      <input type="checkbox"
             checked={todo.status} 
             onChange={() => onToggle(todo.id)}
             />
      <span>
        {todo.name}
      </span>
      <button onClick={() => onDelete(todo.id)}>❌</button>
    </div>
  )
}

export default TodoItem