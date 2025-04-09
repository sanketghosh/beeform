"use client";

// components
// layout elements
import { TitleFieldFormElement } from "@/app/(main)/create-form/_components/form-builder/elements/layout-elements/title-field";
import { SubtitleFieldFormElement } from "@/app/(main)/create-form/_components/form-builder/elements/layout-elements/subtitle-field";
import { ParagraphFieldFormElement } from "@/app/(main)/create-form/_components/form-builder/elements/layout-elements/paragraph-field";
import { SpacerFieldFormElement } from "@/app/(main)/create-form/_components/form-builder/elements/layout-elements/spacer-field";
import { SeparatorFieldFormElement } from "@/app/(main)/create-form/_components/form-builder/elements/layout-elements/separator-field";

// form elements
import { TextFieldFormElement } from "@/app/(main)/create-form/_components/form-builder/elements/form-elements/text-field";
import { NumberFieldFormElement } from "@/app/(main)/create-form/_components/form-builder/elements/form-elements/number-field";
import { TextareaFieldFormElement } from "@/app/(main)/create-form/_components/form-builder/elements/form-elements/textarea-field";
import { DateFieldFormElement } from "@/app/(main)/create-form/_components/form-builder/elements/form-elements/date-field";
import { SelectFieldFormElement } from "@/app/(main)/create-form/_components/form-builder/elements/form-elements/select-field";
import { CheckboxFieldFormElement } from "@/app/(main)/create-form/_components/form-builder/elements/form-elements/checkbox-field";

// local modules
import { FormElementsType } from "@/app/(main)/create-form/_types";

/* export {
  // layout elements
  TitleFieldFormElement,
  SubtitleFieldFormElement,
  SeparatorFieldFormElement,
  ParagraphFieldFormElement,
  SpacerFieldFormElement,

  // form elements
  TextFieldFormElement,
  NumberFieldFormElement,
  TextareaFieldFormElement,
  DateFieldFormElement,
  SelectFieldFormElement,
  CheckboxFieldFormElement,
};
 */

export const FormElements: FormElementsType = {
  // layout elements
  TitleField: TitleFieldFormElement,
  SubtitleField: SubtitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,

  // form elements
  TextField: TextFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextareaField: TextareaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
};
