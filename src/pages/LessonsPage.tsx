import { lessons } from "@/data/financeData";
import { useProgress } from "@/hooks/useProgress";
import { CheckCircle2, Circle, Clock, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function LessonsPage() {
  const { completedLessons, completeLesson } = useProgress();

  const modules = Array.from(new Set(lessons.map((l) => l.module)));

  return (
    <div className="space-y-8 animate-slide-up">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Learning Path</h1>
        <p className="text-muted-foreground mt-1">Follow the roadmap to master personal finance</p>
      </div>

      {modules.map((mod) => {
        const modLessons = lessons.filter((l) => l.module === mod);
        const doneCount = modLessons.filter((l) => completedLessons.includes(l.id)).length;
        return (
          <div key={mod}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-foreground">{mod}</h2>
              <span className="text-xs text-muted-foreground font-medium">
                {doneCount}/{modLessons.length} completed
              </span>
            </div>
            <div className="space-y-3">
              {modLessons.map((lesson) => {
                const done = completedLessons.includes(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    className={`bg-card rounded-2xl p-5 border transition-colors ${
                      done ? "border-primary/30 bg-primary/[0.02]" : "border-border hover:border-primary/20"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5">
                        {done ? (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground/40" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-foreground">{lesson.title}</h3>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                            {lesson.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{lesson.description}</p>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" /> {lesson.duration}
                          </span>
                          {!done && (
                            <button
                              onClick={() => completeLesson(lesson.id)}
                              className="text-xs font-semibold text-primary hover:underline"
                            >
                              Mark as Complete
                            </button>
                          )}
                          {done && (
                            <Link
                              to={`/quiz?lesson=${lesson.id}`}
                              className="text-xs font-semibold text-accent hover:underline"
                            >
                              Take Quiz →
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
