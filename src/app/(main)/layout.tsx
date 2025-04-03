// packages
import type { Metadata } from "next";

// local modules
import "@/app/globals.css";
import Navbar from "./_components/navbar";
import { getSessionData } from "@/utils/get-session";

export const metadata: Metadata = {
  title: "FitFusion",
  description:
    "Create forms in minutes by just dragging and dropping components.",
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { name, email, authenticatedUserId } = await getSessionData();

  return (
    <div>
      <Navbar />
      <section className="w-full">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-10 md:px-6">
          {children}
        </div>
      </section>
    </div>
  );
}
