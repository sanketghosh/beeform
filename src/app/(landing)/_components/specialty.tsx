import { CircleCheckIcon } from "lucide-react";

export default function Specialty() {
  const specialtyArr = [
    "100% Open Source under MIT License, you can host yourself.",
    "You can start for absolutely free and no credit card required.",
    "Easy to use UI, just drag, drop and publish your form.",
    "Track how your form is performing, who is submitting and more.",
  ];

  return (
    <div className="mb-24 w-full bg-primary">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col-reverse items-center gap-5 px-4 py-10 text-primary-foreground md:flex-row md:justify-between md:py-4">
        <div className="space-y-4">
          <h2 className="font-instrumentSerif text-3xl font-semibold md:text-4xl lg:text-5xl">
            We are special. You know why ?
          </h2>
          <div className="space-y-2">
            {specialtyArr.map((item) => (
              <div
                key={item}
                className="flex gap-1 text-base font-medium md:text-base lg:items-center lg:text-lg"
              >
                <CircleCheckIcon size={20} />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <img src="/assets/work-party.svg" alt="hurray" className="size-96" />
      </div>
    </div>
  );
}
