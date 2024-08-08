import AddCompanyForm from "@/components/company/AddCompanyForm";
import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "@/components/auth/LogoutButton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import { RocketIcon } from "lucide-react";

export default async function AddBusinessPage() {
  const user = await currentUser();
  if (!user) {
    return (
      <div className="min-auto p-4 md:p-10">
        <MaxWidthWrapper className="space-y-8">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Add your business to HubPharmsHub
          </h1>
          <p>
            <span className="text-[#1AB266]">HerbPharmsHub</span> offers
            companies in the cannabis industry a simple way to connect with
            potential customers, allowing you to publish updated information and
            receive inquiries in the field of medical cannabis. Navigating the
            site is simple and easy, enabling you to generate revenue without
            headaches.
          </p>
          <p>
            All you need to do is create an account on the
            <span className="text-[#1AB266]">HerbPharmsHub</span> website
            easily, enter your contact details, and within moments you and your
            company will be exposed to thousands of visitors. After creating
            your business page, send it for admin approval with the click of a
            button, and that&apos;s it!
          </p>
          <p>
            Are you a business owner in the cannabis field? Do you want to
            expose your business to thousands of followers and appear in the
            leading cannabis index in Israel? Fill in your business details,
            including your contact information, and get your own business page
            that you can update regularly.
          </p>
          <Alert className="flex items-center justify-between">
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
        </MaxWidthWrapper>
      </div>
    );
  }
  return (
    <div className="h-auto p-4 md:p-10">
      <AddCompanyForm />
    </div>
  );
}
