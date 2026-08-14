import Image from "next/image";
import Link from "next/link";
import { SaveButton } from "./save-button";
import { QuizTitleInput } from "./quiz-title-input";

export default function QuizHeader({ isPending }: { isPending: boolean }) {
  return (
    <header className=" rounded-tr-3xl rounded-tl-3xl border border-border bg-card px-6 py-3 shadow-sm">
      <div className="flex  items-center max-sm:flex-col-reverse justify-between gap-4">
        <SaveButton isPending={isPending} />
        <QuizTitleInput />
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="text-2xl font-bold text-navy">Quizzy</span>

          <Image
            src="/images/logo.png"
            alt="Quizzy"
            width={80}
            height={80}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
