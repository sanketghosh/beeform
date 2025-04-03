import Link from "next/link";
import { ActivitySquareIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <nav className="w-full bg-secondary/20">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href={"/dashboard"} className="flex items-center gap-1">
          <ActivitySquareIcon size={26} />
          <h1 className="font-boldonse text-base">FitFusion</h1>
        </Link>
        <Avatar>
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
