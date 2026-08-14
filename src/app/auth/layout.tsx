import Image from "next/image";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/auth-bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="bg-white w-1/3 max-lg:w-1/2 max-md:min-w-5/6   rounded-2xl p-10 gap-10 flex flex-col justify-center">
        <header className="flex flex-col justify-center items-center">
          <div className="flex items-center">
            <h1 className="text-6xl font-extrabold text-navy -ml-10 max-sm:sr-only">
              كويزي
            </h1>
            <Image
              src="/images/logo.png"
              width={250}
              height={250}
              alt="Quizzy logo"
            />
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
