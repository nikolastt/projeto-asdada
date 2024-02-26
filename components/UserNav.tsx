import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";

const UserNav = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage /* src="https://github.com/shadcn.png"  />
            <AvatarFallback>Jan</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default UserNav;
