import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import TodosList from './components/TodosList';
import './App.css';

const App = () => {

  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  })
  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className='container'>
      <div className='app-wrapper'>
        <div>
          <Header />
        </div>
        <div>
          <Form
            input={input}
            setInput={setInput}
            todos={todos}
            setTodos={setTodos}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
            description={description}
            setDescription={setDescription}
            onDescriptionChange={onDescriptionChange}

          />
        </div>
        <div>
          <TodosList todos={todos} setTodos={setTodos} setEditTodo={setEditTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;
