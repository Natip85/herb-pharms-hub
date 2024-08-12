"use server";
import db from "@/db/db";
import { revalidatePath } from "next/cache";

export async function toggleProductAvailability(
  id: string,
  isAvailable: boolean,
) {
  await db.product.update({ where: { id }, data: { isAvailable } });

  //   revalidatePath("/");
  //   revalidatePath("/my-businesses");
}
