import { CreditCard, DoorClosed, Home, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

interface userNaveProps {
  name: string;
  image: string;
  email: string;
}

export const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
];

const UserNav = ({ email, image, name }: userNaveProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src={image} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              Nikolas Bitencourt
            </p>
            <p className="text-xs leading-none text-muted-foreground ">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navItems.map((item, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link
                href={item.href}
                className="w-full flex  items-center justify-between"
              >
                {item.name}
                <span>
                  <item.icon className="w-4 h-4" />
                </span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <LogoutLink>
          <DropdownMenuItem className="flex w-full justify-between items-center">
            Logout{" "}
            <span>
              <DoorClosed className="w-4 h-4" />
            </span>
          </DropdownMenuItem>
        </LogoutLink>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
