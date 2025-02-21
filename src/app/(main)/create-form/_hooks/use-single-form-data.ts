import { Form } from "@prisma/client";
import { atom, useAtom } from "jotai";
import { useMemo } from "react";

// atoms
const formDataAtom = atom<Form>();

// custom hook for easier access
export const useSingleFormData = () => {
  const [formData, setFormData] = useAtom(formDataAtom);

  // persist to local storage
  useMemo(() => {
    if (formData) {
      localStorage.setItem(
        "single-form-data-store-formData",
        JSON.stringify(formData),
      );
    } else {
      localStorage.removeItem("single-form-data-store-formData");
    }
  }, [formData]);

  return {
    formData,
    setFormData,
  };
};
