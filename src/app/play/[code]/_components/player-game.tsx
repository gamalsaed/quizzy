import Image from "next/image";
import { useEffect, useState } from "react";
import { QuestionCard } from "./question-card";

type data = {
  id: string;
  quiz: {
    id: string;
    title: string;
  };
  numberOfQuestions: number;

  currentQuestion: {
    index: number;
    id: string;
    text: string;
    timeLimitSec: number;
    points: number;

    options: {
      id: string;
      text: string;
    }[];
  };

  timer: {
    remainingTime: number;
    isTimeUp: boolean;
  };
};

export default function PlayerGame({ code }: { code: string }) {
  const [question, setQuestion] = useState<data>();
  useEffect(() => {
    const eventSource = new EventSource(`/api/game/${code}/events/play`);
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setQuestion(data);
    };

    return () => eventSource.close();
  }, [code]);
  return (
    <div>
      <Image
        src="/images/lobby-bg.png"
        alt="Quizzy"
        fill
        priority
        className=" absolute z-0"
      />
      <div className=" relative z-10 h-dvh flex justify-center items-center">
        {question && (
          <QuestionCard
            key={question.currentQuestion.id}
            questionId={question.currentQuestion.id}
            sessionId={question.id} // SessionId
            title={question.currentQuestion.text}
            time={question.timer.remainingTime}
            questionNumber={question.currentQuestion.index + 1}
            totalQuestions={question.numberOfQuestions!}
            options={question.currentQuestion.options}
            points={question.currentQuestion.points}
            isCorrecting={false}
          />
        )}
      </div>
    </div>
  );
}
