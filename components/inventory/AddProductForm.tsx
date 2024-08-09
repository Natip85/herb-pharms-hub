"use client";

import { Company, Product } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AddProductSchema } from "@/validations";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
interface AddProductFormProps {
  product?: Product;
  company: Company;
}
export default function AddProductForm({
  product,
  company,
}: AddProductFormProps) {
  const form = useForm<z.infer<typeof AddProductSchema>>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof AddProductSchema>) => {
    console.log("DATA>>>", data);
  };
  return (
    <DialogContent className="w-[90%] max-w-[900px]">
      <DialogHeader className="px-2">
        <DialogTitle>
          Add new inventory to{" "}
          <span className="text-2xl text-[#1AB266]">{company.name}</span>
        </DialogTitle>
        <DialogDescription>
          Add new inventory to your company. This will be visible to all users.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="h-[70vh] space-y-8 overflow-y-auto p-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Product name</FormLabel>
                  <FormControl>
                    <Input id="name" {...field} placeholder="e.g., OG kush" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter className="p-2">
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
