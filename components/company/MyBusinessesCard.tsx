"use client";

import { Company } from "@prisma/client";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { EditIcon, RocketIcon } from "lucide-react";
import Link from "next/link";

export default function MyBusinessesCard({
  companies,
}: {
  companies: Company[];
}) {
  return (
    <div className="flex flex-col gap-5 my-5">
      {companies.map((co) =>
        co.isCompanyVerified ? (
          <Card key={co.id} className="p-2">
            <span className="text-[#1AB266]">Active</span>
            <CardContent className="flex gap-5">
              <div className="relative size-28">
                <Image
                  src={co.logo?.url || ""}
                  alt={co.image?.name || ""}
                  fill
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-semibold">{co.name}</span>
                <span>{co.description}</span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-3">
              <Link
                href={`/my-businesses/${co.id}/edit`}
                className={buttonVariants()}
              >
                <EditIcon className="size-4 mr-2" /> Edit
              </Link>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        ) : (
          <Card key={co.id} className="p-2 space-y-3">
            <span className="text-destructive">In progress</span>

            <Alert className="flex items-center justify-between w-full bg-[#1AB266]">
              <RocketIcon className="size-4" />
              <div className="w-full">
                <AlertTitle>Awaiting approval</AlertTitle>
                <AlertDescription>
                  Awaiting on HerbPharmsHub admin to approve business request
                </AlertDescription>
              </div>
            </Alert>
            <CardContent className="flex gap-5">
              <div className="relative size-28">
                <Image
                  src={co.logo?.url || ""}
                  alt={co.image?.name || ""}
                  fill
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-semibold">{co.name}</span>
                <span>{co.description}</span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        )
      )}
    </div>
  );
}
