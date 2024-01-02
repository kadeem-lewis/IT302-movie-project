import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
} from "@nextui-org/react";
import { Form, Link } from "react-router-dom";
import { AuthProviders } from "../components/AuthProviders";

export default function Signup() {
  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>Signup</CardHeader>
        <CardBody>
          <Form className="space-y-3">
            <Input
              type="text"
              label="Email"
              placeholder="Enter email"
              name="email"
            />
            <Input
              type="text"
              label="Username"
              placeholder="Enter username"
              name="username"
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter password"
              name="password"
            />
            <Button type="submit">Submit</Button>
          </Form>
        </CardBody>
        <CardFooter className="flex flex-col gap-4">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <AuthProviders />
        </CardFooter>
      </Card>
    </div>
  );
}
