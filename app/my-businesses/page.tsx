import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "@/components/auth/LogoutButton";
import MyBusinessesCard from "@/components/company/MyBusinessesCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { currentUser } from "@/lib/auth";
import { RocketIcon } from "lucide-react";

async function getUserCompanies(id: string) {
  const userCompanies = await db.user.findUnique({
    where: { id },
    select: { companies: true },
  });
  if (!userCompanies) return null;
  return userCompanies;
}

export default async function MyBusinessesPage() {
  const user = await currentUser();
  if (!user?.id) {
    return (
      <div className="flex min-h-screen flex-col gap-10 p-4 md:p-10">
        <h1 className="text-center text-2xl font-semibold md:text-4xl">
          Log in to manage your businesses
        </h1>
        <Alert className="mx-auto flex max-w-2xl items-center justify-between">
          <RocketIcon className="size-4" />
          <div className="w-full">
            <AlertTitle>Welcome!</AlertTitle>
            <AlertDescription>
              Create your account to start advertising on{" "}
              <span className="text-[#1AB266]">HerbPharmsHub</span>
            </AlertDescription>
          </div>
          <LoginButton mode="modal" asChild>
            <Button>Sign up</Button>
          </LoginButton>
        </Alert>
      </div>
    );
  }
  const userCompanies = await getUserCompanies(user.id);
  if (!userCompanies?.companies.length) {
    return (
      <div className="flex min-h-screen flex-col gap-5 p-4 md:p-10">
        <h1 className="text-center text-2xl font-semibold md:text-4xl">
          You have no registered businesses{" "}
        </h1>
        <Alert className="mx-auto flex max-w-2xl items-center justify-between">
          <RocketIcon className="size-4" />
          <div className="w-full">
            <AlertTitle>Logged in as {user?.email}</AlertTitle>
            <AlertDescription>
              Create and submit your business for{" "}
              <span className="text-[#1AB266]">HerbPharmsHub</span> approval
            </AlertDescription>
          </div>
          <LogoutButton>Logout</LogoutButton>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-8 p-4 md:p-10">
      <Alert className="mx-auto flex max-w-2xl items-center justify-between">
        <RocketIcon className="size-4" />
        <div className="w-full">
          <AlertTitle>Logged in as {user?.email}</AlertTitle>
          <AlertDescription>
            Create and submit your account for{" "}
            <span className="text-[#1AB266]">HerbPharmsHub</span> approval
          </AlertDescription>
        </div>
        <LogoutButton>Logout</LogoutButton>
      </Alert>
      <h1 className="text-center text-2xl font-semibold md:text-4xl">
        Manage businesses
      </h1>
      <MaxWidthWrapper>
        <MyBusinessesCard companies={userCompanies.companies} />
      </MaxWidthWrapper>
    </div>
  );
}
