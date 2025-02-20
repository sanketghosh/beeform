import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Free plan",
      desc: "Sign up and start for free. Credit card is not needed. Upgrade anytime.",
      price: 0,
      isMostPop: false,
      features: [
        "Build upto 2 forms.",
        "Access forever",
        "Stats and analytics available.",
        "Export data to spreadsheet.",
      ],
    },
    {
      name: "Professional",
      desc: "Our most loved plan. Might be perfectly suitable for you too.",
      price: 30,
      isMostPop: true,
      features: [
        "Build upto 120 forms.",
        "Access forms forever.",
        "Stats and analytics available.",
        "Export data to spreadsheet.",
        "Special customer care access.",
      ],
    },
    {
      name: "Enterprise",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 250,
      isMostPop: false,
      features: [
        "Build upto 1000 forms.",
        "Access forms forever.",
        "Stats and analytics available.",
        "Export data to spreadsheet.",
        "Special customer care access.",
      ],
    },
  ];

  return (
    <section className="mb-10 pt-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative mx-auto max-w-xl sm:text-center">
          <h3 className="font-instrumentSerif text-3xl font-semibold sm:text-4xl md:text-4xl lg:text-5xl">
            Pricing for all sizes
          </h3>
          <div className="mt-3 max-w-xl text-muted-foreground">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              efficitur consequat nunc.
            </p>
          </div>
        </div>
        <div className="mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
          {plans.map((item, idx) => (
            <div
              key={idx}
              className={`relative mt-6 flex flex-1 flex-col items-stretch rounded-xl border-2 border-primary bg-secondary sm:mt-0 ${item.isMostPop ? "mt-10" : ""}`}
            >
              {item.isMostPop ? (
                <span className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full border bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground shadow-md">
                  Most popular
                </span>
              ) : (
                ""
              )}
              <div className="space-y-4 border-b border-primary p-8">
                <span className="font-medium text-primary">{item.name}</span>
                <div className="text-3xl font-semibold">
                  ${item.price}{" "}
                  <span className="text-xl font-normal text-muted-foreground">
                    /mo
                  </span>
                </div>
                <p>{item.desc}</p>
                <Button size={"lg"} className="w-full">
                  Get Started
                </Button>
              </div>
              <ul className="space-y-3 p-8">
                <li className="pb-2 font-medium">
                  <p>Features</p>
                </li>
                {item.features.map((featureItem, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckIcon size={20} className="stroke-primary" />
                    {featureItem}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 w-fit">
          <div className="rounded-full border bg-secondary/30 px-3 py-1 text-center text-lg font-semibold">
            Also customized pricing available, contact us.
          </div>
        </div>
      </div>
    </section>
  );
}
