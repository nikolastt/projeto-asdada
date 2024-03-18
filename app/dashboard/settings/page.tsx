import prisma from "@/app/lib/db";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const getData = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
      colorScheme: true,
    },
  });

  return user;
};

const SettingsPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const data = await getData(user?.id as string);

  const postData = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    const color = formData.get("color") as string;

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        name: name ?? undefined,
        colorScheme: color ?? undefined,
      },
    });

    revalidatePath("/", "layout");
  };

  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Settings</h1>
          <p className="text-lg text-muted-foreground ">
            Your Profile settings
          </p>
        </div>
      </div>

      <Card>
        <form action={postData}>
          <CardHeader>
            <CardTitle>General Data</CardTitle>
            <CardDescription>
              Please provide general information about yourself. Please dont
              forget to save
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label>Your Name</Label>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  defaultValue={data?.name as string}
                  placeholder="Your Name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label>Your Email</Label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  defaultValue={data?.email as string}
                  placeholder="Your Email"
                  disabled
                />
              </div>

              <div className="space-y-1">
                <Label>Color Scheme</Label>
                <Select name="color" defaultValue={data?.colorScheme}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pick a color" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Color</SelectLabel>
                      <SelectItem value="theme-red">Red</SelectItem>
                      <SelectItem value="theme-green">Green</SelectItem>
                      <SelectItem value="theme-yellow">Yellow</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <SubmitButton>Save Now</SubmitButton>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SettingsPage;
