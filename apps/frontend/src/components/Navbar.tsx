import { NavLink, Link } from "react-router-dom";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { User } from "../layouts/RootLayout";

type NavbarProps = {
  user: User | null;
};

export default function Navbar({ user }: NavbarProps) {
  return (
    <NextUINavbar className="mb-4" maxWidth="xl">
      <NavbarContent justify="start">
        <NavbarBrand className="font-bold uppercase">
          <Link to="/">Movie Reviews</Link>
        </NavbarBrand>
        <ul className="flex gap-4 justify-start items-center">
          <NavbarItem>
            <NavLink to={"/movies"}>Movies</NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink to={"/reviews"}>Reviews</NavLink>
          </NavbarItem>
        </ul>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {user ? (
            <>
              <Dropdown>
                <DropdownTrigger>
                  <Avatar name={user.username} size="sm" />
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>
                    <NavLink to="">Logout User</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          ) : (
            <div className="flex gap-4">
              <Button as={Link} to={"/login"} color="primary" variant="flat">
                Login
              </Button>
              <Button as={Link} to={"/signup"} color="primary" variant="flat">
                Create Account
              </Button>
            </div>
          )}
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
}
