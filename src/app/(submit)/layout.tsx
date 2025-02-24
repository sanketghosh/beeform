import { Metadata } from "next";

export const metadata: Metadata = {
  title: "beeform",
  description: "Submit your form",
};

export default function SubmitLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
