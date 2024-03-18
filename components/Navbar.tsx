import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNav from "./UserNav";

const NavBar = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <nav className="border-b h-[10vh] bg-background flex items-center">
      <div className="container flex item-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-3xl">
            Marshal<span className="text-primary">Saas</span>
          </h1>
        </Link>

        <div className="flex items-center gap-x-5">
          <ThemeToggle />

          {(await isAuthenticated()) ? (
            <UserNav
              email={user?.email as string}
              image={user?.picture as string}
              name={user?.given_name as string}
            />
          ) : (
            <div className="flex items-center gap-x-5">
              <LoginLink>
                <Button>Sign In</Button>
              </LoginLink>

              <RegisterLink>
                <Button variant="secondary">Sign Up</Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
