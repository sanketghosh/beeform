/** COMPONENTS */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AuthCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  footerText: string;
  footerHref: string;
};

export default function AuthCardWrapper({
  children,
  description,
  title,
  footerText,
  footerHref,
}: AuthCardProps) {
  return (
    <>
      {/*  <Link
        href={"/"}
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "sm",
          }),
        )}
      >
        <MoveLeftIcon />
        Back To Home
      </Link> */}
      <Card className="w-full sm:w-[400px] md:w-[450px] lg:w-[490px]">
        <CardHeader>
          <CardTitle className="font-boldonse">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {/* <CardFooter>
          <Link
            href={footerHref}
            className="text-sm font-medium underline underline-offset-4"
          >
            {footerText}
          </Link>
        </CardFooter> */}
      </Card>
    </>
  );
}
