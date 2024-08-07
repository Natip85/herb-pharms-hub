import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const AddCompanySchema = z.object({
  name: z
    .string()
    .min(2, { message: "A minimum of at least 2 characters is required" }),
  city: z
    .string()
    .min(2, { message: "A minimum of at least 2 characters is required" }),
  email: z.string().email(),
  area: z.string().min(1, { message: "Company location is required" }),
  type: z.string().min(1, { message: "Company type is required" }),
  hours: z.array(
    z.object({
      day: z.string(),
      open: z.string().min(1, { message: "required" }),
      closed: z.string().min(1, { message: "required" }),
    })
  ),
  // logo: z.object({
  //   key: z.string(),
  //   name: z.string(),
  //   url: z.string(),
  //   size: z.number(),
  //   serverData: z.object({
  //     uploadedBy: z.string(),
  //   }),
  // }),
  // image: z.object({
  //   key: z.string(),
  //   name: z.string(),
  //   url: z.string(),
  //   size: z.number(),
  //   serverData: z.object({
  //     uploadedBy: z.string(),
  //   }),
  // }),
  // field: z.string(),
  // description: z
  //   .string()
  //   .min(10, { message: "A minimum of at least 10 characters is required" }),
  // website: z.string().optional(),
  // phone: z.string().min(10, { message: "A valid phone number is required" }),
});
