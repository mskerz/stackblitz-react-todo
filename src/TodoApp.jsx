import { useState } from 'react';
import './todo.css';

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [Id, setNextId] = useState(1); // เก็บ id ที่จะใช้สำหรับ todo ถัดไป

  const addTodo = (todo) => {
    const NewTodo = {
      id: Id,
      text: todo,
      completed: false,
    };
    setTodos([...todos, NewTodo]);
    setNextId(Id + 1);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filterTodos = todos.filter((todo) => {
    switch (filter) {
      case 'completed':
        return todo.completed;
      case 'incomplete':
        return !todo.completed;
      default:
        return true;
    }
  });

  const toggleComplete = (id) => {
    const completeTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(completeTodo);
  };

  return (
    <div className="todos-app">
      <h2 className="todo-title">Todo App</h2>
      <div>
        <TodoAdd addTodo={addTodo} />
        {todos.length > 0 && (
          <div className="todos-filters">
            <button onClick={() => setFilter('all')}>All</button>
            <button onClick={() => setFilter('completed')}>Finish</button>
            <button onClick={() => setFilter('incomplete')}>Unfinish</button>
          </div>
        )}
        <TodoLists
          todos={filterTodos}
          onDelete={removeTodo}
          onComplete={toggleComplete}
        />
      </div>
    </div>
  );
};

const TodoAdd = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleClick = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    } else {
      alert('Please fill a Todo');
      return;
    }
  };

  return (
    <div className="todo-add">
      <input
        type="text"
        className="todos-input"
        value={newTodo}
        placeholder="Enter new todo"
        onChange={(e) => setNewTodo(e.target.value)}
      />

      <button className="todos-add-button" onClick={handleClick}>
        Add Task
      </button>
    </div>
  );
};

const TodoItem = ({ todo, onDelete, onToggleComplete }) => {
  return (
    <li className="todos-item" key={todo.id}>
      <span className="todo-text">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
        />
        <label
          style={{
            marginLeft: '5px',
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.text}
        </label>
      </span>
      <button className="delete-button" onClick={() => onDelete(todo.id)}>
        X
      </button>
    </li>
  );
};

const TodoLists = ({ todos, onDelete, onComplete }) => {
  return (
    <ul className="todos-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggleComplete={onComplete}
        />
      ))}
    </ul>
  );
};
