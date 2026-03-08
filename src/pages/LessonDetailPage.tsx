import { useParams, Link, useNavigate } from "react-router-dom";
import { lessons, quizzes } from "@/data/financeData";
import { lessonContent } from "@/data/lessonContent";
import { useProgress } from "@/hooks/useProgress";
import { ArrowLeft, CheckCircle2, Clock, BookOpen, Lightbulb, Users, Target, ChevronRight } from "lucide-react";

export default function LessonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { completedLessons, completeLesson } = useProgress();

  const lesson = lessons.find((l) => l.id === id);
  const content = id ? lessonContent[id] : undefined;
  const done = id ? completedLessons.includes(id) : false;
  const hasQuiz = id ? !!quizzes[id] : false;

  if (!lesson || !content) {
    return (
      <div className="text-center py-20 animate-slide-up">
        <p className="text-muted-foreground mb-4">Lesson not found.</p>
        <Link to="/lessons" className="text-primary font-semibold hover:underline">← Back to Lessons</Link>
      </div>
    );
  }

  const currentIdx = lessons.findIndex((l) => l.id === id);
  const nextLesson = currentIdx >= 0 && currentIdx < lessons.length - 1 ? lessons[currentIdx + 1] : null;

  const handleComplete = () => {
    completeLesson(lesson.id);
  };

  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      {/* Back nav */}
      <Link to="/lessons" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Roadmap
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span className="px-2 py-0.5 rounded-full bg-muted font-medium">{lesson.module}</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {lesson.duration}</span>
          <span className="px-2 py-0.5 rounded-full bg-muted font-medium">{lesson.difficulty}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">{lesson.title}</h1>
        <p className="text-muted-foreground mt-1">{lesson.description}</p>
      </div>

      {/* Lesson sections */}
      <div className="space-y-6">
        <Section icon={BookOpen} title="Simple Explanation" color="primary">
          {content.explanation}
        </Section>

        <Section icon={Users} title="Real-Life Example" color="accent">
          {content.example}
        </Section>

        <Section icon={Lightbulb} title="Scenario" color="warning">
          {content.scenario}
        </Section>

        <Section icon={Target} title="Key Takeaway" color="success" highlight>
          {content.takeaway}
        </Section>
      </div>

      {/* Actions */}
      <div className="mt-10 space-y-3">
        {!done ? (
          <button
            onClick={handleComplete}
            className="w-full py-3.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            ✅ Mark Lesson as Complete
          </button>
        ) : (
          <div className="flex items-center gap-2 justify-center py-3 text-sm font-semibold text-primary">
            <CheckCircle2 className="h-5 w-5" /> Lesson Completed!
          </div>
        )}

        {done && hasQuiz && (
          <Link
            to={`/quiz?lesson=${lesson.id}`}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-accent text-accent-foreground text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Take the Quiz <ChevronRight className="h-4 w-4" />
          </Link>
        )}

        {nextLesson && (
          <Link
            to={`/lesson/${nextLesson.id}`}
            className="flex items-center justify-center gap-2 w-full py-3 border border-border text-sm font-medium text-foreground rounded-xl hover:bg-muted transition-colors"
          >
            Next: {nextLesson.title} <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  color,
  highlight,
  children,
}: {
  icon: React.ElementType;
  title: string;
  color: string;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
    primary: { bg: "bg-primary/5", icon: "text-primary", border: "border-primary/20" },
    accent: { bg: "bg-accent/5", icon: "text-accent", border: "border-accent/20" },
    warning: { bg: "bg-warning/5", icon: "text-warning", border: "border-warning/20" },
    success: { bg: "bg-primary/5", icon: "text-primary", border: "border-primary/20" },
  };
  const c = colorMap[color] ?? colorMap.primary;

  return (
    <div className={`rounded-2xl p-5 border ${highlight ? `${c.bg} ${c.border}` : "bg-card border-border"}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`h-7 w-7 rounded-lg ${c.bg} flex items-center justify-center`}>
          <Icon className={`h-4 w-4 ${c.icon}`} />
        </div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-foreground/80">{children}</p>
    </div>
  );
}
