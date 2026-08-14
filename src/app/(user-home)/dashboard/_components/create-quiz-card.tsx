// components/CreateQuizCard.tsx
import Link from "next/link";

export function CreateQuizCard() {
  return (
    <Link
      href="/quizzes/new"
      dir="rtl"
      className="group relative flex h-fit flex-col items-center justify-center gap-4
                 rounded-3xl border-2 border-dashed border-violet-300 bg-white
                 bg-[url('/images/bg.png')] bg-cover bg-center bg-no-repeat
                 px-10 py-12 text-center transition-colors
                 hover:border-violet-500
                 focus-visible:outline-none focus-visible:ring-2
                 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
    >
      <span
        className="flex h-16 w-16 items-center justify-center rounded-full
                   bg-violet-600 shadow-lg shadow-violet-600/30
                   transition-transform duration-200 group-hover:scale-110"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          className="h-8 w-8 text-white"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </span>

      <div className="space-y-1.5">
        <h3 className="text-xl font-bold text-violet-900">إنشاء Quiz جديد</h3>
        <p className="text-sm text-gray-500">أنشئ Quiz جديد وابدأ التحدي!</p>
      </div>
    </Link>
  );
}
