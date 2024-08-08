"use server";
import db from "@/db/db";

export async function deleteCompany(companyId: string) {
  if (!companyId) {
    return { error: "No company ID provided" };
  }

  try {
    const existingCompany = await db.company.findUnique({
      where: { id: companyId },
    });

    if (!existingCompany) {
      return { error: "No company found with that ID" };
    }

    await db.company.delete({
      where: { id: companyId },
    });

    return { success: "Company successfully deleted" };
  } catch (error) {
    console.error("Error deleting company:", error);
    return { error: "An error occurred while trying to delete the company" };
  }
}
