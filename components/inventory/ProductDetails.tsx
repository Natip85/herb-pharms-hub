"use client";

import { Product } from "@prisma/client";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { formatPrice } from "@/lib/formatters";
import ReactImageSlider from "../ReactImageSlider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useState } from "react";
export default function ProductDetails({
  product,
}: {
  product: Product | null;
}) {
  if (!product) return;

  return (
    <MaxWidthWrapper className="min-h-screen p-10">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex-1 flex-shrink-0 overflow-hidden">
          <ReactImageSlider
            images={
              product
                ? product.galleryImages.map((img) => ({
                    original: img.url,
                    thumbnail: img.url,
                  }))
                : []
            }
          />
        </div>
        <div className="flex-1 px-5">
          <div className="mb-5 flex flex-col gap-3">
            <h3 className="text-2xl font-bold md:text-4xl">{product?.name}</h3>
            <div className="flex justify-between">
              <span className="font-semibold">Price</span>
              <span> {formatPrice(product?.price ? product.price : 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">THC range</span>
              <span>
                {product?.THCLevel.map((level) => `${level}%`).join(" - ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">CBD range</span>
              <span>
                {product?.CBDLevel.map((level) => `${level}%`).join(" - ")}
              </span>
            </div>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="underline">
                Description
              </AccordionTrigger>
              <AccordionContent>{product.description}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="underline">
                Cultivar facts
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Strain type</span>
                  <span>{product.strain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Breeder</span>
                  <span>{product.grower}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Lineage</span>
                  <div className="flex flex-col items-end">
                    <span>{product.parent1}</span>
                    <span>{product.parent2}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="underline">
                Grow facts
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Location</span>
                  <span>{product.madeIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Method</span>
                  <span>{product.cultivationMethod}</span>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
