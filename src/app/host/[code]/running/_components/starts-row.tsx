import { FileText, Users, Clock, CheckCircle2 } from "lucide-react";
import { formatTime } from "@/lib/formatTime";
type StatsRowProps = {
  QuestionValue: string;
  UsersValue: string;
  TimeValue: string;
  AnswersValue: string;
};

export default function StatsRow({
  QuestionValue,
  TimeValue,
  UsersValue,
  AnswersValue,
}: StatsRowProps) {
  const stats = [
    {
      icon: FileText,
      label: "QUESTION",
      value: QuestionValue,
      bg: "bg-violet-50",
      iconBg: "bg-violet-100",
      iconColor: "text-violet-500",
      labelColor: "text-violet-500",
    },
    {
      icon: Users,
      label: "PLAYERS",
      value: UsersValue,
      bg: "bg-sky-50",
      iconBg: "bg-sky-100",
      iconColor: "text-sky-500",
      labelColor: "text-sky-500",
    },
    {
      icon: Clock,
      label: "TIME REMAINING",
      value: formatTime(Number(TimeValue)),
      bg: "bg-amber-50",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-500",
      labelColor: "text-amber-600",
    },
    {
      icon: CheckCircle2,
      label: "ANSWERS",
      value: AnswersValue,
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-500",
      labelColor: "text-emerald-600",
    },
  ];
  return (
    <div className="flex relative z-10 flex-wrap gap-4 p-6">
      {stats.map(
        ({ icon: Icon, label, value, bg, iconBg, iconColor, labelColor }) => (
          <div
            key={label}
            className={`flex items-center gap-3 rounded-2xl ${bg} px-5 py-4 min-w-[190px]`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
            >
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
            <div>
              <p
                className={`text-[11px] font-semibold tracking-wide ${labelColor}`}
              >
                {label}
              </p>
              <p className="text-xl font-bold text-neutral-800">{value}</p>
            </div>
          </div>
        ),
      )}
    </div>
  );
}
