"use client";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { AddCompanySchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  CheckIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  RocketIcon,
  X,
} from "lucide-react";
import { UploadButton } from "../uploadthing";
import { useState, useTransition } from "react";
import { ImageType } from "@prisma/client";
import Image from "next/image";
import axios from "axios";
import { City } from "country-state-city";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { COMPANY_FIELDS, DAY_HOURS, DISTRICTS, cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Textarea } from "../ui/textarea";
import { PhoneInput } from "../ui/phone-input";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import LogoutButton from "../auth/LogoutButton";
import { useCurrentUser } from "@/hooks/use-current-user";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addCompany } from "@/actions/company/addCompany";
import { useToast } from "../ui/use-toast";
const steps = [
  {
    id: "Step 1",
    name: "Company detials",
    fields: ["name", "description", "area", "city", "email"],
  },
  {
    id: "Step 2",
    name: "Contact information",
    fields: ["hours", "field", "website", "phone", "logo", "image"],
  },
  { id: "Step 3", name: "Submission review" },
  { id: "Step 4", name: "Complete" },
];
export default function AddCompanyForm() {
  const router = useRouter();
  const { toast } = useToast();
  const user = useCurrentUser();
  const [selectedLogo, setSelectedLogo] = useState<ImageType>();
  const [selectedImage, setSelectedImage] = useState<ImageType>();
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPending, startTransition] = useTransition();

  const delta = currentStep - previousStep;
  const homeCities = City.getCitiesOfCountry("IL");
  const form = useForm<z.infer<typeof AddCompanySchema>>({
    resolver: zodResolver(AddCompanySchema),
    defaultValues: {
      name: "",
      city: "",
      email: "",
      area: "",
      field: "",
      hours: [
        { day: "sunday", open: "", closed: "" },
        { day: "monday", open: "", closed: "" },
        { day: "tuesday", open: "", closed: "" },
        { day: "wednesday", open: "", closed: "" },
        { day: "thursday", open: "", closed: "" },
        { day: "friday", open: "", closed: "" },
        { day: "saturday", open: "", closed: "" },
      ],
      logo: undefined,
      image: undefined,
      description: "",
      website: "",
      phone: "",
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: "hours",
  });

  const onSubmit = async (data: z.infer<typeof AddCompanySchema>) => {
    if (!user) return;
    startTransition(() => {
      if (!user.id) return;
      addCompany(user.id, data)
        .then((data) => {
          if (data.error) {
            toast({
              title: "Error",
              description: `${data.error}`,
              variant: "destructive",
            });
            setCurrentStep(0);
            router.refresh();
          } else {
            toast({
              title: "Success",
              description: `${data.success}`,
              variant: "success",
            });
          }
        })
        .catch(() => console.log("Something went wrong at add company form"));
    });
  };

  async function handleDeleteImage(img: ImageType) {
    await axios.post("/api/uploadthing/delete", {
      img,
    });
  }
  type FieldName = keyof z.infer<typeof AddCompanySchema>;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(onSubmit)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };
  form.watch();

  return (
    <MaxWidthWrapper className="space-y-8">
      <h1 className="text-center text-2xl font-bold md:text-4xl">
        Add your business to HubPharmsHub
      </h1>
      <Alert className="mx-auto flex max-w-2xl items-center justify-between">
        <RocketIcon className="size-4" />
        <div className="w-full">
          <AlertTitle>Logged in as {user?.email}</AlertTitle>
          <AlertDescription>
            Create and submit your account for{" "}
            <span className="text-[#1AB266]">HerbPharmsHub</span> approval
          </AlertDescription>
        </div>
        <LogoutButton>Logout</LogoutButton>
      </Alert>
      <section className="inset-0 flex flex-col justify-between gap-10 p-2">
        <nav aria-label="Progress">
          <ul
            role="list"
            className="space-y-4 md:flex md:space-x-8 md:space-y-0"
          >
            {steps.map((step, index) => (
              <li key={step.name} className="md:flex-1">
                {currentStep > index ? (
                  <div className="group flex w-full flex-col border-l-4 border-[#1AB266] py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-[#1AB266] transition-colors">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                ) : currentStep === index ? (
                  <div
                    className="md:pt-4flex-col flex w-full border-l-4 border-[#1AB266] py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0"
                    aria-current="step"
                  >
                    <span className="text-sm font-medium text-[#1AB266]">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                ) : (
                  <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-gray-500 transition-colors">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {currentStep === 0 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex flex-col gap-3"
              >
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
                      <FormLabel htmlFor="description">
                        Company description
                      </FormLabel>
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
                          onValueChange={(value) =>
                            form.setValue("area", value)
                          }
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
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? homeCities?.find(
                                    (city) => city.name === field.value,
                                  )?.name
                                : "Select a city"}
                              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
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
                                      // form.setValue("city", city.name);
                                      field.onChange(city.name);
                                    }}
                                  >
                                    {city.name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        city.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
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
              </motion.div>
            )}
            {currentStep === 1 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center gap-5 p-4 md:p-10">
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-col items-center">
                        <FormLabel htmlFor="logo">Company logo</FormLabel>
                        <FormControl>
                          <div className="flex flex-col items-start">
                            {selectedLogo ? (
                              <div className="relative size-28">
                                <X
                                  onClick={() => {
                                    handleDeleteImage(selectedLogo);
                                    setSelectedLogo(undefined);
                                    form.setValue("logo", undefined);
                                  }}
                                  className="absolute right-1 top-1 z-30 cursor-pointer text-red-500 hover:scale-105 hover:text-red-700"
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
                                  className="mt-4 ut-button:bg-[#1AB266] ut-button:text-black ut-allowed-content:hidden ut-button:ut-readying:bg-[#1AB266]/50"
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
                      <FormItem className="flex flex-1 flex-col items-center">
                        <FormLabel htmlFor="image">Featured image</FormLabel>
                        <FormControl>
                          <div className="flex flex-col items-start">
                            {selectedImage ? (
                              <div className="relative size-28">
                                <X
                                  onClick={() => {
                                    handleDeleteImage(selectedImage);
                                    setSelectedImage(undefined);
                                    form.setValue("image", undefined);
                                  }}
                                  className="absolute right-1 top-1 z-30 cursor-pointer text-red-500 hover:scale-105 hover:text-red-700"
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
                                  className="mt-4 ut-button:bg-[#1AB266] ut-button:text-black ut-allowed-content:hidden ut-button:ut-readying:bg-[#1AB266]/50"
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
                                    defaultValue={form.getValues(
                                      `hours.${i}.open`,
                                    )}
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
                                    defaultValue={form.getValues(
                                      `hours.${i}.closed`,
                                    )}
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
                      <FormLabel htmlFor="field">
                        Company field of business
                      </FormLabel>
                      <FormControl>
                        <Select
                          defaultValue={form.getValues("field")}
                          onValueChange={(value) =>
                            form.setValue("field", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select company field" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {COMPANY_FIELDS.map((field) => (
                                <SelectItem key={field} value={field}>
                                  {field}
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
                      <FormLabel htmlFor="phone">
                        Company phone number
                      </FormLabel>
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
              </motion.div>
            )}
            {currentStep === 2 && (
              <div className="flex flex-col gap-3">
                <div className="relative h-[50vh] w-full">
                  <Image
                    src={selectedImage?.url || ""}
                    alt="company image"
                    fill
                    className="z-10"
                  />
                </div>
                <div className="mb-5 flex h-32 items-end gap-10">
                  <Image
                    src={selectedLogo?.url || ""}
                    alt="company logo"
                    width={150}
                    height={200}
                  />

                  <h3 className="text-2xl font-bold md:text-4xl">
                    {form.getValues("name")}
                  </h3>
                </div>

                <p>
                  <span className="font-bold">City:</span>{" "}
                  {form.getValues("city")}
                </p>
                <p>
                  <span className="font-bold">District:</span>{" "}
                  {form.getValues("area")}
                </p>
                <p>
                  <span className="font-bold">Field:</span>{" "}
                  {form.getValues("field")}
                </p>
                <p>
                  <span className="font-bold">Website:</span>{" "}
                  <Link href={form.getValues("website") || ""}>
                    {form.getValues("website")}
                  </Link>
                </p>
                <p>
                  <span className="font-bold">Phone:</span>{" "}
                  {form.getValues("phone")}
                </p>
                <p>
                  <span className="font-bold">Email:</span>{" "}
                  {form.getValues("email")}
                </p>
                <p>
                  <span className="font-bold">Description:</span>{" "}
                  {form.getValues("description")}
                </p>
                <h3 className="mx-auto w-fit border-b-[5px] p-1 text-2xl md:text-3xl">
                  Business hours
                </h3>
                {form.getValues("hours").map((day, i) => {
                  return (
                    <div
                      key={day.day}
                      className="flex items-center justify-between border-b p-1"
                    >
                      <span>{day.day}</span>
                      <span>
                        {day.open} - {day.closed}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
            {currentStep === 3 && (
              <div className="flex flex-col gap-8">
                <h2 className="text-2xl font-semibold leading-7 md:text-4xl">
                  Business submitted successfully!
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  Thank you for your submission! Your company detials have been
                  sent to the{" "}
                  <span className="text-[#1AB266]">HerbPharmsHub</span> admin
                  for review and final approval. Please check your email for any
                  issues with your request, missing documents and next steps.
                </p>
                <Button
                  type="button"
                  onClick={() => {
                    router.push("/my-businesses");
                    router.refresh();
                  }}
                  className="w-fit"
                >
                  Go to my businesses
                </Button>
              </div>
            )}
            <div className="mt-8 pt-5">
              <div className="flex justify-between gap-3">
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={prev}
                  disabled={currentStep === 0}
                  className={cn(
                    "px-2 py-1 text-sm font-semibold text-[#1AB266] shadow-sm ring-1 ring-inset ring-[#1AB266] hover:bg-[#d3f5e4]",
                    {
                      hidden: currentStep === 3,
                    },
                  )}
                >
                  <ChevronLeft />
                </Button>

                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={next}
                  disabled={currentStep === steps.length - 1 || isImageLoading}
                  className={cn(
                    "px-2 py-1 text-sm font-semibold text-[#1AB266] shadow-sm ring-1 ring-inset ring-[#1AB266] hover:bg-[#d3f5e4] dark:hover:text-black",
                    {
                      hidden: currentStep === 3,
                    },
                  )}
                >
                  {currentStep === 2 ? "Submit for approval" : <ChevronRight />}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </section>
    </MaxWidthWrapper>
  );
}
