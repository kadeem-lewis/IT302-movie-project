import { Icons } from "./Icons";
import { Button } from "@nextui-org/react";

export const AuthProviders = () => {
  return (
    <div className="flex gap-4">
      <Button>
        <Icons.google className="w-6 h-6" />
      </Button>
      <Button>
        <Icons.github className="w-6 h-6" />
      </Button>
      <Button>
        <Icons.discord className="w-6 h-6" />
      </Button>
    </div>
  );
};
