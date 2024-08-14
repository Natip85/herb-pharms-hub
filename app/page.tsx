import DirectionHoverCard from "@/components/homePage/DirectionHoverCard";
import FAQAccordion from "@/components/homePage/FAQAccordion";
import HeroTextLoop from "@/components/homePage/HeroTextLoop";
import HeroVideo from "@/components/homePage/HeroVideo";
import StatementSection from "@/components/homePage/StatementSection";
import ThreeDCarousel from "@/components/homePage/ThreeDCarousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
const words = [
  "medicinal oils",
  "the best strands",
  "top pharmacies",
  "stock locator",
  "customer reviews",
];
export default function HomePage() {
  const imageUrls = [
    {
      url: "https://utfs.io/f/88e1b325-2e21-4f8e-9593-52b5e43c8825-ua795o.png",
      category: "Medical cannabis",
    },
    {
      url: "https://utfs.io/f/fb00672c-05ad-4020-8c4f-4dfc4e5849e4-ua7933.png",
      category: "Pre rolled joints",
    },
    {
      url: "https://utfs.io/f/a1cb5070-94ad-4e0d-836c-8b38af0319b1-ua794t.png",
      category: "Medical cannabis oils",
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="relative md:-mt-20">
        <div className="absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-5 md:gap-7">
          <h1 className="text-center text-2xl font-bold md:text-4xl">
            On HerbPharmsHub you get{" "}
            <HeroTextLoop words={words} duration={2000} />
          </h1>
          <p className="text-center text-sm font-semibold md:text-lg">
            Your one stop for the best pharmacies and cannabis strands
          </p>
          <div className="flex items-center justify-center gap-10">
            <Button className="flex items-center gap-2" asChild>
              <Link href={"/add-business"}>
                Join now <ArrowRight />
              </Link>
            </Button>
            <Button variant={"outline"} asChild>
              <Link href={"/stock-locator"}>Find stock</Link>
            </Button>
          </div>
        </div>
        <HeroVideo />
      </div>
      <div className="relative flex items-center justify-center p-10">
        <DirectionHoverCard imageUrls={imageUrls} />
      </div>
      <div className="bg-secondary p-4">
        <StatementSection />
      </div>
      <div className="p-10">
        <ThreeDCarousel />
      </div>
      <div className="bg-secondary p-4">
        <FAQAccordion />
      </div>
    </div>
  );
}
