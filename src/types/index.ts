export type NavbarDataType = {
  href: string;
  label: string;
  variant:
    | "secondary"
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "ghost"
    | null
    | undefined;
};

export type SessionDataType = {
  sessionCreatedAt: Date | undefined;
  sessionExpiresAt: Date | undefined;
  authenticatedUserId: string | undefined;
  name: string | undefined;
  email: string | undefined;
  image: string | null | undefined;
};

export type StatsCardsType = {
  title: string;
  desc?: string;
  statsNumber: number;
  isPercentage: boolean;
};

export type SortOrderType = "latest" | "oldest";
