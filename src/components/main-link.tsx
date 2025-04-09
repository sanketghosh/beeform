import Beehive from "@/assets/beehive";
import { cn } from "@/lib/utils";
import { FingerprintIcon, ZapIcon } from "lucide-react";
import Link from "next/link";

type MainLinkProps = React.ComponentPropsWithRef<"a">;

export default function MainLink({ className }: MainLinkProps) {
  return (
    <Link
      href={"/"}
      className={cn("font-boldonse flex items-center gap-1", className)}
    >
      <ZapIcon className="fill-primary" />
      zapform
    </Link>
  );
}
