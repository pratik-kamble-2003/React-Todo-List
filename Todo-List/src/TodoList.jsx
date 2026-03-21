import './TodoList.css'

import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {
    let [todos, setTodos] = useState([{task: "simple-task", id: uuidv4()}]);
    let [newTodo, setNewTodo] = useState("");

    let addnewTask = ()=> {
        setTodos((prevTodos) =>{
          return  [...prevTodos, {task: newTodo, id:uuidv4()}];
        });
        setNewTodo("");
    }

    let updateTodoValue = (event)=> {
        setNewTodo(event.target.value);
    }

    let deleteTodo = (id)=> {
      setTodos((prevTodo) => todos.filter((todo) => todo.id != id));
    }

    let MarkAllDone = ()=> {
        setTodos((prevTodos) => 
            prevTodos.map((todo) => {
                return {
                    ...todo,
                    task: todo.task.toUpperCase(),
                };
                })
            );
    };

    let MarkAsDone = (id)=> {
        setTodos((prevTodos) => 
            prevTodos.map((todo) => {
                if (todo.id == id) {
                return {
                    ...todo,
                    isDone: true,
                };
                }
                else {
                    return todo;
                }

            })
        );
    }

    return (
        <div>
        <input placeholder="add a task" value={newTodo} onChange={updateTodoValue}/>
        <br />
        <button onClick={addnewTask}>Add task</button>
        <br /><br /><br /><br />
        <hr />
        <h1>Tasks Todo</h1>
        <ul>
            {
                todos.map((todo) => {
                    return <li key={todo.id}>
                    <span style={todo.isDone ? { textDecorationLine: "line-through "} : {} }>{todo.task}</span>
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={() => deleteTodo(todo.id)}>delete</button>
                    <button onClick={() => MarkAsDone(todo.id)}>Mark As Done</button>
                    </li>
                })
            }
        </ul>
        <br />
        <button onClick={MarkAllDone}>Mark All as Done</button>
        </div>
    );
}