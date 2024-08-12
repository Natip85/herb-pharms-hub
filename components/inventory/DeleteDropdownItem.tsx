"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { deleteProduct } from "@/actions/products/deleteProduct";

export default function DeleteDropdownItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
          router.refresh();
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
