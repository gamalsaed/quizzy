"use client";

import { useFieldArray, useFormContext } from "react-hook-form";

import { QuestionItem } from "./question-item";
import { QuestionFormValues } from "@/lib/schema/quiz.schema";
import { AddQuestionButton } from "./add-question-button";
interface QuestionListProps {
  currentQuestion: number;
  handleSelect: (index: number) => void;
}

export function QuestionList({
  currentQuestion,
  handleSelect,
}: QuestionListProps) {
  const { watch, control, formState } = useFormContext();

  const { append } = useFieldArray({
    control,
    name: `questions`,
  });
  const questions = watch("questions");
  const questionsErrors = formState.errors?.questions;

  return (
    <div className="flex w-full max-sm:max-w-full max-sm:min-h-60 overflow-auto max-w-xs flex-col gap-2 rounded-3xl flex-1 border border-border bg-card px-6 py-3 shadow-sm">
      {questions?.map((question: QuestionFormValues, index: number) => (
        <QuestionItem
          key={`${question.text} ${index}`}
          index={index}
          title={question.text}
          hasError={Boolean(
            Array.isArray(questionsErrors) && questionsErrors[index],
          )}
          isActive={currentQuestion === index}
          onSelect={handleSelect}
        />
      ))}
      <AddQuestionButton
        onClick={() => {
          append({
            timeLimitSec: 20,
            text: "",
            options: [],
            points: 5,
          });
        }}
      />
    </div>
  );
}
