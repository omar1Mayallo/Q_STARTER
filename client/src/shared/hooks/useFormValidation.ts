/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";

export default function useFormValidation<T extends FieldValues = any>(
  schema: any,
  defaultValues?: any,
) {
  return useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });
}
