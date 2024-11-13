"use client";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import {
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

interface FormPropsComponent<T> {
  children: React.ReactNode;
  formProps: T;
  onSubmit: (payload: FormData) => void;
  errorMessage?: string;
};

export function Form<T extends UseFormReturn<FieldValues>>({
  children,
  formProps,
  errorMessage,
  onSubmit,
}: FormPropsComponent<T>) {
  const {
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = formProps;

  const onSubmitForm = () => {
    if (!isValid) return;

    const data: FieldValues = getValues();
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-3">
      {children}

      <div
        className="flex flex-col gap-4 items-start mt-4 px-8"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <div>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </div>
        )}

        {Object.entries(errors)?.map((error) => (
          <div className="flex items-center gap-2" key={error[0]}>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500" key={error[0]}>
              {error[1]?.message as string}
            </p>
          </div>
        ))}
      </div>
    </form>
  );
}
