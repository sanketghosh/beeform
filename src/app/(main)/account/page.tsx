// packages
import { formatDate } from "date-fns";

// local modules
import { getSessionData } from "@/utils/get-session";

// components
import LogoutButton from "@/app/(main)/_components/buttons/logout-button";

export default async function Account() {
  const { email, name, sessionCreatedAt, sessionExpiresAt, image } =
    await getSessionData();

  return (
    <div className="max-w-xl">
      <div className="space-y-4 rounded-md border p-4">
        {image ? (
          <img
            src="/assets/alien_one.jpeg"
            alt={name}
            className="size-14 rounded-md object-cover"
          />
        ) : (
          <div className="flex size-14 items-center justify-center rounded-md border bg-secondary text-2xl font-bold">
            {name?.charAt(0)}
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold md:text-2xl xl:text-3xl">
            {name}
          </h2>
          <p className="font-medium text-muted-foreground md:text-lg xl:text-2xl">
            {email}
          </p>
        </div>
        <div className="w-1/2 lg:w-1/3">
          <LogoutButton />
        </div>
      </div>
      <p className="mt-5 rounded-md border p-3">
        Session created on <b>{formatDate(sessionCreatedAt!, "dd/mm/yyyy")}</b>{" "}
        and session expires on{" "}
        <b>{formatDate(sessionExpiresAt!, "dd/mm/yyyy")}</b>
      </p>
    </div>
  );
}
