import { useContext } from "react";
import { FormBuilderContext } from "@/app/(main)/create-form/_contexts/form-builder-context";

export const useFormBuilderContext = () => {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error(
      "ERROR! useAuthContext must be used within an AuthContextProvider",
    );
  }
  return context;
};
