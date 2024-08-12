"use client";

import React from "react";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DataTableRowActions } from "./DataTableRowActions";
import { Product } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatPrice } from "@/lib/formatters";
import { CheckCircle2, XCircle } from "lucide-react";

export const columns: ColumnDef<Product>[] = [
  {
    id: "isAvailable",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.isAvailable ? (
            <>
              <span className="sr-only">Available</span>
              <CheckCircle2 className="stroke-[#1AB266]" />
            </>
          ) : (
            <>
              <span className="sr-only">Unavailable</span>
              <XCircle className="stroke-destructive" />
            </>
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const name = row.original.name as string;
      const image = row.original.featuredImage.url as string;

      return (
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <div className="capitalize">{name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "THCLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="THC level" />
    ),
    cell: ({ row }) => {
      const thcLevel = row.original.THCLevel;

      return (
        <div className="capitalize">
          {thcLevel.map((level) => `${level}%`).join(" - ")}
        </div>
      );
    },
  },
  {
    accessorKey: "CBDLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CBD level" />
    ),
    cell: ({ row }) => {
      const cbdLevel = row.original.CBDLevel;

      return (
        <div className="capitalize">
          {cbdLevel.map((level) => `${level}%`).join(" - ")}
        </div>
      );
    },
  },
  {
    accessorKey: "strain",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Strain" />
    ),
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("strain")}</div>;
    },
  },
  {
    accessorKey: "grower",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cultivator" />
    ),
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("grower")}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="capitalize">{formatPrice(row.getValue("price"))}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
