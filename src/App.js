import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";

function Todo({ todo, index, removeTodo }) {
  const [done, setDone] = useState(false);

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "2em",
        height: "4em",
        alignItems: "center",
        minWidth: "300px",
      }}
    >
      <span
        style={{
          textDecoration: done ? "line-through" : "",
          maxWidth: "180px",
          marginLeft: ".5em",
        }}
      >
        {todo.text}
      </span>
      <div
        style={{
          margin: ".2em",
        }}
      >
        <Button
          variant="outline-success"
          style={{
            marginRight: ".5em",
          }}
          onClick={() => setDone(!done)}
        >
          ✓
        </Button>
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>
          ✕
        </Button>
      </div>
    </Card>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "5em",
        width: "50vw",
        maxWidth: "300px",
        minWidth: "300px",
      }}
    >
      <Form.Group>
        <Form.Control
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add New Todo..."
        />
      </Form.Group>
      <Button
        variant="outline-info"
        size="sm"
        type="submit"
        style={{
          marginTop: ".5em",
        }}
      >
        Submit
      </Button>
    </Form>
  );
}

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("/todos.json")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <Container fluid>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "5em",
        }}
      >
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <>
              <Todo
                key={index}
                index={index}
                todo={todo}
                removeTodo={removeTodo}
              />
            </>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default App;
