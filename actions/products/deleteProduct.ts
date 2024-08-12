"use server";

import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } });

  if (product == null) return notFound();

  // await fs.unlink(product.filePath);
  // await fs.unlink(`public${product.imagePath}`);

  // revalidatePath("/");
  // revalidatePath("/products");
}
