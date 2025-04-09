/* import { Form } from "@prisma/client";
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
}; */

import { Form } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FormStoreType {
  formData: Form | null;
  setFormData: (data: Form) => void;
}

export const useSingleFormData = create<FormStoreType>()(
  persist(
    (set) => ({
      formData: null,
      setFormData: (formData: Form) => {
        console.log("Setting Form Data:", formData);
        set({ formData });
      },
    }),
    {
      name: "single-form-data-store", // Key to save in localStorage
      partialize: (state) => ({
        formData: state.formData,
      }), // Optional: Save only selected fields
    },
  ),
);
