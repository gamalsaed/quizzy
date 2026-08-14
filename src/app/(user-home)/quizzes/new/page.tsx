import QuizForm from "../_components/quiz-form";
import { createQuizAction } from "@/lib/actions/create-quiz.action";
export default function page() {
  return (
    <div>
      <QuizForm
        defaultValues={{ title: "", questions: [] }}
        action={createQuizAction}
      />
    </div>
  );
}
