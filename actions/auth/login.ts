"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/lib/auth";
import { LoginSchema } from "@/validations";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error);
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    console.error("Login Error: Email does not exist or missing password");
    return { error: "Email does not exist" };
  }

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      console.error("SignIn Error:", result.error);
      return { error: "Invalid credentials" };
    }
  } catch (error) {
    console.error("SignIn Error:", error);
    return { error: "Invalid credentials at sign-in" };
  }

  return { success: "Logged in successfully!" };
};
