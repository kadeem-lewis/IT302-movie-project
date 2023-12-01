import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useTheme } from "../hooks/useTheme";
import { Icons } from "./Icons";

export default function ThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light" isIconOnly aria-label="Switch Theme">
            <Icons.sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Icons.moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key="light" onClick={() => setTheme("light")}>
            Light
          </DropdownItem>
          <DropdownItem key="dark" onClick={() => setTheme("dark")}>
            Dark
          </DropdownItem>
          <DropdownItem key="system" onClick={() => setTheme("system")}>
            System
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
