import Image from "next/image";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div >
      <Image
        src="/images/bg.png"
        alt="Quizzy"
        fill
        priority
        className=" absolute z-0"
      />
      {children}
    </div>
  );
}
