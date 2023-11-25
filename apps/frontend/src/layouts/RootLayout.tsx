import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";

export type OutletContext = {
  user: any;
  setUser: any;
  login: any;
  logout: () => void;
};

export default function RootLayout() {
  const [user, setUser] = useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }
  return (
    <>
      <Navbar>
        <NavbarBrand className="font-bold uppercase">
          <Link to="/">Movie Reviews</Link>
        </NavbarBrand>
        <NavbarContent justify="center">
          <NavbarItem>
            <NavLink to={"/movies"}>Movies</NavLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            {user ? (
              <NavLink to="">Logout User</NavLink>
            ) : (
              <Button as={Link} to={"/login"} color="primary" variant="flat">
                Login
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <main>
        <Outlet context={{ user, setUser, login, logout }} />
      </main>
    </>
  );
}
