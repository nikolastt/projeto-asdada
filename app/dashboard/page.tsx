import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../lib/db";

async function getData({
  email,
  id,
  firstName,
  lastName,
  profileImage,
}: {
  email: string;
  id: string;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  profileImage: string | null | undefined;
}) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      stripeCustomerId: true,
    },
  });

  if (!user) {
    const name = `${firstName ?? ""} ${lastName ?? ""}`;

    await prisma.user.create({
      data: {
        id,
        email,
        name,
      },
    });
  }
}

const DashboardPage = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  await getData({
    email: user.email as string,
    firstName: user.given_name,
    lastName: user.family_name,
    id: user.id,
    profileImage: user.picture,
  });

  return <div>DashboardPage</div>;
};

export default DashboardPage;
