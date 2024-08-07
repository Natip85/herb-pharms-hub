import Link from "next/link";
import { Button } from "./ui/button";
interface CardBackButtonProps {
  href: string;
  label: string;
}
export default function CardBackButton({ href, label }: CardBackButtonProps) {
  return (
    <Button variant={"link"} size={"sm"} className="font-normal w-full" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}
