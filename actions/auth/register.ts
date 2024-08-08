"use server";
import { LoginSchema } from "@/validations";
import * as z from "zod";
import bcryptjs from "bcryptjs";
import db from "@/db/db";

export const register = async (data: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password } = validatedFields.data;
  const hashedPassword = await bcryptjs.hash(password, 10);
  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  return { success: "Registered successfully!" };
};
