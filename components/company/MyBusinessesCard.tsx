"use client";

import { Company } from "@prisma/client";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function MyBusinessesCard({
  companies,
}: {
  companies: Company[];
}) {
  return (
    <div className="my-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
      {companies.map((co) =>
        co.isCompanyVerified ? (
          <Card key={co.id} className="flex flex-col justify-between p-2">
            <CardContent className="flex h-full justify-between gap-5">
              <Badge variant={"success"} className="size-fit">
                Active
              </Badge>
              <div className="relative h-full flex-1">
                <Image
                  src={co.logo?.url || ""}
                  alt={co.image?.name || ""}
                  fill
                />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-2xl font-semibold">{co.name}</span>
                <span className="line-clamp-5">{co.description}</span>
              </div>
            </CardContent>
            <div className="my-3 text-sm">{co.field}</div>
            <CardFooter className="flex gap-3 p-0">
              <div>
                <Link
                  href={`/my-businesses/${co.id}/edit`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Edit company details
                </Link>
              </div>
              <Link
                href={`/my-businesses/${co.id}/manage-inventory`}
                className={buttonVariants()}
              >
                Manage inventory
              </Link>
            </CardFooter>
          </Card>
        ) : (
          <Card key={co.id} className="flex flex-col justify-between p-2">
            <CardContent className="flex h-full justify-between gap-5">
              <Badge variant={"destructive"} className="size-fit">
                Awaiting approval{" "}
              </Badge>
              <div className="relative h-full flex-1">
                <Image
                  src={co.logo?.url || ""}
                  alt={co.image?.name || ""}
                  fill
                />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-2xl font-semibold">{co.name}</span>
                <span className="line-clamp-5">{co.description}</span>
              </div>
            </CardContent>
            <div className="my-3 text-sm">{co.field}</div>
            <CardFooter className="flex gap-3 p-0">
              <Button variant={"outline"}>Contact support</Button>
            </CardFooter>
          </Card>
        ),
      )}
    </div>
  );
}
