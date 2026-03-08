import { create } from "zustand";

interface ProgressState {
  completedLessons: string[];
  quizScores: Record<string, number>;
  xp: number;
  streak: number;
  completeLesson: (id: string) => void;
  recordQuiz: (lessonId: string, score: number) => void;
  addXp: (amount: number) => void;
}

// Simple zustand-like state using React context would be overkill; let's use a simple hook with localStorage
import { useState, useEffect, useCallback } from "react";

interface UserProgress {
  completedLessons: string[];
  quizScores: Record<string, number>;
  xp: number;
}

const STORAGE_KEY = "finance-mentor-progress";

const defaultProgress: UserProgress = {
  completedLessons: [],
  quizScores: {},
  xp: 0,
};

function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultProgress, ...JSON.parse(raw) } : defaultProgress;
  } catch {
    return defaultProgress;
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeLesson = useCallback((id: string) => {
    setProgress((p) => {
      if (p.completedLessons.includes(id)) return p;
      return {
        ...p,
        completedLessons: [...p.completedLessons, id],
        xp: p.xp + 20,
      };
    });
  }, []);

  const recordQuiz = useCallback((lessonId: string, score: number) => {
    setProgress((p) => ({
      ...p,
      quizScores: { ...p.quizScores, [lessonId]: Math.max(p.quizScores[lessonId] ?? 0, score) },
      xp: p.xp + Math.round(score * 10),
    }));
  }, []);

  return { ...progress, completeLesson, recordQuiz };
}
