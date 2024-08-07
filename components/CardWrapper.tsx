import CardBackButton from "./CardBackButton";
import CardHeading from "./CardHeading";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}
export default function CardWrapper({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <CardHeading label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>

      {showSocial && (
        <CardFooter>
          {/* <Social /> */}
          social hereeeee
        </CardFooter>
      )}
      <CardFooter>
        <CardBackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
}
