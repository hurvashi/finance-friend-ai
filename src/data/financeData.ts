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

// ─── Quizzes: 3 questions per lesson, all 24 lessons ───

export const quizzes: Record<string, QuizQuestion[]> = {
  // Module 1: Money Fundamentals
  "1-1": [
    { id: "q1-1a", lessonId: "1-1", question: "What are the three main functions of money?", options: ["Store of value, medium of exchange, unit of account", "Savings, spending, investing", "Coins, bills, digital payments", "Income, expense, profit"], correctIndex: 0, explanation: "Money serves as a store of value, medium of exchange, and unit of account — these are its three core functions." },
    { id: "q1-1b", lessonId: "1-1", question: "What system did people use before money existed?", options: ["Credit cards", "Barter system", "Stock market", "Banking"], correctIndex: 1, explanation: "Before money, people directly traded goods and services through the barter system." },
    { id: "q1-1c", lessonId: "1-1", question: "Which function of money allows you to save it for the future?", options: ["Medium of exchange", "Unit of account", "Store of value", "Legal tender"], correctIndex: 2, explanation: "Store of value means you can hold money and use it later — it preserves your purchasing power over short periods." },
  ],
  "1-2": [
    { id: "q1-2a", lessonId: "1-2", question: "How do you calculate net worth?", options: ["Income minus taxes", "Assets minus liabilities", "Savings times interest", "Income minus expenses"], correctIndex: 1, explanation: "Net worth = what you own (assets) minus what you owe (liabilities)." },
    { id: "q1-2b", lessonId: "1-2", question: "If you earn $4,000/month and spend $3,200, what's your monthly surplus?", options: ["$400", "$800", "$3,200", "$1,200"], correctIndex: 1, explanation: "$4,000 - $3,200 = $800 surplus that can go toward savings or investing." },
    { id: "q1-2c", lessonId: "1-2", question: "Which of these is a liability?", options: ["Your savings account", "Your car (fully paid)", "A $5,000 credit card balance", "Your monthly salary"], correctIndex: 2, explanation: "A liability is something you owe. A credit card balance is debt, which reduces your net worth." },
  ],
  "1-3": [
    { id: "q1-3a", lessonId: "1-3", question: "Why is $100 today worth more than $100 in a year?", options: ["Inflation makes things cheaper", "Money can be invested to earn returns", "Banks charge fees", "Taxes reduce its value"], correctIndex: 1, explanation: "$100 today can be invested to grow, so it has more potential value than $100 received later." },
    { id: "q1-3b", lessonId: "1-3", question: "If you invest $1,000 today at 5%, how much will it be worth in a year?", options: ["$1,005", "$1,050", "$1,500", "$1,100"], correctIndex: 1, explanation: "$1,000 × 1.05 = $1,050. That extra $50 is why getting money sooner is always better." },
    { id: "q1-3c", lessonId: "1-3", question: "The time value of money means you should:", options: ["Always spend money quickly", "Delay saving until you earn more", "Invest or save as early as possible", "Keep all money in cash"], correctIndex: 2, explanation: "The sooner you put money to work, the more time it has to grow through returns and compounding." },
  ],
  "1-4": [
    { id: "q1-4a", lessonId: "1-4", question: "Which is an example of 'good debt'?", options: ["Credit card for luxury shopping", "A student loan for a valuable degree", "Payday loan for bills", "Car loan for a sports car"], correctIndex: 1, explanation: "Good debt is borrowing that builds long-term value, like education or a mortgage on an appreciating home." },
    { id: "q1-4b", lessonId: "1-4", question: "What makes debt 'bad'?", options: ["It has any interest rate", "It's used to buy things that lose value", "You borrowed from a bank", "The monthly payment is over $100"], correctIndex: 1, explanation: "Bad debt finances things that depreciate or don't generate value — like high-interest consumer spending." },
    { id: "q1-4c", lessonId: "1-4", question: "A mortgage on a home that increases in value is typically considered:", options: ["Bad debt", "Neutral debt", "Good debt", "Illegal debt"], correctIndex: 2, explanation: "A mortgage can be good debt because the home may appreciate in value, building your wealth over time." },
  ],

  // Module 2: Budgeting & Saving
  "2-1": [
    { id: "q2-1a", lessonId: "2-1", question: "In the 50/30/20 rule, what does the 50% cover?", options: ["Wants", "Savings", "Needs", "Investments"], correctIndex: 2, explanation: "50% goes to needs like rent, food, utilities, and insurance." },
    { id: "q2-1b", lessonId: "2-1", question: "If you earn $5,000/month, how much goes to savings in the 50/30/20 rule?", options: ["$500", "$1,000", "$1,500", "$2,500"], correctIndex: 1, explanation: "20% of $5,000 = $1,000 toward savings and debt repayment." },
    { id: "q2-1c", lessonId: "2-1", question: "Which category do Netflix and dining out fall under?", options: ["Needs (50%)", "Wants (30%)", "Savings (20%)", "None of the above"], correctIndex: 1, explanation: "Entertainment and dining out are wants — nice to have, but not essential for survival." },
  ],
  "2-2": [
    { id: "q2-2a", lessonId: "2-2", question: "Why is tracking your spending important?", options: ["It makes spending more fun", "You can't improve what you don't measure", "Banks require it", "It increases your income"], correctIndex: 1, explanation: "Tracking reveals where your money actually goes, so you can make informed changes." },
    { id: "q2-2b", lessonId: "2-2", question: "You discover $45/month in unused subscriptions. How much is that per year?", options: ["$450", "$540", "$45", "$270"], correctIndex: 1, explanation: "$45 × 12 months = $540 per year that could be redirected to savings or investments." },
    { id: "q2-2c", lessonId: "2-2", question: "What's the best way to start tracking spending?", options: ["Guess at the end of each month", "Record every transaction for 30 days", "Only track big purchases", "Ask your bank to do it"], correctIndex: 1, explanation: "Recording every transaction for a full month gives you the most accurate picture of your spending habits." },
  ],
  "2-3": [
    { id: "q2-3a", lessonId: "2-3", question: "How many months of expenses should your emergency fund cover?", options: ["1 month", "3-6 months", "12 months", "It doesn't matter"], correctIndex: 1, explanation: "Financial experts recommend saving 3-6 months of living expenses for emergencies." },
    { id: "q2-3b", lessonId: "2-3", question: "If monthly expenses are $2,500, what's your minimum emergency fund goal?", options: ["$2,500", "$5,000", "$7,500", "$15,000"], correctIndex: 2, explanation: "$2,500 × 3 months = $7,500 minimum emergency fund." },
    { id: "q2-3c", lessonId: "2-3", question: "What's a good first milestone for an emergency fund?", options: ["$100", "$1,000", "$50,000", "$1 million"], correctIndex: 1, explanation: "$1,000 is a great starting mini emergency fund — it covers most common unexpected expenses like car repairs." },
  ],
  "2-4": [
    { id: "q2-4a", lessonId: "2-4", question: "What does 'pay yourself first' mean?", options: ["Buy yourself gifts before paying bills", "Move money to savings before spending", "Only spend on things you enjoy", "Pay off debt before saving"], correctIndex: 1, explanation: "Pay yourself first means automatically saving a portion of your income before you spend anything." },
    { id: "q2-4b", lessonId: "2-4", question: "Which saving strategy is most effective long-term?", options: ["Saving whatever is left at month's end", "Automating transfers on payday", "Only saving in December", "Waiting for a raise to start saving"], correctIndex: 1, explanation: "Automating removes willpower from the equation — you save consistently without thinking about it." },
    { id: "q2-4c", lessonId: "2-4", question: "You switch phone plans and save $35/month. How much is that in 5 years?", options: ["$350", "$1,050", "$2,100", "$4,200"], correctIndex: 2, explanation: "$35 × 12 months × 5 years = $2,100. Small changes add up to big numbers over time!" },
  ],

  // Module 3: Banking & Inflation
  "3-1": [
    { id: "q3-1a", lessonId: "3-1", question: "Which account type is best for daily spending?", options: ["Savings account", "Checking account", "Investment account", "Certificate of deposit"], correctIndex: 1, explanation: "Checking accounts are designed for frequent transactions and daily spending." },
    { id: "q3-1b", lessonId: "3-1", question: "A high-yield savings account typically offers:", options: ["0.01% APY", "4-5% APY", "20% APY", "No interest"], correctIndex: 1, explanation: "Online high-yield savings accounts typically offer 4-5% APY — much better than traditional banks' 0.01%." },
    { id: "q3-1c", lessonId: "3-1", question: "Where should you keep your emergency fund?", options: ["Under the mattress", "In stocks", "In a savings account", "In cryptocurrency"], correctIndex: 2, explanation: "A savings account keeps your emergency fund safe, accessible, and earning some interest." },
  ],
  "3-2": [
    { id: "q3-2a", lessonId: "3-2", question: "What does APY stand for?", options: ["Annual Payment Yield", "Annual Percentage Yield", "Average Profit Yearly", "Adjusted Price Yield"], correctIndex: 1, explanation: "APY = Annual Percentage Yield — it shows how much your money earns in a year, including compound interest." },
    { id: "q3-2b", lessonId: "3-2", question: "You have $10,000 at 4.5% APY. How much interest do you earn in a year?", options: ["$45", "$450", "$4,500", "$100"], correctIndex: 1, explanation: "$10,000 × 0.045 = $450 per year — just for keeping your money in the right account." },
    { id: "q3-2c", lessonId: "3-2", question: "Why is APY better than simple interest rate for comparing accounts?", options: ["It's always higher", "It includes the effect of compounding", "Banks prefer it", "It's easier to calculate"], correctIndex: 1, explanation: "APY accounts for compound interest, giving you a more accurate picture of your actual earnings." },
  ],
  "3-3": [
    { id: "q3-3a", lessonId: "3-3", question: "If coffee costs $5 today and inflation is 4%, what will it cost next year?", options: ["$5.04", "$5.20", "$5.40", "$9.00"], correctIndex: 1, explanation: "$5 × 1.04 = $5.20. Inflation of 4% means prices rise by 4% per year." },
    { id: "q3-3b", lessonId: "3-3", question: "What does inflation do to your purchasing power?", options: ["Increases it", "Decreases it", "Has no effect", "Doubles it"], correctIndex: 1, explanation: "Inflation means each dollar buys less over time, decreasing your purchasing power." },
    { id: "q3-3c", lessonId: "3-3", question: "Keeping $50,000 in cash for 20 years at 3% inflation means it buys about:", options: ["$50,000 worth of goods", "$27,000 worth of goods", "$75,000 worth of goods", "$100,000 worth of goods"], correctIndex: 1, explanation: "At 3% inflation, $50,000 loses nearly half its purchasing power over 20 years. That's why investing matters!" },
  ],
  "3-4": [
    { id: "q3-4a", lessonId: "3-4", question: "To beat inflation, your money should grow:", options: ["At exactly the inflation rate", "Slower than inflation", "Faster than inflation", "Growth doesn't matter"], correctIndex: 2, explanation: "Your returns must exceed inflation to actually increase your purchasing power over time." },
    { id: "q3-4b", lessonId: "3-4", question: "Which option historically beats inflation the best?", options: ["Cash in a jar", "Savings account", "Stock market index fund", "Checking account"], correctIndex: 2, explanation: "The stock market has historically returned ~10% per year, well above the ~3% average inflation rate." },
    { id: "q3-4c", lessonId: "3-4", question: "If inflation is 3% and your savings earn 1%, your real return is:", options: ["+4%", "+1%", "-2%", "0%"], correctIndex: 2, explanation: "Real return = nominal return - inflation. 1% - 3% = -2%. You're actually losing purchasing power!" },
  ],

  // Module 4: Investing Fundamentals
  "4-1": [
    { id: "q4-1a", lessonId: "4-1", question: "Why isn't saving in cash enough for long-term goals?", options: ["Cash is illegal to hold", "Inflation erodes its value over time", "Banks don't accept cash", "Saving is better than investing"], correctIndex: 1, explanation: "While saving is essential, inflation slowly reduces what cash can buy. Investing helps your money outpace inflation." },
    { id: "q4-1b", lessonId: "4-1", question: "Investing $500/month at 8% for 30 years gives approximately:", options: ["$180,000", "$500,000", "$745,000", "$1,000,000"], correctIndex: 2, explanation: "Compound returns turn $500/month into ~$745,000 over 30 years. Saving the same in cash gives only $180,000." },
    { id: "q4-1c", lessonId: "4-1", question: "The biggest risk in investing is:", options: ["Losing money in a market dip", "Not investing at all", "Picking the wrong stock", "Investing too early"], correctIndex: 1, explanation: "Over long periods, not investing means guaranteed loss to inflation. Market dips are temporary; not investing is permanent." },
  ],
  "4-2": [
    { id: "q4-2a", lessonId: "4-2", question: "If you invest $1,000 at 10% compound interest for 2 years, how much do you have?", options: ["$1,100", "$1,200", "$1,210", "$1,250"], correctIndex: 2, explanation: "Year 1: $1,000 × 1.10 = $1,100. Year 2: $1,100 × 1.10 = $1,210." },
    { id: "q4-2b", lessonId: "4-2", question: "What makes compound interest different from simple interest?", options: ["It's calculated monthly", "You earn interest on your interest", "It's only for savings accounts", "It's always higher"], correctIndex: 1, explanation: "Compound interest means you earn interest on both your principal AND previously earned interest." },
    { id: "q4-2c", lessonId: "4-2", question: "Starting to invest at 25 vs 35 (same monthly amount) typically results in:", options: ["Same final amount", "Slightly more at 25", "More than double at 25", "Less at 25 due to fees"], correctIndex: 2, explanation: "Starting 10 years earlier can more than double your final amount thanks to compound interest working longer." },
  ],
  "4-3": [
    { id: "q4-3a", lessonId: "4-3", question: "What's the first investment step regarding your employer's 401(k)?", options: ["Skip it and use a brokerage", "Contribute enough to get the full match", "Max it out immediately", "Only use it after age 50"], correctIndex: 1, explanation: "Always get the full employer match — it's literally free money. A 50% match is an instant 50% return!" },
    { id: "q4-3b", lessonId: "4-3", question: "What's a key benefit of a Roth IRA?", options: ["No contribution limits", "Tax-free growth and withdrawals in retirement", "Employer matching", "No age restrictions"], correctIndex: 1, explanation: "Roth IRA contributions are after-tax, but your money grows and can be withdrawn tax-free in retirement." },
    { id: "q4-3c", lessonId: "4-3", question: "A regular brokerage account differs from retirement accounts because:", options: ["It has no tax benefits but no withdrawal restrictions", "It's only for rich people", "It offers better returns", "It's managed by the government"], correctIndex: 0, explanation: "Brokerage accounts are flexible — no tax advantages, but you can withdraw anytime without penalties." },
  ],
  "4-4": [
    { id: "q4-4a", lessonId: "4-4", question: "What's the relationship between risk and return?", options: ["Higher risk = lower return", "Higher risk = higher potential return", "Risk and return are unrelated", "Lower risk = higher return"], correctIndex: 1, explanation: "In investing, higher potential returns come with higher risk — this is a fundamental principle." },
    { id: "q4-4b", lessonId: "4-4", question: "Which investment has the LOWEST risk?", options: ["Individual stocks", "Cryptocurrency", "High-yield savings account", "Options trading"], correctIndex: 2, explanation: "Savings accounts are FDIC insured and have virtually zero risk, though returns are also lower." },
    { id: "q4-4c", lessonId: "4-4", question: "An investment promising 'guaranteed 30% returns' is most likely:", options: ["A great opportunity", "A scam", "A government bond", "A mutual fund"], correctIndex: 1, explanation: "No legitimate investment guarantees high returns. If it sounds too good to be true, it's almost certainly a scam." },
  ],

  // Module 5: Stocks & Mutual Funds
  "5-1": [
    { id: "q5-1a", lessonId: "5-1", question: "What does buying a stock represent?", options: ["Lending money to a company", "Owning a piece of a company", "A guaranteed return", "A savings deposit"], correctIndex: 1, explanation: "A stock is a share of ownership in a company. Shareholders are part-owners." },
    { id: "q5-1b", lessonId: "5-1", question: "If a company's stock price goes from $50 to $60, how much did it gain?", options: ["10%", "20%", "$10", "Both 10% and $10"], correctIndex: 3, explanation: "The stock gained $10, which is ($10/$50) × 100 = 20%. Both are correct ways to express the gain." },
    { id: "q5-1c", lessonId: "5-1", question: "The main risk of owning a single stock is:", options: ["It always goes up", "The company could perform poorly", "Stocks never lose value", "Dividends are guaranteed"], correctIndex: 1, explanation: "Individual stocks are volatile — if the company struggles, your investment can lose significant value." },
  ],
  "5-2": [
    { id: "q5-2a", lessonId: "5-2", question: "What's the main advantage of an index fund?", options: ["Guaranteed profits", "Instant diversification at low cost", "No risk at all", "Higher returns than any stock"], correctIndex: 1, explanation: "Index funds give you instant diversification by holding hundreds of stocks in one investment, usually at very low fees." },
    { id: "q5-2b", lessonId: "5-2", question: "An S&P 500 index fund tracks:", options: ["The 500 cheapest stocks", "The top 500 US companies by market cap", "500 international stocks", "500 bonds"], correctIndex: 1, explanation: "The S&P 500 index represents the 500 largest publicly traded US companies." },
    { id: "q5-2c", lessonId: "5-2", question: "Who famously recommends index funds for most investors?", options: ["Elon Musk", "Warren Buffett", "Mark Zuckerberg", "Jeff Bezos"], correctIndex: 1, explanation: "Warren Buffett has repeatedly advised most people to invest in low-cost S&P 500 index funds." },
  ],
  "5-3": [
    { id: "q5-3a", lessonId: "5-3", question: "How is an ETF different from a mutual fund?", options: ["ETFs are riskier", "ETFs trade like stocks throughout the day", "Mutual funds have lower fees", "There's no difference"], correctIndex: 1, explanation: "ETFs can be bought and sold anytime during market hours, while mutual funds only trade at end-of-day prices." },
    { id: "q5-3b", lessonId: "5-3", question: "What does a 0.03% expense ratio mean on a $10,000 investment?", options: ["$3/year in fees", "$30/year in fees", "$300/year in fees", "$3,000/year in fees"], correctIndex: 0, explanation: "$10,000 × 0.0003 = $3 per year. Ultra-low fees are a major advantage of many ETFs!" },
    { id: "q5-3c", lessonId: "5-3", question: "ETFs are a good choice for beginners because:", options: ["They're guaranteed to go up", "They offer diversification, low fees, and flexibility", "They have no risk", "They're only available to professionals"], correctIndex: 1, explanation: "ETFs combine diversification (many stocks in one), low fees, and the flexibility to buy/sell anytime." },
  ],
  "5-4": [
    { id: "q5-4a", lessonId: "5-4", question: "On a stock chart, a line going upward over time indicates:", options: ["The company is losing money", "The stock price is rising", "Inflation is increasing", "Trading volume is high"], correctIndex: 1, explanation: "An upward trend line shows the stock price has been increasing over the time period shown." },
    { id: "q5-4b", lessonId: "5-4", question: "A stock drops 10% in one week but is up 40% for the year. You should:", options: ["Panic sell immediately", "Stay calm and look at the bigger picture", "Buy more right away", "Call your bank"], correctIndex: 1, explanation: "Short-term dips within a long-term uptrend are normal. Charts help you zoom out and avoid emotional reactions." },
    { id: "q5-4c", lessonId: "5-4", question: "Volume bars on a stock chart show:", options: ["The stock's price", "How many shares were traded", "The company's revenue", "Future predictions"], correctIndex: 1, explanation: "Volume shows how many shares changed hands — high volume often indicates strong interest or significant news." },
  ],

  // Module 6: Diversification & Risk Management
  "6-1": [
    { id: "q6-1a", lessonId: "6-1", question: "What does 'diversification' mean in investing?", options: ["Buying one great stock", "Spreading money across different investments", "Only investing in bonds", "Saving cash under your mattress"], correctIndex: 1, explanation: "Diversification means spreading your investments across different assets so no single failure can wipe you out." },
    { id: "q6-1b", lessonId: "6-1", question: "If you invest $10,000 across 10 stocks equally and one drops 50%, how much do you lose?", options: ["$5,000", "$1,000", "$500", "$100"], correctIndex: 2, explanation: "$1,000 in each stock × 50% drop on one = $500 lost instead of $5,000. That's the power of diversification!" },
    { id: "q6-1c", lessonId: "6-1", question: "The saying 'don't put all your eggs in one basket' refers to:", options: ["Grocery shopping tips", "Diversification", "Cooking advice", "Banking regulations"], correctIndex: 1, explanation: "This classic saying perfectly captures diversification — spread your investments to protect against any single loss." },
  ],
  "6-2": [
    { id: "q6-2a", lessonId: "6-2", question: "Using the 'subtract from 110' rule, what stock allocation should a 30-year-old have?", options: ["30%", "50%", "80%", "110%"], correctIndex: 2, explanation: "110 - 30 = 80% in stocks. Younger investors can handle more risk because they have decades to recover from dips." },
    { id: "q6-2b", lessonId: "6-2", question: "As you get closer to retirement, you should:", options: ["Move everything to stocks", "Shift more to bonds and cash", "Stop investing completely", "Invest in high-risk assets"], correctIndex: 1, explanation: "Near retirement, stability matters more. Shift toward bonds and cash to protect what you've built." },
    { id: "q6-2c", lessonId: "6-2", question: "Why do younger investors typically hold more stocks?", options: ["Stocks are less risky for young people", "They have more time to recover from market dips", "Bonds aren't available to young people", "Stocks are cheaper"], correctIndex: 1, explanation: "With decades until retirement, young investors can ride out short-term market drops and benefit from long-term growth." },
  ],
  "6-3": [
    { id: "q6-3a", lessonId: "6-3", question: "If someone promises 'guaranteed 50% returns with zero risk,' what should you do?", options: ["Invest immediately", "Ask for more details", "Walk away — it's likely a scam", "Borrow money to invest more"], correctIndex: 2, explanation: "If it sounds too good to be true, it is. No legitimate investment offers guaranteed high returns with zero risk." },
    { id: "q6-3b", lessonId: "6-3", question: "People who panic-sold during the 2020 crash and didn't buy back:", options: ["Made smart decisions", "Locked in their losses permanently", "Avoided all risk", "Beat the market"], correctIndex: 1, explanation: "Those who stayed invested saw recovery within months. Panic selling turns temporary dips into permanent losses." },
    { id: "q6-3c", lessonId: "6-3", question: "The best investing strategy for most people is:", options: ["Day trading based on news", "Following hot tips from friends", "Consistent investing in index funds over decades", "Timing the market perfectly"], correctIndex: 2, explanation: "Boring, consistent investing in diversified funds beats trying to time the market for the vast majority of people." },
  ],
  "6-4": [
    { id: "q6-4a", lessonId: "6-4", question: "What's a good first investment for a beginner?", options: ["Penny stocks", "Cryptocurrency", "A low-cost index fund", "Options trading"], correctIndex: 2, explanation: "Low-cost index funds offer instant diversification, low fees, and historically solid returns — ideal for beginners." },
    { id: "q6-4b", lessonId: "6-4", question: "After opening a brokerage account, what's the most important habit?", options: ["Checking prices every hour", "Setting up automatic monthly investments", "Following stock market news daily", "Trying to time the market"], correctIndex: 1, explanation: "Automatic monthly investing (dollar-cost averaging) removes emotion and builds wealth consistently over time." },
    { id: "q6-4c", lessonId: "6-4", question: "How often should a beginner check their long-term portfolio?", options: ["Every hour", "Daily", "Once a quarter", "Never"], correctIndex: 2, explanation: "Checking quarterly is enough. Checking too often leads to emotional decisions and unnecessary stress." },
  ],
};
