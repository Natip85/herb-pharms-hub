"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ResponsiveDialog } from "../responsiveDialog";
import AddProductForm from "./AddProductForm";
import { Product } from "@prisma/client";
import ActiveToggleDropdownItem from "./ActiveToggleDropdownItem";
import DeleteDropdownItem from "./DeleteDropdownItem";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions({
  row,
}: DataTableRowActionsProps<Product>) {
  const [isEditOpen, setIsEditOpen] = useState(false);
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-50 w-[160px]">
          <DropdownMenuItem className="font-base group flex w-full items-center justify-between p-0 text-left text-sm">
            <button
              onClick={() => {
                setIsEditOpen(true);
              }}
              className="flex w-full justify-start rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
            >
              Edit
            </button>
          </DropdownMenuItem>
          <ActiveToggleDropdownItem
            id={row.original.id}
            isAvailable={row.original.isAvailable}
          />
          <DropdownMenuSeparator />

          <DeleteDropdownItem id={row.original.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
