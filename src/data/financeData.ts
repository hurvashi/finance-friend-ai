export interface Lesson {
  id: string;
  module: string;
  moduleIndex: number;
  title: string;
  description: string;
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface QuizQuestion {
  id: string;
  lessonId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// ─── 6 Modules × 4 Lessons = 24 Lessons ───

export const lessons: Lesson[] = [
  // Module 1: Money Fundamentals
  { id: "1-1", moduleIndex: 1, module: "Money Fundamentals", title: "What Is Money & Why It Matters", description: "Understand the history of money, barter systems, and why we use currency today.", duration: "5 min", difficulty: "beginner" },
  { id: "1-2", moduleIndex: 1, module: "Money Fundamentals", title: "Income, Expenses & Net Worth", description: "Learn the difference between what you earn, what you spend, and how to measure your financial health.", duration: "6 min", difficulty: "beginner" },
  { id: "1-3", moduleIndex: 1, module: "Money Fundamentals", title: "The Time Value of Money", description: "Why $100 today is worth more than $100 next year — and how this shapes every financial decision.", duration: "7 min", difficulty: "beginner" },
  { id: "1-4", moduleIndex: 1, module: "Money Fundamentals", title: "Good Debt vs Bad Debt", description: "Not all debt is harmful. Learn which borrowing builds wealth and which destroys it.", duration: "6 min", difficulty: "beginner" },

  // Module 2: Budgeting & Saving
  { id: "2-1", moduleIndex: 2, module: "Budgeting & Saving", title: "Budgeting 101: The 50/30/20 Rule", description: "Create your first budget by splitting income into needs, wants, and savings.", duration: "6 min", difficulty: "beginner" },
  { id: "2-2", moduleIndex: 2, module: "Budgeting & Saving", title: "Tracking Your Spending", description: "Practical strategies to know exactly where every dollar goes each month.", duration: "5 min", difficulty: "beginner" },
  { id: "2-3", moduleIndex: 2, module: "Budgeting & Saving", title: "Building an Emergency Fund", description: "Why you need 3-6 months of expenses saved and how to get there step by step.", duration: "7 min", difficulty: "beginner" },
  { id: "2-4", moduleIndex: 2, module: "Budgeting & Saving", title: "Smart Saving Strategies", description: "Automate savings, cut hidden costs, and make your money work before you spend it.", duration: "6 min", difficulty: "beginner" },

  // Module 3: Banking & Inflation
  { id: "3-1", moduleIndex: 3, module: "Banking & Inflation", title: "Banking Basics: Checking vs Savings", description: "Understand account types, fees, and how to choose the right bank for your needs.", duration: "6 min", difficulty: "beginner" },
  { id: "3-2", moduleIndex: 3, module: "Banking & Inflation", title: "Interest Rates & APY Explained", description: "How banks pay you for your deposits and what APY actually means for your money.", duration: "7 min", difficulty: "intermediate" },
  { id: "3-3", moduleIndex: 3, module: "Banking & Inflation", title: "What Is Inflation?", description: "Why prices rise over time and how inflation silently erodes your purchasing power.", duration: "7 min", difficulty: "intermediate" },
  { id: "3-4", moduleIndex: 3, module: "Banking & Inflation", title: "Beating Inflation with Smart Choices", description: "Strategies to ensure your money grows faster than prices rise.", duration: "6 min", difficulty: "intermediate" },

  // Module 4: Investing Fundamentals
  { id: "4-1", moduleIndex: 4, module: "Investing Fundamentals", title: "Why Invest? The Case for Growing Wealth", description: "Why saving alone isn't enough and how investing accelerates your financial goals.", duration: "6 min", difficulty: "intermediate" },
  { id: "4-2", moduleIndex: 4, module: "Investing Fundamentals", title: "Compound Interest: The 8th Wonder", description: "How earning interest on your interest creates exponential growth over time.", duration: "8 min", difficulty: "intermediate" },
  { id: "4-3", moduleIndex: 4, module: "Investing Fundamentals", title: "Types of Investment Accounts", description: "Brokerage accounts, IRAs, and 401(k)s — where to put your investments.", duration: "7 min", difficulty: "intermediate" },
  { id: "4-4", moduleIndex: 4, module: "Investing Fundamentals", title: "Understanding Risk & Return", description: "The fundamental relationship: higher potential reward always comes with higher risk.", duration: "7 min", difficulty: "intermediate" },

  // Module 5: Stocks & Mutual Funds
  { id: "5-1", moduleIndex: 5, module: "Stocks & Mutual Funds", title: "What Are Stocks?", description: "Buying a stock means owning a piece of a company. Learn how the stock market works.", duration: "8 min", difficulty: "intermediate" },
  { id: "5-2", moduleIndex: 5, module: "Stocks & Mutual Funds", title: "Mutual Funds & Index Funds", description: "Instant diversification in a single purchase — the beginner's best friend.", duration: "8 min", difficulty: "intermediate" },
  { id: "5-3", moduleIndex: 5, module: "Stocks & Mutual Funds", title: "ETFs: Exchange-Traded Funds", description: "Like mutual funds but traded like stocks — flexible, low-cost investing.", duration: "7 min", difficulty: "intermediate" },
  { id: "5-4", moduleIndex: 5, module: "Stocks & Mutual Funds", title: "Reading a Stock Chart", description: "Basic chart literacy — understand price, volume, and trends at a glance.", duration: "8 min", difficulty: "intermediate" },

  // Module 6: Diversification & Risk Management
  { id: "6-1", moduleIndex: 6, module: "Diversification & Risk Management", title: "Diversification: Don't Put All Eggs in One Basket", description: "How spreading investments across assets protects you from catastrophic loss.", duration: "7 min", difficulty: "advanced" },
  { id: "6-2", moduleIndex: 6, module: "Diversification & Risk Management", title: "Asset Allocation by Age", description: "How to balance stocks, bonds, and cash based on your timeline and goals.", duration: "7 min", difficulty: "advanced" },
  { id: "6-3", moduleIndex: 6, module: "Diversification & Risk Management", title: "Common Investing Mistakes", description: "Emotional trading, timing the market, and other pitfalls beginners must avoid.", duration: "8 min", difficulty: "advanced" },
  { id: "6-4", moduleIndex: 6, module: "Diversification & Risk Management", title: "Building Your First Portfolio", description: "Put it all together — a step-by-step guide to making your first investment.", duration: "10 min", difficulty: "advanced" },
];

// ─── Quizzes (2-3 questions per lesson where available) ───

export const quizzes: Record<string, QuizQuestion[]> = {
  "1-1": [
    { id: "q1-1a", lessonId: "1-1", question: "What are the three main functions of money?", options: ["Store of value, medium of exchange, unit of account", "Savings, spending, investing", "Coins, bills, digital payments", "Income, expense, profit"], correctIndex: 0, explanation: "Money serves as a store of value, medium of exchange, and unit of account — these are its three core functions." },
    { id: "q1-1b", lessonId: "1-1", question: "What system did people use before money existed?", options: ["Credit cards", "Barter system", "Stock market", "Banking"], correctIndex: 1, explanation: "Before money, people directly traded goods and services through the barter system." },
  ],
  "1-2": [
    { id: "q1-2a", lessonId: "1-2", question: "How do you calculate net worth?", options: ["Income minus taxes", "Assets minus liabilities", "Savings times interest", "Income minus expenses"], correctIndex: 1, explanation: "Net worth = what you own (assets) minus what you owe (liabilities)." },
    { id: "q1-2b", lessonId: "1-2", question: "If you earn $4,000/month and spend $3,200, what's your monthly surplus?", options: ["$400", "$800", "$3,200", "$1,200"], correctIndex: 1, explanation: "$4,000 - $3,200 = $800 surplus that can go toward savings or investing." },
  ],
  "1-3": [
    { id: "q1-3a", lessonId: "1-3", question: "Why is $100 today worth more than $100 in a year?", options: ["Inflation makes things cheaper", "Money can be invested to earn returns", "Banks charge fees", "Taxes reduce its value"], correctIndex: 1, explanation: "$100 today can be invested to grow, so it has more potential value than $100 received later." },
  ],
  "1-4": [
    { id: "q1-4a", lessonId: "1-4", question: "Which is an example of 'good debt'?", options: ["Credit card for luxury shopping", "A student loan for a valuable degree", "Payday loan for bills", "Car loan for a sports car"], correctIndex: 1, explanation: "Good debt is borrowing that builds long-term value, like education or a mortgage on an appreciating home." },
  ],
  "2-1": [
    { id: "q2-1a", lessonId: "2-1", question: "In the 50/30/20 rule, what does the 50% cover?", options: ["Wants", "Savings", "Needs", "Investments"], correctIndex: 2, explanation: "50% goes to needs like rent, food, utilities, and insurance." },
    { id: "q2-1b", lessonId: "2-1", question: "If you earn $5,000/month, how much goes to savings in the 50/30/20 rule?", options: ["$500", "$1,000", "$1,500", "$2,500"], correctIndex: 1, explanation: "20% of $5,000 = $1,000 toward savings and debt repayment." },
  ],
  "2-3": [
    { id: "q2-3a", lessonId: "2-3", question: "How many months of expenses should your emergency fund cover?", options: ["1 month", "3-6 months", "12 months", "It doesn't matter"], correctIndex: 1, explanation: "Financial experts recommend saving 3-6 months of living expenses for emergencies." },
    { id: "q2-3b", lessonId: "2-3", question: "If monthly expenses are $2,500, what's your minimum emergency fund goal?", options: ["$2,500", "$5,000", "$7,500", "$15,000"], correctIndex: 2, explanation: "$2,500 × 3 months = $7,500 minimum emergency fund." },
  ],
  "3-1": [
    { id: "q3-1a", lessonId: "3-1", question: "Which account type is best for daily spending?", options: ["Savings account", "Checking account", "Investment account", "Certificate of deposit"], correctIndex: 1, explanation: "Checking accounts are designed for frequent transactions and daily spending." },
  ],
  "3-3": [
    { id: "q3-3a", lessonId: "3-3", question: "If coffee costs $5 today and inflation is 4%, what will it cost next year?", options: ["$5.04", "$5.20", "$5.40", "$9.00"], correctIndex: 1, explanation: "$5 × 1.04 = $5.20. Inflation of 4% means prices rise by 4% per year." },
    { id: "q3-3b", lessonId: "3-3", question: "What does inflation do to your purchasing power?", options: ["Increases it", "Decreases it", "Has no effect", "Doubles it"], correctIndex: 1, explanation: "Inflation means each dollar buys less over time, decreasing your purchasing power." },
  ],
  "4-2": [
    { id: "q4-2a", lessonId: "4-2", question: "If you invest $1,000 at 10% compound interest for 2 years, how much do you have?", options: ["$1,100", "$1,200", "$1,210", "$1,250"], correctIndex: 2, explanation: "Year 1: $1,000 × 1.10 = $1,100. Year 2: $1,100 × 1.10 = $1,210." },
    { id: "q4-2b", lessonId: "4-2", question: "What makes compound interest different from simple interest?", options: ["It's calculated monthly", "You earn interest on your interest", "It's only for savings accounts", "It's always higher"], correctIndex: 1, explanation: "Compound interest means you earn interest on both your principal AND previously earned interest." },
  ],
  "4-4": [
    { id: "q4-4a", lessonId: "4-4", question: "What's the relationship between risk and return?", options: ["Higher risk = lower return", "Higher risk = higher potential return", "Risk and return are unrelated", "Lower risk = higher return"], correctIndex: 1, explanation: "In investing, higher potential returns come with higher risk — this is a fundamental principle." },
  ],
  "5-1": [
    { id: "q5-1a", lessonId: "5-1", question: "What does buying a stock represent?", options: ["Lending money to a company", "Owning a piece of a company", "A guaranteed return", "A savings deposit"], correctIndex: 1, explanation: "A stock is a share of ownership in a company. Shareholders are part-owners." },
  ],
  "5-2": [
    { id: "q5-2a", lessonId: "5-2", question: "What's the main advantage of an index fund?", options: ["Guaranteed profits", "Instant diversification at low cost", "No risk at all", "Higher returns than any stock"], correctIndex: 1, explanation: "Index funds give you instant diversification by holding hundreds of stocks in one investment, usually at very low fees." },
  ],
  "6-1": [
    { id: "q6-1a", lessonId: "6-1", question: "What does 'diversification' mean in investing?", options: ["Buying one great stock", "Spreading money across different investments", "Only investing in bonds", "Saving cash under your mattress"], correctIndex: 1, explanation: "Diversification means spreading your investments across different assets so no single failure can wipe you out." },
    { id: "q6-1b", lessonId: "6-1", question: "If you invest $10,000 in a single stock and it drops 50%, you lose $5,000. If you spread it across 10 stocks and one drops 50%, how much do you lose?", options: ["$5,000", "$1,000", "$500", "$100"], correctIndex: 2, explanation: "$1,000 in each stock × 50% drop on one = $500 lost instead of $5,000. That's the power of diversification!" },
  ],
  "6-3": [
    { id: "q6-3a", lessonId: "6-3", question: "If someone promises 'guaranteed 50% returns with zero risk,' what should you do?", options: ["Invest immediately", "Ask for more details", "Walk away — it's likely a scam", "Borrow money to invest more"], correctIndex: 2, explanation: "If it sounds too good to be true, it is. No legitimate investment offers guaranteed high returns with zero risk." },
  ],
  "6-4": [
    { id: "q6-4a", lessonId: "6-4", question: "What's a good first investment for a beginner?", options: ["Penny stocks", "Cryptocurrency", "A low-cost index fund", "Options trading"], correctIndex: 2, explanation: "Low-cost index funds offer instant diversification, low fees, and historically solid returns — ideal for beginners." },
  ],
};
