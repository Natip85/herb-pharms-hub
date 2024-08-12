"use client";
import { useTransition } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toggleProductAvailability } from "@/actions/products/toggleProductAvailability";

export default function ActiveToggleDropdownItem({
  id,
  isAvailable,
}: {
  id: string;
  isAvailable: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailable);
          router.refresh();
        });
      }}
    >
      {isAvailable ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
}
