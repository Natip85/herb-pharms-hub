"use client";

import { Company, ImageType, Product } from "@prisma/client";
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
import { DialogFooter } from "../ui/dialog";
import { CheckIcon, ChevronDown, ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { UploadButton, UploadDropzone } from "../uploadthing";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Slider } from "../ui/slider";
import { CULTIVATION_METHODS, STRAINS, cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Country } from "country-state-city";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import axios from "axios";
import { addProduct } from "@/actions/products/addProduct";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { editProduct } from "@/actions/products/editProduct";

interface AddProductFormProps {
  product?: Product;
  company?: Company;
  isEditOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function AddProductForm({
  product,
  company,
  isEditOpen,
}: AddProductFormProps) {
  console.log("THE PROD>>>>", product);

  const router = useRouter();
  const { toast } = useToast();
  const [selectedFeaturedImage, setSelectedFeaturedImage] =
    useState<ImageType>();
  const [selectedGalleryImages, setSelectedGalleryImages] =
    useState<ImageType[]>();

  const [preSelectedGalleryImages, setPreSelectedGalleryImages] = useState<
    File[]
  >([]);

  const [selectedTHCLevels, setSelectedTHCLevels] = useState(
    product?.THCLevel || [0, 0],
  );
  const [selectedCBDLevels, setSelectedCBDLevels] = useState(
    product?.CBDLevel || [0, 0],
  );
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const countries = Country.getAllCountries();

  const handleTHCLevelChange = (newValues: any) => {
    setSelectedTHCLevels(newValues);
  };
  const handleCBDLevelChange = (newValues: any) => {
    setSelectedCBDLevels(newValues);
  };
  const form = useForm<z.infer<typeof AddProductSchema>>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: product || {
      name: "",
      strain: [],
      featuredImage: undefined,
      galleryImages: undefined,
      price: 0,
      THCLevel: undefined,
      CBDLevel: undefined,
      grower: "",
      brand: "",
      madeIn: "",
      parent1: "",
      parent2: "",
      cultivationMethod: "",
    },
  });
  useEffect(() => {
    if (product?.featuredImage) {
      setSelectedFeaturedImage(product.featuredImage);
    }
    if (product?.galleryImages) {
      setSelectedGalleryImages(product.galleryImages);
    }
  }, []);
  const onSubmit = async (data: z.infer<typeof AddProductSchema>) => {
    if (product) {
      //EDIT
      startTransition(() => {
        editProduct(product.id, data)
          .then((res) => {
            if (res.error) {
              toast({
                title: "Error",
                description: `${res.error}`,
                variant: "destructive",
              });

              router.refresh();
            } else {
              toast({
                title: "Success",
                description: `${res.success}`,
                variant: "success",
              });
              if (isEditOpen) {
                isEditOpen(false);
              }
              router.refresh();
            }
          })
          .catch(() =>
            console.log("Something went wrong at edit product form"),
          );
      });
    } else {
      //CREATE
      startTransition(() => {
        if (!company?.id) return;
        addProduct(company.id, data)
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
              router.refresh();
            }
          })
          .catch(() => console.log("Something went wrong at add product form"));
      });
    }
  };
  async function handleDeleteImage(img: ImageType) {
    await axios.post("/api/uploadthing/delete", {
      img,
    });
  }

  form.watch();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid h-[50vh] grid-cols-2 gap-5 overflow-y-auto p-2">
          <div className="col-span-2 md:flex">
            <FormField
              control={form.control}
              name="featuredImage"
              render={({ field }) => (
                <FormItem className="flex flex-1 flex-col items-center p-2">
                  <FormLabel htmlFor="featuredImage">Featured image</FormLabel>
                  <FormControl>
                    <div className="flex flex-col items-start">
                      {selectedFeaturedImage ? (
                        <div className="relative size-28">
                          <X
                            onClick={() => {
                              handleDeleteImage(selectedFeaturedImage);
                              setSelectedFeaturedImage(undefined);
                              form.control._reset();
                            }}
                            className="absolute right-1 top-1 z-30 cursor-pointer text-red-500 hover:scale-105 hover:text-red-700"
                          />
                          <Image
                            src={selectedFeaturedImage.url}
                            alt="company logo"
                            fill
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <ImagePlus className="mb-3 size-28 dark:text-white" />
                          <UploadButton
                            className="mt-4 ut-button:bg-[#1AB266] ut-button:text-black ut-allowed-content:hidden ut-button:ut-readying:bg-[#1AB266]/50"
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              setSelectedFeaturedImage(res[0]);
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
              name="galleryImages"
              render={({ field }) => (
                <FormItem className="flex flex-1 flex-col items-center p-2">
                  <FormLabel htmlFor="galleryImages">Gallery images</FormLabel>
                  <FormControl>
                    <div className="flex flex-col items-center">
                      <UploadDropzone
                        className="h-fit flex-grow border border-secondary p-2"
                        endpoint="galleryImagesUploader"
                        appearance={{
                          uploadIcon: "hidden",
                          allowedContent: "hidden",
                          container: "border-[#1AB266]",
                          button: "bg-[#1AB266] cursor-pointer",
                          label: "text-[#1AB266] hover:text-green-700",
                        }}
                        onClientUploadComplete={(res) => {
                          setSelectedGalleryImages((prev) => {
                            if (prev) {
                              return [...prev, ...res];
                            } else {
                              return res;
                            }
                          });
                          if (selectedGalleryImages) {
                            field.onChange([...selectedGalleryImages, ...res]);
                          } else {
                            field.onChange(res);
                          }

                          setPreSelectedGalleryImages([]);
                          setIsImageLoading(false);
                        }}
                        onUploadError={(error: Error) => {
                          alert(`ERROR! ${error.message}`);
                        }}
                        onUploadBegin={(name) => {}}
                        onDrop={(acceptedFiles) => {
                          setPreSelectedGalleryImages(acceptedFiles);
                          setIsImageLoading(true);
                        }}
                      />
                      <div className="grid grid-cols-3 gap-3">
                        {selectedGalleryImages &&
                          selectedGalleryImages.map((img) => (
                            <div key={img.key} className="relative size-16">
                              <X
                                onClick={() => {
                                  handleDeleteImage(img);
                                  const filteredImages =
                                    selectedGalleryImages.filter(
                                      (deleted) => deleted !== img,
                                    );
                                  setSelectedGalleryImages(filteredImages);
                                  if (selectedGalleryImages.length > 0) {
                                    form.setValue(
                                      "galleryImages",
                                      filteredImages,
                                    );
                                  } else {
                                    form.setValue("galleryImages", []);
                                  }
                                }}
                                className="absolute right-1 top-1 z-30 cursor-pointer text-red-500 hover:scale-105 hover:text-red-700"
                              />
                              <Image src={img.url} alt="company logo" fill />
                            </div>
                          ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input id="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormLabel htmlFor="strain">Strain</FormLabel>

            {STRAINS.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name="strain"
                render={({ field }) => (
                  <FormItem className="mt-2 flex items-center gap-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== item.id,
                                ),
                              );
                        }}
                      />
                    </FormControl>
                    <div className="flex flex-col gap-2">
                      <FormLabel htmlFor="strain">{item.label}</FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>
          <FormField
            control={form.control}
            name="cultivationMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="cultivationMethod">
                  Cultivation method
                </FormLabel>
                <FormControl>
                  <Select
                    defaultValue={form.getValues("cultivationMethod")}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select cultivation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {CULTIVATION_METHODS.map((method) => (
                          <SelectItem key={method.id} value={method.label}>
                            {method.label}
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
            name="THCLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="THCLevel">THC level</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-3">
                    <Slider
                      defaultValue={product?.THCLevel || [0, 0]}
                      minStepsBetweenThumbs={1}
                      max={30}
                      min={0}
                      step={0.1}
                      onValueChange={(e) => {
                        handleTHCLevelChange(e);
                        field.onChange(e);
                      }}
                      className={cn("w-full")}
                    />
                    <div className="flex flex-wrap">
                      <ol className="flex w-fit items-center gap-1">
                        {selectedTHCLevels.map((value, index) => (
                          <div key={index} className="flex">
                            <li className="flex h-6 w-fit items-center justify-between rounded-md border px-1">
                              <span className="text-sm">{value}</span>
                              <span className="text-sm">%</span>
                            </li>
                            {index < selectedTHCLevels.length - 1 && (
                              <span className="ml-1 flex items-center justify-center">
                                -
                              </span>
                            )}
                          </div>
                        ))}
                      </ol>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="CBDLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="CBDLevel">CBD level</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-3">
                    <Slider
                      defaultValue={product?.THCLevel || [0, 0]}
                      minStepsBetweenThumbs={1}
                      max={30}
                      min={0}
                      step={0.1}
                      onValueChange={(e) => {
                        handleCBDLevelChange(e);
                        field.onChange(e);
                      }}
                      className={cn("w-full")}
                    />
                    <div className="flex flex-wrap">
                      <ol className="flex w-fit items-center gap-1">
                        {selectedCBDLevels.map((value, index) => (
                          <div key={index} className="flex">
                            <li className="flex h-6 w-fit items-center justify-between rounded-md border px-1">
                              <span className="text-sm">{value}</span>
                              <span className="text-sm">%</span>
                            </li>
                            {index < selectedCBDLevels.length - 1 && (
                              <span className="ml-1 flex items-center justify-center">
                                -
                              </span>
                            )}
                          </div>
                        ))}
                      </ol>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="grower"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="grower">
                  Cultivator <span className="text-xs">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input id="grower" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="brand">Brand</FormLabel>
                <FormControl>
                  <Input id="brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="madeIn"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2 mt-1">Made in</FormLabel>
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
                          ? countries?.find(
                              (country) => country.name === field.value,
                            )?.name
                          : "Select a country"}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search countries..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No countries found.</CommandEmpty>
                        <CommandGroup>
                          {countries?.map((country) => (
                            <CommandItem
                              value={country.name}
                              key={country.name}
                              onSelect={() => {
                                field.onChange(country.name);
                              }}
                            >
                              {country.name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  country.name === field.value
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
            name="price"
            render={({ field }) => (
              <FormItem className="m-0 p-0">
                <FormLabel htmlFor="price">Price</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-muted-foreground">$</span>
                    </div>
                    <Input
                      id="price"
                      type="number"
                      min={0}
                      max={10000}
                      step={0.01}
                      placeholder="0.00"
                      className="pl-9"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parent1"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="parent1">
                  Parent #1 <span className="text-xs">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input id="parent1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parent2"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="parent2">
                  Parent #2 <span className="text-xs">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input id="parent2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="p-2">
          <Button disabled={isImageLoading || isPending} type="submit">
            Submit
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
