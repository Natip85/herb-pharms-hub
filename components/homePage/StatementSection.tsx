import Image from "next/image";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Button } from "../ui/button";

export default function StatementSection() {
  return (
    <MaxWidthWrapper className="flex flex-col items-center p-4 bg-secondary gap-7">
      <div className="relative">
        <div className="size-0.5 bg-black dark:bg-white min-w-96" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1 bg-secondary">
          <Image src={"/logo.png"} alt="logo" width={30} height={30} />
        </div>
      </div>
      <h1 className="text-2xl md:text-4xl font-bold">Who are we?</h1>
      <p>
        <span className="text-[#1AB266] font-semibold">HerbPharmsHub</span> is a
        leading medical cannabis index in Israel (founded in 2024), providing
        services to thousands of patients and visitors each month.
      </p>
      <p>
        <span className="text-[#1AB266] font-semibold">HerbPharmsHub</span> aims
        to provide useful and comprehensive information for medical cannabis
        patients and those interested in the field, facilitate the convenient
        purchase of high-quality products at fair prices, and promote respectful
        dialogue.
      </p>
      <p>
        On <span className="text-[#1AB266] font-semibold">HerbPharmsHub</span>,
        you can find pharmacies and their available cannabis product inventory,
        compare prices of strains, place orders online, read patient reviews and
        recommendations, and more.
      </p>
      <p>
        <span className="text-[#1AB266] font-semibold">HerbPharmsHub</span>, was
        established in the context of the medical cannabis reform
        ("medicalization") and operates under a company with licenses from the
        Ministries of Health and Justice, adhering to stringent security and
        quality standards.
      </p>
      <div>
        <Button>Search and compare products now!</Button>
      </div>
    </MaxWidthWrapper>
  );
}
