import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface UserProgress {
  completedLessons: string[];
  quizScores: Record<string, number>;
  xp: number;
}

const defaultProgress: UserProgress = {
  completedLessons: [],
  quizScores: {},
  xp: 0,
};

export function useProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [loaded, setLoaded] = useState(false);

  // Load progress from DB
  useEffect(() => {
    if (!user) {
      setProgress(defaultProgress);
      setLoaded(false);
      return;
    }

    const fetchProgress = async () => {
      const { data } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        setProgress({
          completedLessons: data.completed_lessons ?? [],
          quizScores: (data.quiz_scores as Record<string, number>) ?? {},
          xp: data.xp ?? 0,
        });
      }
      setLoaded(true);
    };

    fetchProgress();
  }, [user]);

  // Persist to DB
  const saveProgress = useCallback(
    async (newProgress: UserProgress) => {
      if (!user) return;

      await supabase.from("user_progress").upsert(
        {
          user_id: user.id,
          completed_lessons: newProgress.completedLessons,
          quiz_scores: newProgress.quizScores as any,
          xp: newProgress.xp,
        },
        { onConflict: "user_id" }
      );
    },
    [user]
  );

  const completeLesson = useCallback(
    (id: string) => {
      setProgress((p) => {
        if (p.completedLessons.includes(id)) return p;
        const updated = {
          ...p,
          completedLessons: [...p.completedLessons, id],
          xp: p.xp + 20,
        };
        saveProgress(updated);
        return updated;
      });
    },
    [saveProgress]
  );

  const recordQuiz = useCallback(
    (lessonId: string, score: number) => {
      setProgress((p) => {
        const updated = {
          ...p,
          quizScores: {
            ...p.quizScores,
            [lessonId]: Math.max(p.quizScores[lessonId] ?? 0, score),
          },
          xp: p.xp + Math.round(score * 10),
        };
        saveProgress(updated);
        return updated;
      });
    },
    [saveProgress]
  );

  return { ...progress, completeLesson, recordQuiz, loaded };
}
