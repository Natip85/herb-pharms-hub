import AddProductForm from "@/components/inventory/AddProductForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import db from "@/db/db";
import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
async function getCompany(id: string) {
  const company = await db.company.findUnique({ where: { id } });
  if (!company) return null;
  return company;
}
export default async function ManageInventoryPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const company = await getCompany(id);
  if (!company) {
    redirect("/my-businesses");
  }
  return (
    <MaxWidthWrapper className="min-h-screen py-4 md:py-10">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between">
        <div className="flex items-center gap-3">
          <Link href={"/my-businesses"}>
            <ChevronLeft className="size-8" />
          </Link>
          <h1 className="text-center text-2xl font-semibold md:text-4xl">
            Manage your inventory
          </h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant={"outline"} className="max-w-[150px]">
              <Plus className="mr-2 size-4" />
              Add inventory
            </Button>
          </DialogTrigger>
          <AddProductForm company={company} />
        </Dialog>
      </div>
    </MaxWidthWrapper>
  );
}
