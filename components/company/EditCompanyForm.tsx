"use client";
import { AddCompanySchema } from "@/validations";
import { Company, ImageType } from "@prisma/client";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DAY_HOURS, DISTRICTS, cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CheckIcon, ChevronDown, ImagePlus, Loader2, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import Image from "next/image";
import { UploadButton } from "../uploadthing";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { PhoneInput } from "../ui/phone-input";
import { City } from "country-state-city";
import { useState, useTransition } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { editCompany } from "@/actions/company/editCompany";
import axios from "axios";
import { deleteCompany } from "@/actions/company/deleteCompany";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function EditCompanyForm({ company }: { company: Company }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const homeCities = City.getCitiesOfCountry("IL");
  const [selectedLogo, setSelectedLogo] = useState<ImageType | null>(
    company.logo
  );
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(
    company.image
  );
  const [isImageLoading, setIsImageLoading] = useState(false);

  const form = useForm<z.infer<typeof AddCompanySchema>>({
    resolver: zodResolver(AddCompanySchema),
    defaultValues: {
      name: company.name,
      city: company.city,
      email: company.email,
      area: company.area,
      field: company.field,
      hours: company.hours,
      logo: company.logo,
      image: company.image,
      description: company.description,
      website: company.website || "",
      phone: company.phone,
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: "hours",
  });
  const onSubmit = async (data: z.infer<typeof AddCompanySchema>) => {
    console.log("DATA>>>", data);

    startTransition(() => {
      editCompany(company.id, data)
        .then((data) => {
          if (data.error) {
            toast({
              title: "Error",
              description: `${data.error}`,
              variant: "destructive",
            });
            router.refresh();
          } else {
            toast({
              title: "Success",
              description: `${data.success}`,
              variant: "success",
            });
            router.push("/my-businesses");
            router.refresh();
          }
        })
        .catch(() => console.log("Something went wrong at edit company"));
    });
  };
  async function handleDeleteImage(img: ImageType) {
    await axios.post("/api/uploadthing/delete", {
      img,
    });
  }
  async function handleDeleteCompany(companyId: string) {
    startTransition(() => {
      deleteCompany(companyId)
        .then((data) => {
          if (data.error) {
            toast({
              title: "Error",
              description: `${data.error}`,
              variant: "destructive",
            });
            router.refresh();
          } else {
            toast({
              title: "Success",
              description: `${data.success}`,
              variant: "success",
            });
            router.push("/my-businesses");
            router.refresh();
          }
        })
        .catch(() => console.log("Something went wrong at edit company"));
    });
  }
  form.watch();
  console.log("WATCH>>>>", form.watch());
  return (
    <MaxWidthWrapper className="p-4 md:p-10">
      <h1 className="text-2xl md:text-4xl font-semibold text-center">
        Edit company detials
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Company name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    {...field}
                    placeholder="Acme Corporation..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Company description</FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    rows={8}
                    placeholder="Tell us a little bit about your company"
                    className="resize-none"
                    {...field}
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
                  <Select
                    defaultValue={form.getValues("area")}
                    onValueChange={(value) => form.setValue("area", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {DISTRICTS.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>City</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? homeCities?.find(
                              (city) => city.name === field.value
                            )?.name
                          : "Select a city"}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className=" p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search cities..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No cities found.</CommandEmpty>
                        <CommandGroup>
                          {homeCities?.map((city) => (
                            <CommandItem
                              value={city.name}
                              key={city.name}
                              onSelect={() => {
                                field.onChange(city.name);
                              }}
                            >
                              {city.name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  city.name === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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

          <div className="flex items-center gap-5 p-4 md:p-10">
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem className="flex-1 flex flex-col items-center">
                  <FormLabel htmlFor="logo">Company logo</FormLabel>
                  <FormControl>
                    <div className="flex flex-col items-start">
                      {selectedLogo ? (
                        <div className="relative size-28">
                          <X
                            onClick={() => {
                              handleDeleteImage(selectedLogo);
                              setSelectedLogo(undefined || null);
                              form.setValue("logo", undefined);
                            }}
                            className="absolute top-1 right-1 text-red-500 z-30 cursor-pointer hover:scale-105 hover:text-red-700"
                          />
                          <Image
                            src={selectedLogo.url}
                            alt="company logo"
                            fill
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <ImagePlus className="size-14 dark:text-white" />
                          <UploadButton
                            className="mt-4 ut-button:bg-[#1AB266] ut-button:ut-readying:bg-[#1AB266]/50 ut-button:text-black ut-allowed-content:hidden"
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              setSelectedLogo(res[0]);
                              field.onChange(res[0]);
                              setIsImageLoading(false);
                            }}
                            onUploadError={(error) => {
                              alert(`ERROR! ${error.message}`);
                            }}
                            onUploadProgress={() => {
                              setIsImageLoading(true);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="flex-1 flex flex-col items-center">
                  <FormLabel htmlFor="image">Featured image</FormLabel>
                  <FormControl>
                    <div className="flex flex-col items-start">
                      {selectedImage ? (
                        <div className="relative size-28">
                          <X
                            onClick={() => {
                              handleDeleteImage(selectedImage);
                              setSelectedImage(undefined || null);
                              form.setValue("image", undefined);
                            }}
                            className="absolute top-1 right-1 text-red-500 z-30 cursor-pointer hover:scale-105 hover:text-red-700"
                          />
                          <Image
                            src={selectedImage.url}
                            alt="company logo"
                            fill
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <ImagePlus className="size-14 dark:text-white" />
                          <UploadButton
                            className="mt-4 ut-button:bg-[#1AB266] ut-button:ut-readying:bg-[#1AB266]/50 ut-button:text-black ut-allowed-content:hidden"
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              setSelectedImage(res[0]);
                              field.onChange(res[0]);
                              setIsImageLoading(false);
                            }}
                            onUploadError={(error) => {
                              alert(`ERROR! ${error.message}`);
                            }}
                            onUploadProgress={() => {
                              setIsImageLoading(true);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
                              defaultValue={form.getValues(`hours.${i}.open`)}
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
                              defaultValue={form.getValues(`hours.${i}.closed`)}
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
          <FormField
            control={form.control}
            name="field"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="field">Company field of business</FormLabel>
                <FormControl>
                  <Input id="field" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="website">Company website</FormLabel>
                <FormControl>
                  <Input
                    id="website"
                    {...field}
                    placeholder="https://acme-corporation.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phone">Company phone number</FormLabel>
                <FormControl>
                  <PhoneInput
                    {...field}
                    placeholder="Enter a phone number"
                    defaultCountry="IL"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Button disabled={isImageLoading || isPending}>
              {isPending ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Updating company
                  details
                </>
              ) : (
                "Update company detials"
              )}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"destructive"}>Delete company</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="flex flex-col gap-3">
                  <DialogTitle>Delete {company.name}?</DialogTitle>
                  <DialogDescription>
                    Deleting this company will result in losing the companies
                    data, these changes cannot be reveresed.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    onClick={() => handleDeleteCompany(company.id)}
                    type="button"
                    variant={"destructive"}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="animate-spin mr-2" /> Deleting
                        company
                      </>
                    ) : (
                      "Delete company"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
}
