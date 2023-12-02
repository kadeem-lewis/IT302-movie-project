import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export type User = {
  name: string;
  id: string;
};

export type OutletContext = {
  user: User | null;
  setUser: React.SetStateAction<User | null>;
  login: (user: User) => void;
  logout: () => void;
};

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }
  return (
    <>
      <Navbar user={user} />
      <main className="max-w-7xl container px-6 mx-auto">
        <Outlet context={{ user, setUser, login, logout }} />
      </main>
    </>
  );
}
