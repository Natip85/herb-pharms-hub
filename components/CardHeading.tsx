import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
interface CardHeadingProps {
  label: string;
}
export default function CardHeading({ label }: CardHeadingProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-6xl font-semibold", font.className)}>🔐 HPH</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
