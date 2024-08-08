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
      <div>
        <h1 className="text-center text-2xl md:text-4xl font-semibold">
          Log in to manage your businesses
        </h1>
        <Alert className="flex items-center justify-between max-w-2xl mx-auto">
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
      <div>
        {" "}
        <Alert className="flex items-center justify-between max-w-2xl mx-auto">
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
        <h1 className="text-center text-2xl md:text-4xl font-semibold">
          You have no regestered businesses{" "}
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-10 space-y-8">
      <Alert className="flex items-center justify-between max-w-2xl mx-auto">
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
      <h1 className="text-center text-2xl md:text-4xl font-semibold">
        Manage businesses
      </h1>
      <MaxWidthWrapper>
        <MyBusinessesCard companies={userCompanies.companies} />
      </MaxWidthWrapper>
    </div>
  );
}
