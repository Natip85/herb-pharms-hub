"use client";

import { Product } from "@prisma/client";
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
interface AddProductFormProps {
  product?: Product;
  handleDialogOpen: () => void;
}
export default function AddProductForm({
  handleDialogOpen,
  product,
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <div>
          <Button>Submit</Button>
        </div>
      </form>
    </Form>
  );
}
