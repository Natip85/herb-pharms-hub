import DirectionHoverCard from "@/components/DirectionHoverCard";
import FAQAccordion from "@/components/FAQAccordion";
import HeroTextLoop from "@/components/HeroTextLoop";
import HeroVideo from "@/components/HeroVideo";
import StatementSection from "@/components/StatementSection";
import ThreeDCarousel from "@/components/ThreeDCarousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
        <div className="z-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5 md:gap-7">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            On HerbPharmsHub you get{" "}
            <HeroTextLoop words={words} duration={2000} />
          </h1>
          <p className="text-sm md:text-lg font-semibold text-center">
            Your one stop for the best pharmacies and cannabis strands
          </p>
          <div className="flex items-center justify-center gap-10">
            <Button>Join now</Button>
            <Button variant={"outline"} className="flex items-center gap-2">
              Find stock <ArrowRight />
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
      <div className="p-4 bg-secondary">
        <FAQAccordion />
      </div>
    </div>
  );
}
