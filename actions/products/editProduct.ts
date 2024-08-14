"use server";

import * as z from "zod";
import { currentUser } from "@/lib/auth";
import { AddProductSchema } from "@/validations";
import db from "@/db/db";
import { revalidatePath } from "next/cache";

export async function editProduct(
  productId: string,
  values: z.infer<typeof AddProductSchema>,
) {
  const user = await currentUser();
  if (!user) {
    console.error("Error: No user found");
    return { error: "No user found" };
  }

  const validatedFields = AddProductSchema.safeParse(values);

  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error);
    return { error: validatedFields.error };
  }

  try {
    const {
      name,
      description,
      strain,
      featuredImage,
      galleryImages,
      price,
      THCLevel,
      CBDLevel,
      grower,
      brand,
      madeIn,
      parent1,
      parent2,
      cultivationMethod,
    } = validatedFields.data;

    const existingProduct = db.product.findUnique({ where: { id: productId } });
    if (!existingProduct) {
      return { error: "No such product found" };
    }
    await db.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        strain,
        featuredImage,
        galleryImages,
        price,
        THCLevel,
        CBDLevel,
        grower,
        brand,
        madeIn,
        parent1,
        parent2,
        cultivationMethod,
      },
    });

    revalidatePath("/my-businesses");
    return { success: "Product updated successfully!" };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Failed to edit product", details: error };
  }
}
