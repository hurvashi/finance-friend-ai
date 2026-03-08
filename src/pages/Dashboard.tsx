import { Link } from "react-router-dom";
import { BookOpen, MessageCircle, Trophy, TrendingUp, Flame, Zap, HelpCircle } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { lessons } from "@/data/financeData";
import { getTodayLesson } from "@/data/dailyLessons";
import { useState } from "react";

export default function Dashboard() {
  const { completedLessons, xp, quizScores } = useProgress();
  const completedCount = completedLessons.length;
  const totalLessons = lessons.length;
  const pct = Math.round((completedCount / totalLessons) * 100);
  const nextLesson = lessons.find((l) => !completedLessons.includes(l.id));
  const modules = Array.from(new Set(lessons.map((l) => l.module)));
  const currentModule = nextLesson?.module ?? modules[modules.length - 1];

  return (
    <div className="space-y-8 animate-slide-up">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Welcome back! 👋</h1>
        <p className="text-muted-foreground mt-1">Continue your finance journey</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Zap} label="XP Earned" value={xp.toString()} color="xp" />
        <StatCard icon={Flame} label="Day Streak" value="3" color="warning" />
        <StatCard icon={BookOpen} label="Lessons Done" value={`${completedCount}/${totalLessons}`} color="primary" />
        <StatCard icon={Trophy} label="Quizzes Passed" value={Object.keys(quizScores).length.toString()} color="info" />
      </div>

      {/* Progress bar */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-foreground">Overall Progress</span>
          <span className="text-sm font-bold text-primary">{pct}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Currently on: <span className="font-medium text-foreground">{currentModule}</span> · {6} modules · {totalLessons} lessons
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-4">
        {nextLesson && (
          <Link
            to="/lessons"
            className="bg-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Next Lesson</p>
                <p className="text-sm font-semibold text-foreground">{nextLesson.title}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{nextLesson.description}</p>
          </Link>
        )}

        <Link
          to="/tutor"
          className="bg-card rounded-2xl p-6 border border-border hover:border-accent/40 transition-colors"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">AI Tutor</p>
              <p className="text-sm font-semibold text-foreground">Ask any finance question</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Get instant answers from your personal finance mentor.</p>
        </Link>
      </div>

      {/* Daily Lesson */}
      <DailyLessonCard />
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    warning: "bg-warning/10 text-warning",
    info: "bg-accent/10 text-accent",
    xp: "bg-xp/10 text-xp",
  };
  return (
    <div className="bg-card rounded-2xl p-4 border border-border">
      <div className={`h-8 w-8 rounded-lg ${colorMap[color]} flex items-center justify-center mb-3`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function DailyLessonCard() {
  const daily = getTodayLesson();
  const [showReflection, setShowReflection] = useState(false);

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="bg-primary/5 border-b border-primary/10 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{daily.emoji}</span>
          <span className="text-xs font-semibold text-primary">Daily Lesson</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{daily.topic}</span>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-base font-bold text-foreground">{daily.title}</h3>
        <p className="text-sm leading-relaxed text-foreground/80">{daily.body}</p>
        <div className="bg-muted rounded-xl p-4">
          <p className="text-xs font-semibold text-foreground mb-1">💡 Example</p>
          <p className="text-sm text-muted-foreground">{daily.example}</p>
        </div>
        <button
          onClick={() => setShowReflection(!showReflection)}
          className="flex items-center gap-2 text-xs font-semibold text-accent hover:underline"
        >
          <HelpCircle className="h-3.5 w-3.5" />
          {showReflection ? "Hide reflection question" : "🤔 Reflection question"}
        </button>
        {showReflection && (
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 animate-slide-up">
            <p className="text-sm text-foreground italic">"{daily.reflection}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
