export type LocationDataType = {
  label: string;
  submissions: number;
};

export type DateWiseLocationStats = {
  date: string;
  locations: LocationDataType[];
};
