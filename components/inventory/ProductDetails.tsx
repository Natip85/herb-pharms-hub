"use client";

import { Product } from "@prisma/client";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { formatPrice } from "@/lib/formatters";
import ReactImageSlider from "../ReactImageSlider";
export default function ProductDetails({
  product,
}: {
  product: Product | null;
}) {
  console.log("PROD>>>", product);
  if (!product) return;
  return (
    <MaxWidthWrapper className="min-h-screen p-10">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex-1 flex-shrink-0 overflow-hidden">
          <ReactImageSlider
            images={product.galleryImages.map((img) => ({
              original: img.url,
              thumbnail: img.url,
            }))}
          />
        </div>
        <div className="flex-1">
          <p className="text-2xl font-semibold md:text-4xl">{product?.name}</p>
          <p className="text-2xl font-semibold md:text-4xl">
            {product?.strain}
          </p>
          <p className="text-2xl font-semibold md:text-4xl">
            {product?.cultivationMethod}
          </p>

          <p>
            <span className="font-semibold">THC level:</span>{" "}
            {product?.THCLevel.map((level) => `${level}%`).join(" - ")}
          </p>
          <p>
            <span className="font-semibold">CBD level:</span>{" "}
            {product?.CBDLevel.map((level) => `${level}%`).join(" - ")}
          </p>
          <p className="text-2xl font-semibold md:text-4xl">{product?.brand}</p>

          <p className="text-2xl font-semibold md:text-4xl">
            {product?.grower}
          </p>
          <p className="text-2xl font-semibold md:text-4xl">
            {product?.madeIn}
          </p>

          <p>
            <span className="font-semibold">Price:</span>{" "}
            {formatPrice(product?.price ? product.price : 0)}
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
