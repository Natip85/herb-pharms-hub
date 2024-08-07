"use client";

import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import * as z from "zod";
import { AddCompanySchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const DAY_HOURS = [
  "closed",
  "open 24 hours",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
  "00:00",
  "00:30",
];

export default function AddCompanyForm() {
  const form = useForm<z.infer<typeof AddCompanySchema>>({
    resolver: zodResolver(AddCompanySchema),
    defaultValues: {
      name: "",
      city: "",
      email: "",
      area: "",
      type: "",
      hours: [
        { day: "sunday", open: "", closed: "" },
        { day: "monday", open: "", closed: "" },
        { day: "tuesday", open: "", closed: "" },
        { day: "wednesday", open: "", closed: "" },
        { day: "thursday", open: "", closed: "" },
        { day: "friday", open: "", closed: "" },
        { day: "saturday", open: "", closed: "" },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "hours",
  });
  const onSubmit = async (data: z.infer<typeof AddCompanySchema>) => {
    console.log("DATA>>>>", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Company name</FormLabel>
              <FormControl>
                <Input id="name" {...field} placeholder="Acme Corporation..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="city">City</FormLabel>
              <FormControl>
                <Input id="city" {...field} placeholder="Tel Aviv..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Contact email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  {...field}
                  placeholder="johndoe@email.com..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="area">District</FormLabel>
              <FormControl>
                <Input id="area" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="type">Company type</FormLabel>
              <FormControl>
                <Input id="type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="hours">Business hours</FormLabel>
              <FormControl>
                <Table>
                  <TableCaption>
                    Please select your business hours to help customers.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Open</TableHead>
                      <TableHead>Closed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((day, i) => (
                      <TableRow key={i}>
                        <TableCell>{day.day}</TableCell>
                        <TableCell>
                          <Select
                            onValueChange={(value) =>
                              form.setValue(`hours.${i}.open`, value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select opening hours" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {DAY_HOURS.map((hour) => (
                                  <SelectItem key={hour} value={hour}>
                                    {hour}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            onValueChange={(value) =>
                              form.setValue(`hours.${i}.closed`, value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select closing hours" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {DAY_HOURS.map((hour) => (
                                  <SelectItem key={hour} value={hour}>
                                    {hour}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
