import React, { useState } from "react";
import { useOutletContext, useNavigate, Form, Link } from "react-router-dom";
import { OutletContext } from "../layouts/RootLayout";
import { Card,CardHeader, CardBody,CardFooter, Input, Button } from "@nextui-org/react";

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
    <div className="container mx-auto">
      <Card>
        <CardHeader>Login</CardHeader>
        <CardBody>
      <Form onSubmit={handleLogin} className="space-y-3">
          <Input
            type="text"
            label="Username"
            placeholder="Enter username"
            name="username"
            value={name}
            onChange={onChangeName}
          />
          <Input
            type="text"
            label="ID"
            placeholder="Enter id"
            name="id"
            value={id}
            onChange={onChangeId}
          />
        <Button type="submit">
          Submit
        </Button>
      </Form>
      <CardFooter>
        <p>Don&apos;t have an account? <Link to="/signup">Signup</Link></p>
      </CardFooter>
        </CardBody>
      </Card>
    </div>
  );
}
