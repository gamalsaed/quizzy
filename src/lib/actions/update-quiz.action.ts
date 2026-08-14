"use server";

import { prisma } from "../prisma_client";
import { getQuizChanges } from "../quiz-change";
import { QuizFormValues, quizSchema } from "../schema/quiz.schema";

export async function updateQuizAction(data: QuizFormValues, userId: string) {
  const parsed = quizSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("بيانات غير صالحة");
  }

  try {
    const oldQuiz = await prisma.quiz.findFirst({
      where: {
        id: data.id,
        userId,
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!oldQuiz) {
      throw new Error("الاختبار غير موجود");
    }

    const changes = getQuizChanges(oldQuiz, parsed.data);

    await prisma.$transaction(async (tx) => {
      // 1. Update Quiz title
      if (changes.titleChanged) {
        await tx.quiz.update({
          where: {
            id: oldQuiz.id,
          },
          data: {
            title: changes.title,
          },
        });
      }

      // 2. Delete Questions
      if (changes.questionsToDelete.length > 0) {
        await tx.question.deleteMany({
          where: {
            id: {
              in: changes.questionsToDelete.map((question) => question.id),
            },
            quizId: oldQuiz.id,
          },
        });
      }

      // 3. Create new Questions
      for (const [
        questionIndex,
        question,
      ] of changes.questionsToCreate.entries()) {
        await tx.question.create({
          data: {
            text: question.text,
            points: question.points,
            timeLimitSec: question.timeLimitSec,

            order: questionIndex,

            quizId: oldQuiz.id,

            options: {
              create: question.options.map((option, optionIndex) => ({
                text: option.text,
                isCorrect: option.isCorrect,
                order: optionIndex,
              })),
            },
          },
        });
      }

      // 4. Update existing Questions
      for (const questionChange of changes.questionsToUpdate) {
        const {
          question,
          questionChanged,
          optionsToCreate,
          optionsToUpdate,
          optionsToDelete,
        } = questionChange;

        // Update question itself
        if (questionChanged) {
          await tx.question.update({
            where: {
              id: question.id,
            },
            data: {
              text: question.text,
              points: question.points,
              timeLimitSec: question.timeLimitSec,
            },
          });
        }

        // 5. Delete Options
        if (optionsToDelete.length > 0) {
          await tx.option.deleteMany({
            where: {
              id: {
                in: optionsToDelete.map((option) => option.id),
              },
              questionId: question.id,
            },
          });
        }

        // 6. Create Options
        if (optionsToCreate.length > 0) {
          await tx.option.createMany({
            data: optionsToCreate.map((option, optionIndex) => ({
              text: option.text,
              isCorrect: option.isCorrect,
              order: optionIndex,
              questionId: question.id!,
            })),
          });
        }

        // 7. Update Options
        for (const option of optionsToUpdate) {
          await tx.option.update({
            where: {
              id: option.id,
            },
            data: {
              text: option.text,
              isCorrect: option.isCorrect,
            },
          });
        }
      }
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    throw new Error("خطأ في الخادم حاول مرة أخرى لاحقًا");
  }
}
