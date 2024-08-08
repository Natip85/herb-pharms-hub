"use server";
import * as z from "zod";
import { AddCompanySchema } from "@/validations";
import db from "@/db/db";

export async function addCompany(
  userId: string,
  values: z.infer<typeof AddCompanySchema>
) {
  const validatedFields = AddCompanySchema.safeParse(values);

  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error);
    return { error: "Invalid fields" };
  }

  const {
    name,
    city,
    email,
    area,
    field,
    hours,
    logo,
    image,
    description,
    website,
    phone,
  } = validatedFields.data;

  await db.company.create({
    data: {
      name,
      city,
      email,
      area,
      field,
      hours,
      logo,
      image,
      description,
      website,
      phone,
      userId,
    },
  });
  return { success: "Company form subbmitted successfully" };
}
