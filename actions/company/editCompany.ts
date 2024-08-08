"use server";
import * as z from "zod";
import { AddCompanySchema } from "@/validations";
import db from "@/db/db";

export async function editCompany(
  companyId: string,
  values: z.infer<typeof AddCompanySchema>
) {
  const validatedFields = AddCompanySchema.safeParse(values);

  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error);
    return { error: "Invalid fields" };
  }

  const existingCompany = await db.company.findUnique({
    where: { id: companyId },
  });
  if (!existingCompany) {
    return { error: "No company with that id found" };
  }
  await db.company.update({
    where: { id: companyId },
    data: validatedFields.data,
  });
  return { success: "Company updated successfully" };
}
