import ProductDetails from "@/components/inventory/ProductDetails";
import db from "@/db/db";
import { redirect } from "next/navigation";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });
  if (!id) {
    redirect("/");
  }
  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
