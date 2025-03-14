import MainLink from "@/components/main-link";

export default function Footer() {
  const footerLinks = [
    {
      href: "/",
      name: "Terms",
    },
    {
      href: "/",
      name: "License",
    },
    {
      href: "/",
      name: "Privacy",
    },
    {
      href: "/",
      name: "About us",
    },
  ];
  return (
    <footer className="pt-10">
      <div className="bg-primary text-black">
        <div className="mx-auto max-w-7xl justify-between px-4 py-10 sm:flex">
          <div className="space-y-6">
            <h1 className="font-instrumentSerif text-2xl font-bold">
              Beeform.
            </h1>
            <p className="max-w-md text-sm font-medium">
              Make interactive cool forms in minutes super fast without much
              hassle.
            </p>
            <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              {footerLinks.map((item, idx) => (
                <li
                  className="text-sm font-medium text-black underline underline-offset-4 duration-150"
                  key={item.name}
                >
                  <a key={idx} href={item.href}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="text-foreground">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <p className="text-center font-medium">
            &copy; 2025 Beeform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
