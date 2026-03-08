import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { quizzes, lessons } from "@/data/financeData";
import { useProgress } from "@/hooks/useProgress";
import { CheckCircle2, XCircle, ArrowRight, Trophy } from "lucide-react";

export default function QuizPage() {
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("lesson");
  const { recordQuiz, quizScores } = useProgress();

  const availableQuizzes = Object.keys(quizzes);

  if (!lessonId) {
    return (
      <div className="space-y-6 animate-slide-up">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Quizzes</h1>
          <p className="text-muted-foreground mt-1">Test your knowledge after each lesson</p>
        </div>
        <div className="space-y-3">
          {availableQuizzes.map((lid) => {
            const lesson = lessons.find((l) => l.id === lid);
            const score = quizScores[lid];
            return (
              <a
                key={lid}
                href={`/quiz?lesson=${lid}`}
                className="block bg-card rounded-2xl p-5 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{lesson?.title} Quiz</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{quizzes[lid].length} questions</p>
                  </div>
                  {score !== undefined ? (
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {Math.round(score * 100)}%
                    </span>
                  ) : (
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  return <QuizRunner lessonId={lessonId} questions={quizzes[lessonId] || []} recordQuiz={recordQuiz} />;
}

function QuizRunner({
  lessonId,
  questions,
  recordQuiz,
}: {
  lessonId: string;
  questions: { question: string; options: string[]; correctIndex: number; explanation: string }[];
  recordQuiz: (id: string, score: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  const lesson = lessons.find((l) => l.id === lessonId);

  if (!questions.length) {
    return (
      <div className="text-center py-20 animate-slide-up">
        <p className="text-muted-foreground">No quiz available for this lesson yet.</p>
      </div>
    );
  }

  if (finished) {
    const score = correct / questions.length;
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-slide-up">
        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <Trophy className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Quiz Complete!</h2>
        <p className="text-muted-foreground mb-2">{lesson?.title}</p>
        <p className="text-4xl font-bold text-primary mb-6">{Math.round(score * 100)}%</p>
        <p className="text-sm text-muted-foreground mb-6">
          You got {correct} out of {questions.length} correct
        </p>
        <a
          href="/lessons"
          className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Back to Lessons
        </a>
      </div>
    );
  }

  const q = questions[current];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correctIndex) setCorrect((c) => c + 1);
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      const finalCorrect = selected === q.correctIndex ? correct : correct;
      recordQuiz(lessonId, (selected === q.correctIndex ? correct : correct) / questions.length);
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto animate-slide-up">
      <div className="mb-6">
        <p className="text-xs text-muted-foreground mb-2">
          Question {current + 1} of {questions.length}
        </p>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-6">{q.question}</h2>

      <div className="space-y-3 mb-6">
        {q.options.map((opt, i) => {
          let classes = "border-border";
          if (selected !== null) {
            if (i === q.correctIndex) classes = "border-primary bg-primary/5";
            else if (i === selected) classes = "border-destructive bg-destructive/5";
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors ${classes} ${
                selected === null ? "hover:border-primary/40 cursor-pointer" : "cursor-default"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-foreground">{opt}</span>
                {selected !== null && i === q.correctIndex && <CheckCircle2 className="h-4 w-4 text-primary" />}
                {selected !== null && i === selected && i !== q.correctIndex && (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="bg-muted rounded-xl p-4 mb-6">
          <p className="text-xs font-semibold text-foreground mb-1">Explanation</p>
          <p className="text-sm text-muted-foreground">{q.explanation}</p>
        </div>
      )}

      {selected !== null && (
        <button
          onClick={next}
          className="w-full py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          {current + 1 >= questions.length ? "See Results" : "Next Question"}
        </button>
      )}
    </div>
  );
}
