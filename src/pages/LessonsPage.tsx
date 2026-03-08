import { lessons, quizzes } from "@/data/financeData";
import { lessonContent } from "@/data/lessonContent";
import { useProgress } from "@/hooks/useProgress";
import { CheckCircle2, Circle, Clock, ChevronRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const MODULE_ICONS = ["💰", "📊", "🏦", "📈", "📉", "🛡️"];

export default function LessonsPage() {
  const { completedLessons, completeLesson } = useProgress();

  const modules = Array.from(new Set(lessons.map((l) => l.module)));

  return (
    <div className="space-y-8 animate-slide-up">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Learning Roadmap</h1>
        <p className="text-muted-foreground mt-1">6 modules · 24 lessons · From zero to confident</p>
      </div>

      {modules.map((mod, modIdx) => {
        const modLessons = lessons.filter((l) => l.module === mod);
        const doneCount = modLessons.filter((l) => completedLessons.includes(l.id)).length;
        const allDone = doneCount === modLessons.length;
        const pct = Math.round((doneCount / modLessons.length) * 100);

        return (
          <div key={mod}>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xl">{MODULE_ICONS[modIdx] ?? "📘"}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-foreground">
                    Module {modIdx + 1}: {mod}
                  </h2>
                  <span className="text-xs text-muted-foreground font-medium">
                    {doneCount}/{modLessons.length}
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-1.5">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="ml-4 border-l-2 border-border pl-5 mt-3 space-y-3">
              {modLessons.map((lesson, lessonIdx) => {
                const done = completedLessons.includes(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    className={`bg-card rounded-xl p-4 border transition-colors ${
                      done ? "border-primary/30 bg-primary/[0.02]" : "border-border hover:border-primary/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {done ? (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground/30" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <h3 className="text-sm font-semibold text-foreground">{lesson.title}</h3>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                            {lesson.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{lesson.description}</p>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" /> {lesson.duration}
                          </span>
                          {!done && (
                            <button
                              onClick={() => completeLesson(lesson.id)}
                              className="text-xs font-semibold text-primary hover:underline"
                            >
                              Mark Complete
                            </button>
                          )}
                          {done && (
                            <Link
                              to={`/quiz?lesson=${lesson.id}`}
                              className="flex items-center gap-0.5 text-xs font-semibold text-accent hover:underline"
                            >
                              Take Quiz <ChevronRight className="h-3 w-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
