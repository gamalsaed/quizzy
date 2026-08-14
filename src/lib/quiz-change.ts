import type { QuizFormValues } from "./schema/quiz.schema";

export function getQuizChanges(
  oldQuiz: {
    id: string;
    title: string;
    questions: {
      id: string;
      text: string;
      points: number;
      timeLimitSec: number;
      options: {
        id: string;
        text: string;
        isCorrect: boolean;
      }[];
    }[];
  },
  newQuiz: QuizFormValues,
) {
  const titleChanged = oldQuiz.title !== newQuiz.title;

  const oldQuestionIds = oldQuiz.questions.map((q) => q.id);

  const currentQuestionIds = newQuiz.questions
    .filter((q) => q.id)
    .map((q) => q.id as string);

  const questionsToCreate = newQuiz.questions.filter((q) => !q.id);

  const questionsToDelete = oldQuiz.questions.filter(
    (q) => !currentQuestionIds.includes(q.id),
  );

  const questionsToUpdate = newQuiz.questions
    .filter((q) => q.id && oldQuestionIds.includes(q.id))
    .map((newQuestion) => {
      const oldQuestion = oldQuiz.questions.find(
        (q) => q.id === newQuestion.id,
      )!;

      const questionChanged =
        oldQuestion.text !== newQuestion.text ||
        oldQuestion.points !== newQuestion.points ||
        oldQuestion.timeLimitSec !== newQuestion.timeLimitSec;

      const oldOptionIds = oldQuestion.options.map((option) => option.id);

      const currentOptionIds = newQuestion.options
        .filter((option) => option.id)
        .map((option) => option.id as string);

      const optionsToCreate = newQuestion.options.filter(
        (option) => !option.id,
      );

      const optionsToDelete = oldQuestion.options.filter(
        (option) => !currentOptionIds.includes(option.id),
      );

      const optionsToUpdate = newQuestion.options.filter((newOption) => {
        if (!newOption.id) return false;

        const oldOption = oldQuestion.options.find(
          (option) => option.id === newOption.id,
        );

        if (!oldOption) return false;

        return (
          oldOption.text !== newOption.text ||
          oldOption.isCorrect !== newOption.isCorrect
        );
      });

      return {
        id: newQuestion.id,
        question: newQuestion,
        questionChanged,

        optionsToCreate,
        optionsToUpdate,
        optionsToDelete,
      };
    })
    .filter(
      (item) =>
        item.questionChanged ||
        item.optionsToCreate.length > 0 ||
        item.optionsToUpdate.length > 0 ||
        item.optionsToDelete.length > 0,
    );

  return {
    titleChanged,
    title: newQuiz.title,

    questionsToCreate,
    questionsToUpdate,
    questionsToDelete,
  };
}
