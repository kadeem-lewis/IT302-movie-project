import { NavLink, Link } from "react-router-dom";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { User } from "../layouts/RootLayout";
import ThemeToggle from "./ThemeToggle";

type NavbarProps = {
  user: User | null;
};

export default function Navbar({ user }: NavbarProps) {
  return (
    <NextUINavbar className="mb-4" maxWidth="xl">
      <NavbarContent justify="start">
        <NavbarBrand as="li" className=" grow-0">
          <Link to="/" className="gap-2 flex font-bold uppercase items-center">
            <span className="border rounded-lg bg-black px-1 py-0.5 text-white">
              MV
            </span>
            <span>Movie Reviews</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
        <Dropdown>
          <DropdownTrigger>
            <Avatar name={user?.name} size="sm" />
          </DropdownTrigger>
          {user ? (
            <DropdownMenu>
              <DropdownItem>
                <NavLink to="">Logout User</NavLink>
              </DropdownItem>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownItem key="login" href="/login">
                Login
              </DropdownItem>
              <DropdownItem key="signup" href="/signup">
                Signup
              </DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>
      </NavbarContent>
    </NextUINavbar>
  );
}
