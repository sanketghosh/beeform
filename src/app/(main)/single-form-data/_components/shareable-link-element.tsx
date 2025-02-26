"use client";

// packages
import { useState } from "react";
import { CircleCheckIcon, CopyIcon } from "lucide-react";

// local modules
import { useToast } from "@/hooks/use-toast";

// components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SharableLinkElementProps = {
  sharableUrl?: string;
};

export default function SharableLinkElement({
  sharableUrl,
}: SharableLinkElementProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "SUCCESS!",
        description: "Link copied to clipboard.",
      });
      return true;
    } catch (error) {
      console.error("Failed to copy text: ", text);
      alert("Failed to copy text");
      return false;
    }
  };

  const fullUrlToShare = `http://${window.location.host}/submit/${sharableUrl}`;
  const urlCopyHandler = async () => {
    await copyToClipboard(fullUrlToShare);
    setIsCopied(true);
    setInterval(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="flex w-full items-center gap-2">
      <Input
        value={fullUrlToShare}
        readOnly
        className="bg-secondary/30 text-[13px] font-medium"
      />
      <Button size={"sm"} variant={"default"} onClick={urlCopyHandler}>
        {isCopied ? (
          <>
            <CircleCheckIcon /> Copied
          </>
        ) : (
          <>
            <CopyIcon />
            Copy
          </>
        )}
      </Button>
    </div>
  );
}
