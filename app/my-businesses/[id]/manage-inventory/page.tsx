import AddProductDialog from "@/components/inventory/AddProductDialog";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import db from "@/db/db";
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
      <div className="flex flex-col items-start md:flex-row md:justify-between">
        <h1 className="text-center text-2xl font-bold md:text-4xl">
          Manage your inventory
        </h1>
        <AddProductDialog company={company} />
      </div>
    </MaxWidthWrapper>
  );
}
