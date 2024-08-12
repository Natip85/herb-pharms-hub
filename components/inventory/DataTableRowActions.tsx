"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { Loader2, MoreHorizontal } from "lucide-react";
import { ResponsiveDialog } from "../responsiveDialog";
import AddProductForm from "./AddProductForm";
import { Product } from "@prisma/client";
import Link from "next/link";
import { deleteProduct } from "@/actions/products/deleteProduct";
import { useRouter } from "next/navigation";
import { toggleProductAvailability } from "@/actions/products/toggleProductAvailability";
import axios from "axios";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions({
  row,
}: DataTableRowActionsProps<Product>) {
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <ResponsiveDialog
        isOpen={isEditOpen}
        isEditOpen={setIsEditOpen}
        title="Edit"
        description="Edit your product. Any changes made will reflect immediately."
      >
        <AddProductForm product={row.original} isEditOpen={setIsEditOpen} />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        isEditOpen={setIsDeleteOpen}
        title="Delete"
        description={`Delete ${row.original.name}? This action cannot be undone.`}
      >
        <div className="flex justify-end px-4">
          <Button
            variant={"destructive"}
            onClick={async () => {
              startTransition(async () => {
                try {
                  await Promise.all([
                    deleteProduct(row.original.id),
                    axios.post("/api/uploadthing/delete", {
                      img: row.original.featuredImage,
                    }),
                    axios.post("/api/uploadthing/deleteMany", {
                      imageKeys: row.original.galleryImages.map(
                        (key) => key.key,
                      ),
                    }),
                  ]);
                  router.refresh();
                } catch (error) {
                  console.error("Error deleting product:", error);
                }
              });
            }}
            className="w-full md:w-fit"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Deleting
              </span>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </ResponsiveDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-50 w-[160px]">
          <DropdownMenuItem asChild>
            <Link href={"/"}>View</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button
              onClick={() => {
                setIsEditOpen(true);
              }}
              className="flex w-full justify-start rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
            >
              Edit
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                await toggleProductAvailability(
                  row.original.id,
                  !row.original.isAvailable,
                );
                router.refresh();
              });
            }}
          >
            {row.original.isAvailable ? "Deactivate" : "Activate"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild variant="destructive">
            <button
              onClick={() => {
                setIsDeleteOpen(true);
              }}
              className="flex w-full justify-start rounded-md"
            >
              Delete
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
