import EditCompanyForm from "@/components/company/EditCompanyForm";
import db from "@/db/db";

export default async function EditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const company = await db.company.findUnique({ where: { id } });
  console.log("ID>>>", id);
  console.log("COMPNAY>>>", company);
  if (!company) return;
  return (
    <div>
      <EditCompanyForm company={company} />
    </div>
  );
}
