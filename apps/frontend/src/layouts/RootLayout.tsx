import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/react";

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
    <div>
      <Navbar>
        <NavbarBrand>Movie Reviews</NavbarBrand>
        <NavbarContent>
          <NavbarItem>
          <NavLink to={"/movies"}>
              Movies
            </NavLink>
          </NavbarItem>
          <NavbarItem>
          <NavLink to={user ? "" : "/login"}>
              {user ? "Logout User" : "Login"}
            </NavLink>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <main>
        <Outlet context={{ user, setUser, login, logout }} />
      </main>
    </div>
  );
}
