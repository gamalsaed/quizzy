export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white">
      {/* background blobs */}
      <div className="loading-blob-left absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-200/50 blur-3xl" />
      <div className="loading-blob-right absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-cyan-200/50 blur-3xl" />

      <div className="absolute bottom-0 left-0 h-40 w-64 rounded-tr-[100%] bg-yellow-300/80" />
      <div className="absolute bottom-0 right-0 h-44 w-72 rounded-tl-[100%] bg-cyan-400/80" />

      {/* floating decorations */}
      <span className="loading-star absolute left-[22%] top-[28%] text-3xl">
        ⭐
      </span>

      <span className="loading-question absolute right-[25%] top-[25%] text-4xl">
        ❓
      </span>

      <span className="loading-zap absolute right-[30%] top-[52%] text-3xl">
        ⚡
      </span>

      <span className="loading-sparkle-one absolute left-[30%] top-[20%] text-xl text-violet-500">
        ✦
      </span>

      <span className="loading-sparkle-two absolute right-[18%] top-[37%] text-xl text-yellow-400">
        ✦
      </span>

      {/* center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* loader orb */}
        <div className="relative flex h-72 w-72 items-center justify-center">
          {/* outer spinning ring */}
          <div className="loading-ring absolute inset-0 rounded-full border-[7px] border-transparent border-r-cyan-400 border-t-violet-600 border-b-violet-400" />

          {/* glow */}
          <div className="loading-glow absolute h-56 w-56 rounded-full bg-violet-500/30 blur-3xl" />

          {/* inner orb */}
          <div className="loading-orb relative flex h-52 w-52 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-violet-600 to-purple-800 shadow-[0_20px_70px_rgba(124,58,237,0.35)]">
            <div className="grid grid-cols-2 gap-3">
              <QuizTile className="bg-blue-500 loading-tile-1">▲</QuizTile>
              <QuizTile className="bg-red-500 loading-tile-2">●</QuizTile>
              <QuizTile className="bg-emerald-500 loading-tile-3">■</QuizTile>
              <QuizTile className="bg-yellow-400 loading-tile-4">★</QuizTile>
            </div>
          </div>

          {/* orbit */}
          <div className="loading-orbit absolute h-32 w-[370px] rotate-[-8deg] rounded-[50%] border-2 border-violet-200/70" />
        </div>

        <h1 className="loading-title mt-8 text-4xl font-bold text-violet-700">
          جاري تحميل Quizzy...
        </h1>

        <p className="loading-subtitle mt-3 text-lg text-slate-500">
          جهّز نفسك للمرح والتحدي 🚀
        </p>

        {/* progress */}
        <div className="mt-8 w-[520px] max-w-[85vw]">
          <div className="h-6 overflow-hidden rounded-full border bg-white p-1 shadow-md">
            <div className="loading-progress h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-400" />
          </div>

          <div className="mt-5 flex justify-center gap-2">
            <span className="loading-dot loading-dot-1 h-2.5 w-2.5 rounded-full bg-violet-600" />
            <span className="loading-dot loading-dot-2 h-2.5 w-2.5 rounded-full bg-violet-500" />
            <span className="loading-dot loading-dot-3 h-2.5 w-2.5 rounded-full bg-cyan-400" />
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            <span className="font-bold text-violet-600">نصيحة:</span> كل سؤال
            جديد هو خطوة نحو التميز!
          </p>
        </div>
      </div>
    </div>
  );
}

function QuizTile({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
