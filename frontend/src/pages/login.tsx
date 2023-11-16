import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useOutletContext, useNavigate } from "react-router-dom";
import { OutletContext } from "../layouts/RootLayout";

export default function Login() {
  const { login } = useOutletContext<OutletContext>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setName(name);
  };
  const onChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    setId(id);
  };
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ name: name, id: id });
    navigate("/movies");
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={name}
            onChange={onChangeName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter id"
            name="id"
            value={id}
            onChange={onChangeId}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
