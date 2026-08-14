"use client";

import { useFormContext, useFieldArray } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { FieldOption } from "./option-field";
import { QuestionRequirements } from "./requirements-box";
import { DurationSelect } from "./duration-select";
import { PointsSelect } from "./point-select";
import { useEffect } from "react";
import { OptionFormValues } from "@/lib/schema/quiz.schema";

const optionLabels = [
  { label: "A الخيار", placeholder: "الاجابة 1" },
  { label: "B الخيار", placeholder: "الاجابة 2" },
  { label: "C الخيار", placeholder: "الاجابة 3" },
  { label: "D الخيار", placeholder: "الاجابة 4" },
];

export default function QuestionForm({
  currentQuestion,
}: {
  currentQuestion: number;
}) {
  const { register, watch, control, formState, trigger } = useFormContext();

  const options = watch(`questions.${currentQuestion}.options`);

  const { update, remove } = useFieldArray({
    control,
    name: `questions.${currentQuestion}.options`,
  });

  function handleCorrection(index: number): void {
    if (!options[index] || options[index].text === "") {
      return;
    }

    options.forEach((item: OptionFormValues, i: number) => {
      update(i, { ...item, isCorrect: false });
    });
    update(index, { ...options[index], isCorrect: true });
  }

  useEffect(() => {
    options?.forEach((option: OptionFormValues, i: number) => {
      if (option?.text === "") {
        remove(i);
      }
    });
  }, [options]);

  const questionErrors = formState.errors.questions as
    | Array<{
        text?: { message?: string };
        options: { root: { message: string } };
      }>
    | undefined;

  const textErrorMessage = questionErrors?.[currentQuestion]?.text?.message;
  const optionsErrorMessage =
    questionErrors?.[currentQuestion]?.options?.root?.message;
  return (
    <div className="rounded-3xl flex-1 border border-border bg-card px-6 py-3 shadow-sm">
      <Field>
        <FieldLabel className="text-navy font-semibold ">نص السؤال</FieldLabel>
        <Textarea
          {...register(`questions.${currentQuestion}.text`)}
          placeholder="اختر راس سؤال لسؤالك"
          className=" resize-none"
        />
        {textErrorMessage && <FieldError>{textErrorMessage}</FieldError>}
      </Field>
      <FieldGroup className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 my-4">
        {optionLabels.map((option, index) => (
          <FieldOption
            key={index}
            {...register(`questions.${currentQuestion}.options.${index}.text`)}
            label={option.label}
            currentQuestion={currentQuestion}
            placeholder={option.placeholder}
            index={index}
            isCorrect={options?.[index]?.isCorrect || false}
            handleCorrection={handleCorrection}
            onChange={async () => await trigger(`questions.${currentQuestion}`)}
          />
        ))}
      </FieldGroup>
      {questionErrors && (
        <FieldError className="my-2">{optionsErrorMessage}</FieldError>
      )}
      <FieldGroup className="flex flex-row gap-4 mt-4">
        <DurationSelect currentQuestion={currentQuestion} />
        <PointsSelect currentQuestion={currentQuestion} />
      </FieldGroup>
      <QuestionRequirements />
    </div>
  );
}
