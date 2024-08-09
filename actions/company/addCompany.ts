"use server";
import * as z from "zod";
import { AddCompanySchema } from "@/validations";
import db from "@/db/db";
import { revalidatePath } from "next/cache";

export async function addCompany(
  userId: string,
  values: z.infer<typeof AddCompanySchema>,
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
  // revalidatePath("/add-business");
  // revalidatePath("/my-businesses");
  return { success: "Company form subbmitted successfully" };
}
