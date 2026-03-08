import { lessons } from "@/data/financeData";

export interface ProgressFeedback {
  headline: string;
  message: string;
  encouragement: string;
  nextSuggestion: string | null;
  nextLessonId: string | null;
  milestone: string | null;
}

const milestones: Record<number, string> = {
  1: "🌱 First Step! You've started your finance journey — that puts you ahead of most people!",
  4: "🏅 Module Master! You've completed your first full module. That's real commitment!",
  8: "🔥 Halfway Hero! You've completed a third of the roadmap. The hardest part is behind you!",
  12: "⭐ Halfway There! 12 lessons done — you now know more about finance than most adults!",
  16: "🚀 Almost There! Just 8 more lessons to go. You're building serious financial literacy!",
  20: "💎 Elite Learner! 20 lessons completed — you're in the top tier of financial knowledge!",
  24: "🎓 Finance Graduate! You've completed the entire roadmap. You're officially financially literate!",
};

const encouragements = [
  "Every lesson you complete is an investment in yourself — and this one always pays off! 📈",
  "You're building knowledge that will save (and earn) you thousands of dollars over your lifetime. Keep going! 💪",
  "Financial literacy is a superpower. You're getting stronger with every lesson! 🦸",
  "Most people never learn this stuff. The fact that you're here shows real dedication! 🌟",
  "Small steps lead to big changes. You're doing amazing! 🎯",
  "Remember: every expert was once a beginner. You're on the right track! 🛤️",
  "The best time to learn about money was yesterday. The second best time is right now — and here you are! ⏰",
  "You're not just learning — you're changing your financial future. That's powerful! ✨",
];

export function getProgressFeedback(completedLessonIds: string[]): ProgressFeedback {
  const count = completedLessonIds.length;
  const completedSet = new Set(completedLessonIds);

  // Find completed modules and topics
  const modules = Array.from(new Set(lessons.map((l) => l.module)));
  const completedModules = modules.filter((mod) =>
    lessons.filter((l) => l.module === mod).every((l) => completedSet.has(l.id))
  );
  const completedTopics = Array.from(
    new Set(lessons.filter((l) => completedSet.has(l.id)).map((l) => l.module))
  );

  // Find next lesson
  const nextLesson = lessons.find((l) => !completedSet.has(l.id));

  // Headline based on progress
  let headline: string;
  if (count === 0) {
    headline = "Ready to Start? 🚀";
  } else if (count <= 4) {
    headline = "Great Start! 🌱";
  } else if (count <= 8) {
    headline = "Building Momentum! 🔥";
  } else if (count <= 12) {
    headline = "Impressive Progress! ⭐";
  } else if (count <= 18) {
    headline = "Almost a Finance Pro! 💎";
  } else if (count < 24) {
    headline = "The Finish Line Is Near! 🏁";
  } else {
    headline = "You Did It! 🎓";
  }

  // Personalized message
  let message: string;
  if (count === 0) {
    message = "Your finance journey awaits! Start with the first lesson and begin building knowledge that will serve you for life.";
  } else if (count === 24) {
    message = `Incredible! You've completed all 24 lessons across ${modules.length} modules. You now understand money fundamentals, budgeting, banking, inflation, investing, stocks, and risk management. You're officially financially literate!`;
  } else {
    const topicNames = completedTopics.join(", ");
    const moduleDone = completedModules.length;
    message = `You've completed ${count} of 24 lessons${moduleDone > 0 ? ` and finished ${moduleDone} full module${moduleDone > 1 ? "s" : ""}` : ""}. Topics covered so far: ${topicNames}. ${nextLesson ? `Your next step is "${nextLesson.title}" in ${nextLesson.module}.` : ""}`;
  }

  // Pick encouragement based on count for consistency
  const encouragement = encouragements[count % encouragements.length];

  // Milestone
  const milestone = milestones[count] ?? null;

  // Next suggestion
  let nextSuggestion: string | null = null;
  if (nextLesson) {
    nextSuggestion = `I'd recommend tackling "${nextLesson.title}" next — it builds perfectly on what you've already learned!`;
  }

  return {
    headline,
    message,
    encouragement,
    nextSuggestion,
    nextLessonId: nextLesson?.id ?? null,
    milestone,
  };
}
