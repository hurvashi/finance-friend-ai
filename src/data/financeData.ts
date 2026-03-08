export interface Lesson {
  id: string;
  module: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  completed: boolean;
}

export interface QuizQuestion {
  id: string;
  lessonId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const lessons: Lesson[] = [
  { id: "1", module: "Money Basics", title: "What is Money?", description: "Understand the history and role of money in modern society.", duration: "5 min", difficulty: "beginner", completed: false },
  { id: "2", module: "Money Basics", title: "Income vs Expenses", description: "Learn the fundamental difference and why tracking matters.", duration: "5 min", difficulty: "beginner", completed: false },
  { id: "3", module: "Money Basics", title: "Budgeting 101", description: "Create your first budget with the 50/30/20 rule.", duration: "8 min", difficulty: "beginner", completed: false },
  { id: "4", module: "Saving & Debt", title: "Emergency Fund", description: "Why everyone needs 3-6 months of expenses saved.", duration: "6 min", difficulty: "beginner", completed: false },
  { id: "5", module: "Saving & Debt", title: "Good Debt vs Bad Debt", description: "Not all debt is created equal. Learn the difference.", duration: "7 min", difficulty: "intermediate", completed: false },
  { id: "6", module: "Saving & Debt", title: "Interest Rates Explained", description: "How interest works for and against you.", duration: "8 min", difficulty: "intermediate", completed: false },
  { id: "7", module: "Investing", title: "Intro to Investing", description: "Stocks, bonds, and why your money should work for you.", duration: "10 min", difficulty: "intermediate", completed: false },
  { id: "8", module: "Investing", title: "Risk & Return", description: "Understanding the relationship between risk and reward.", duration: "8 min", difficulty: "intermediate", completed: false },
  { id: "9", module: "Investing", title: "Index Funds & ETFs", description: "The simplest way to start investing today.", duration: "7 min", difficulty: "intermediate", completed: false },
  { id: "10", module: "Advanced", title: "Compound Interest", description: "The 8th wonder of the world and how to harness it.", duration: "8 min", difficulty: "advanced", completed: false },
];

export const quizzes: Record<string, QuizQuestion[]> = {
  "1": [
    { id: "q1", lessonId: "1", question: "What are the three main functions of money?", options: ["Store of value, medium of exchange, unit of account", "Savings, spending, investing", "Coins, bills, digital", "Income, expense, profit"], correctIndex: 0, explanation: "Money serves as a store of value, a medium of exchange, and a unit of account." },
    { id: "q2", lessonId: "1", question: "What is 'fiat money'?", options: ["Money made of gold", "Money backed by a government's declaration", "Digital cryptocurrency", "Foreign currency"], correctIndex: 1, explanation: "Fiat money has value because a government says it does, not because it's backed by a physical commodity." },
  ],
  "3": [
    { id: "q3", lessonId: "3", question: "In the 50/30/20 rule, what does the 50% cover?", options: ["Wants", "Savings", "Needs", "Investments"], correctIndex: 2, explanation: "50% goes to needs like rent, food, and utilities." },
    { id: "q4", lessonId: "3", question: "What percentage goes to savings in the 50/30/20 rule?", options: ["50%", "30%", "20%", "10%"], correctIndex: 2, explanation: "20% of your income should go toward savings and debt repayment." },
  ],
  "7": [
    { id: "q5", lessonId: "7", question: "What is a stock?", options: ["A loan to a company", "Ownership share in a company", "A government bond", "A savings account"], correctIndex: 1, explanation: "A stock represents partial ownership in a company." },
    { id: "q6", lessonId: "7", question: "What is diversification?", options: ["Buying one stock", "Spreading investments across different assets", "Saving cash only", "Day trading"], correctIndex: 1, explanation: "Diversification reduces risk by spreading investments across different assets." },
  ],
  "10": [
    { id: "q7", lessonId: "10", question: "What is compound interest?", options: ["Interest on the original amount only", "Interest on interest", "A fixed rate", "A tax on savings"], correctIndex: 1, explanation: "Compound interest is interest earned on both the principal and previously earned interest." },
  ],
};
