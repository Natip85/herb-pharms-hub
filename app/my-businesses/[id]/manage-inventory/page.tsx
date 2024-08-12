import AddProductForm from "@/components/inventory/AddProductForm";
import { DataTable } from "@/components/inventory/ProductDataTable";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const products = await db.product.findMany({ where: { companyId: id } });
  if (!company) {
    redirect("/my-businesses");
  }
  return (
    <MaxWidthWrapper className="flex min-h-screen flex-col gap-10 py-4 md:py-10">
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
          <DialogContent>
            <DialogHeader className="px-2">
              <DialogTitle>
                Add new inventory to{" "}
                <span className="text-[#1AB266]">{company.name}</span>
              </DialogTitle>
              <DialogDescription>
                Add new inventory to your company. This will be visible to all
                users.
              </DialogDescription>
            </DialogHeader>
            <AddProductForm company={company} />
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <DataTable products={products} />
      </div>
    </MaxWidthWrapper>
  );
}
