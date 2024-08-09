"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Company } from "@prisma/client";
import AddProductForm from "./AddProductForm";
interface AddProductDialogProps {
  company: Company;
}
export default function AddProductDialog({ company }: AddProductDialogProps) {
  const [open, setOpen] = useState(false);

  function handleDialogOpen() {
    setOpen(!open);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant={"outline"} className="max-w-[150px]">
          <Plus className="mr-2 size-4" />
          Add inventory
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] max-w-[900px]">
        <DialogHeader className="px-2">
          <DialogTitle>
            Add inventory to{" "}
            <span className="text-2xl text-[#1AB266]">{company.name}</span>
          </DialogTitle>
          <DialogDescription>
            Add new inventory to your company. This will be visible to all users
          </DialogDescription>
        </DialogHeader>
        <AddProductForm handleDialogOpen={handleDialogOpen} />
      </DialogContent>
    </Dialog>
  );
}
