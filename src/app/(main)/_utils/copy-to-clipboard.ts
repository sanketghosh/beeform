import { useToast } from "@/hooks/use-toast";

export const copyToClipboard = async (text: string) => {
  const { toast } = useToast();

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
