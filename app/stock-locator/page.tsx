import { Tabs } from "@/components/Tabs";
import { DataTable } from "@/components/inventory/ProductDataTable";
import db from "@/db/db";

export default async function StockLocatorPage() {
  const allProducts = await db.product.findMany({});
  const tabs = [
    {
      title: "Products",
      value: "products",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#1AB266] bg-background p-4 text-xl font-bold md:text-4xl">
          <p>Products</p>
          <DataTable products={allProducts} />
        </div>
      ),
    },
    {
      title: "Pharmacies",
      value: "pharmacies",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#1AB266] bg-background p-4 text-xl font-bold md:text-4xl">
          <p>Pharmacies</p>
          <DataTable products={[]} />
        </div>
      ),
    },
  ];
  return (
    <div className="relative mx-auto my-40 flex h-[70vh] w-full max-w-7xl flex-col items-start justify-start p-4 [perspective:1000px]">
      <Tabs tabs={tabs} />
    </div>
  );
}
