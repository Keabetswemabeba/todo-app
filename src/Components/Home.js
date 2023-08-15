import React, { useEffect } from "react";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

function Home() {
  const logout = () => {
    localStorage.removeItem("signUp");
    window.location.reload();
  };

  const deleteAccount = () => {
    localStorage.clear();
    window.location.reload();
  };

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [search, setSearch] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      priority: newPriority,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  function handleEditTodo (item) {

    setNewTitle(item.newTitle)
    setNewDescription(item.newDescription)
    setNewPriority(item.newPriority)

    console.log(item)
  };

  const handleUpdate =(e) => {
    e.preventDefault()

    let updatedTodo = {
      newTitle,
      newDescription,
      newPriority
    }

    setNewTitle(newTitle)
    setNewDescription(newDescription)
    setNewPriority(newPriority)

    setTodos(allTodos.map(todolist => {
      return todolist.newTitle === newTitle ? updatedTodo : todolist
    }))

    console.log(updatedTodo)
  }

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);

    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + "-" + mm + "-" + yyyy + "at" + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index);

    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="todo">
      <h1 className="head">ToDo List</h1>
      <p className="para">Welcome {localStorage.getItem("name")}</p>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Task</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Task title"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          <div className="todo-input-item">
            <label>Priority</label>
            <select
              value={newPriority}
              id="state"
              onChange={(e) => setNewPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="add-task-btn"
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="update-todo"
            >
              Update
            </button>
          </div>
        </div>

        <input
          className="search"
          type="text"
          placeholder="search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && `active`}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && `active`}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodos
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(search) ||
                      item.description.toLowerCase().includes(search) ||
                      item.priority.toLowerCase().includes(search);
              })
              .map((item, index) => {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>
                      <h4>{item.priority}</h4>
                    </div>

                    <div className="submit-btn-area">
                      <AiFillEdit
                        className="edit-icon"
                        onClick={() => handleEditTodo(item)}
                        title="Edit"
                      />
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteTodo(index)}
                        title="Delete?"
                      />
                      <BsCheckLg
                        className="check-icon"
                        onClick={() => handleComplete(index)}
                        title="Complete?"
                      />
                    </div>
                  </div>
                );
              })}

          {isCompleteScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <h4>{item.priority}</h4>
                    <p>
                      <small>Completed On: {item.completedOn}</small>
                    </p>
                  </div>

                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onChange={() => handleDeleteCompletedTodo(index)}
                      title="Delete?"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <br></br>
      <button onClick={logout} className="logout">
        Logout
      </button>
      <button onClick={deleteAccount} className="delete">
        Delete Acc
      </button>
    </div>
  );
}
export default Home;
