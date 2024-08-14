"use client";

import { Company } from "@prisma/client";
import { Button, buttonVariants } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Store } from "lucide-react";

export default function MyBusinessesCard({
  companies,
}: {
  companies: Company[];
}) {
  return (
    <div className="my-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
      {companies.map((co) =>
        co.isCompanyVerified ? (
          <div
            key={co.id}
            className="group relative flex w-full flex-col justify-between gap-3 overflow-hidden rounded border-[1px] border-[#1AB266] bg-background p-4"
          >
            <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-[#18844e] to-[#1AB266] transition-transform duration-300 group-hover:translate-y-[0%]" />

            <Store className="absolute -right-12 -top-12 z-10 size-32 text-9xl text-secondary transition-transform duration-300 group-hover:rotate-12 group-hover:text-[#18844e] md:size-36 lg:size-40" />
            <Badge
              variant={"success"}
              className="relative size-fit border transition-colors duration-300 group-hover:bg-white group-hover:text-[#18844e]"
            >
              Active
            </Badge>
            <div className="relative flex gap-2">
              <Image
                src={co.logo?.url || ""}
                alt="logo"
                width={50}
                height={50}
                className="rounded transition-colors duration-300 group-hover:border group-hover:border-white"
              />
              <h3 className="relative z-10 text-lg font-medium duration-300 group-hover:text-white">
                {co.name}
              </h3>
            </div>
            <p className="relative z-10 text-sm text-slate-400 duration-300 group-hover:text-violet-200">
              {co.field}
            </p>
            <div className="flex gap-3">
              <Link
                href={`/my-businesses/${co.id}/edit`}
                className={`relative ${buttonVariants({ variant: "outline" })}`}
              >
                Edit company info
              </Link>
              <Link
                href={`/my-businesses/${co.id}/manage-inventory`}
                className={`relative ${buttonVariants({ variant: "outline" })}`}
              >
                Manage stock
              </Link>{" "}
            </div>
          </div>
        ) : (
          <div
            key={co.id}
            className="group relative flex w-full flex-col justify-between gap-3 overflow-hidden rounded border-[1px] border-[#1AB266] bg-background p-4"
          >
            <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-[#18844e] to-[#1AB266] transition-transform duration-300 group-hover:translate-y-[0%]" />

            <Store className="absolute -right-12 -top-12 z-10 size-32 text-9xl text-secondary transition-transform duration-300 group-hover:rotate-12 group-hover:text-[#18844e] md:size-36 lg:size-40" />
            <Badge
              variant={"destructive"}
              className="relative size-fit border transition-colors duration-300"
            >
              Awaiting approval
            </Badge>
            <div className="relative flex gap-2">
              <Image
                src={co.logo?.url || ""}
                alt="logo"
                width={50}
                height={50}
                className="rounded transition-colors duration-300 group-hover:border group-hover:border-white"
              />
              <h3 className="relative z-10 text-lg font-medium duration-300 group-hover:text-white">
                {co.name}
              </h3>
            </div>
            <p className="relative z-10 text-sm text-slate-400 duration-300 group-hover:text-violet-200">
              {co.field}
            </p>
            <Button variant={"outline"} className="relative w-fit">
              Contact support
            </Button>
          </div>
        ),
      )}
    </div>
  );
}
