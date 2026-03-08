import { useProgress } from "@/hooks/useProgress";
import { lessons } from "@/data/financeData";
import { getProgressFeedback } from "@/data/progressFeedback";
import { CheckCircle2, Circle, Zap, BookOpen, Trophy, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProgressPage() {
  const { completedLessons, xp, quizScores } = useProgress();
  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const pct = Math.round((completedCount / totalLessons) * 100);
  const modules = Array.from(new Set(lessons.map((l) => l.module)));

  return (
    <div className="space-y-8 animate-slide-up">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Your Progress</h1>
        <p className="text-muted-foreground mt-1">Track your learning journey</p>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl p-5 border border-border text-center">
          <Zap className="h-6 w-6 text-xp mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{xp}</p>
          <p className="text-xs text-muted-foreground">Total XP</p>
        </div>
        <div className="bg-card rounded-2xl p-5 border border-border text-center">
          <BookOpen className="h-6 w-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{completedCount}</p>
          <p className="text-xs text-muted-foreground">Lessons Done</p>
        </div>
        <div className="bg-card rounded-2xl p-5 border border-border text-center">
          <Trophy className="h-6 w-6 text-accent mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{Object.keys(quizScores).length}</p>
          <p className="text-xs text-muted-foreground">Quizzes Passed</p>
        </div>
      </div>

      {/* Overall progress */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-foreground">Overall Completion</span>
          <span className="text-sm font-bold text-primary">{pct}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
      {/* Personalized Feedback */}
      <FeedbackCard completedLessons={completedLessons} />

      {modules.map((mod) => {
        const modLessons = lessons.filter((l) => l.module === mod);
        const modDone = modLessons.filter((l) => completedLessons.includes(l.id)).length;
        const modPct = Math.round((modDone / modLessons.length) * 100);
        return (
          <div key={mod} className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">{mod}</h3>
              <span className="text-xs text-muted-foreground">{modPct}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${modPct}%` }} />
            </div>
            <div className="space-y-2">
              {modLessons.map((l) => (
                <div key={l.id} className="flex items-center gap-2 text-sm">
                  {completedLessons.includes(l.id) ? (
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground/30 shrink-0" />
                  )}
                  <span className={completedLessons.includes(l.id) ? "text-foreground" : "text-muted-foreground"}>
                    {l.title}
                  </span>
                  {quizScores[l.id] !== undefined && (
                    <span className="ml-auto text-xs font-medium text-primary">
                      Quiz: {Math.round(quizScores[l.id] * 100)}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
