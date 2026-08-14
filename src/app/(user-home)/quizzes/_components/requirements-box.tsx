// components/question-requirements.tsx
import { AlertCircle } from "lucide-react";

const REQUIREMENTS = [
  "يجب إدخال نص السؤال.",
  "يجب إضافة خيارين إجابة على الأقل.",
  "يجب تحديد إجابة واحدة صحيحة.",
];

export function QuestionRequirements() {
  return (
    <div
      dir="rtl"
      className="flex mt-5 items-start gap-4 rounded-2xl border border-destructive/25 bg-destructive/5 px-5 py-4"
    >
      <AlertCircle className="mt-0.5 size-7 shrink-0 fill-destructive text-white" />

      <div className="flex-1 text-right">
        <p className="font-bold text-navy">
          لا يمكنك حفظ السؤال حتى تستوفي المتطلبات التالية:
        </p>

        <ul className="mt-2 space-y-1.5">
          {REQUIREMENTS.map((req) => (
            <li key={req} className="flex items-center gap-2">
              <span className="size-1.5 shrink-0 rounded-full bg-destructive" />
              <span className="text-sm text-navy/80">{req}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
