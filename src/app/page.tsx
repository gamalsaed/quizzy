import Image from "next/image";
import { JoinForm } from "./_components/join-form";
import Link from "next/link";
import { UserPlus, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center max-sm:p-5 flex-col justify-center bg-[url('/images/bg.png')] bg-cover bg-center bg-no-repeat">
      <header className="flex flex-col justify-center items-center">
        <Image
          src="/images/logo.png"
          width={250}
          height={250}
          alt="Quizzy logo"
        />
        <h1 className="text-5xl font-extrabold text-secound  max-sm:sr-only">
          ادخل الي اللعبة
        </h1>
        <h3 className="mt-5 text-navy text-2xl font-bold">
          اكتب كود اللعبة المكون من 4 ارقام للانضمام بسرعة
        </h3>
      </header>
      <JoinForm />
      <Link
        href="/auth/login"
        dir="rtl"
        className="group flex flex-row-reverse mt-10 items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm transition-all hover:shadow-md hover:border-teal-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
      >
        <UserPlus className="size-9 shrink-0 text-teal-500" strokeWidth={1.5} />

        <div className="flex-1 text-right">
          <p className="text-lg font-bold text-teal-600">إنشاء Quiz</p>
          <p className="text-sm text-muted-foreground">
            سجّل دخولك كـ Host لإنشاء لعبة جديدة
          </p>
        </div>

        <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
