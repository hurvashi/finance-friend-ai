export interface DailyLesson {
  id: number;
  topic: string;
  emoji: string;
  title: string;
  body: string;
  example: string;
  reflection: string;
}

export const dailyLessons: DailyLesson[] = [
  {
    id: 1, topic: "Inflation", emoji: "📈",
    title: "Why Your Money Shrinks Over Time",
    body: "Inflation means prices rise each year, so your money buys less. If inflation is 3%, something costing $100 today will cost $103 next year. Your cash didn't disappear — it just became weaker.",
    example: "A gallon of milk cost $2.50 in 2005. Today it's about $4.50. That's inflation quietly working in the background.",
    reflection: "If your savings earn 1% but inflation is 3%, are you actually getting richer or poorer?",
  },
  {
    id: 2, topic: "Saving", emoji: "🐷",
    title: "The Magic of Paying Yourself First",
    body: "Most people save what's left after spending. Flip that — save first, then spend what's left. Set up an automatic transfer to savings on payday. You'll barely notice the difference, but your savings will grow fast.",
    example: "Auto-saving $150 on the 1st of each month means $1,800 saved by December — without thinking about it once.",
    reflection: "What's one expense you could cut this week and redirect to savings instead?",
  },
  {
    id: 3, topic: "Compound Interest", emoji: "🔄",
    title: "Interest on Interest: Your Secret Weapon",
    body: "Compound interest means you earn returns on your returns. It starts slow but accelerates over time — like a snowball rolling downhill. The earlier you start, the bigger it gets.",
    example: "$5,000 invested at 8% becomes $10,800 in 10 years and $23,300 in 20 years — without adding a single dollar.",
    reflection: "If you started investing just $50/month today, what could it become in 30 years?",
  },
  {
    id: 4, topic: "Risk", emoji: "⚖️",
    title: "No Risk, No Reward — But Be Smart",
    body: "Every investment has risk. Savings accounts are safe but grow slowly. Stocks are volatile but historically return more. The key isn't avoiding risk — it's understanding how much you can handle.",
    example: "A savings account gives ~4% safely. The stock market averages ~10% but can drop 30% in a bad year.",
    reflection: "If your investment dropped 20% tomorrow, would you panic sell or stay the course?",
  },
  {
    id: 5, topic: "Diversification", emoji: "🧺",
    title: "Don't Put All Your Eggs in One Basket",
    body: "Diversification means spreading your money across different investments. If one fails, others protect you. It's the simplest way to reduce risk without reducing expected returns.",
    example: "Owning one stock is risky. Owning an index fund with 500 stocks means one failure barely hurts you.",
    reflection: "If you had $10,000 to invest, would you put it all in one company or spread it across many?",
  },
  {
    id: 6, topic: "Budgeting", emoji: "📊",
    title: "A Budget Is Permission to Spend",
    body: "A budget isn't restrictive — it's freeing. When you plan where money goes, you can spend guilt-free on things you love because essentials and savings are already covered.",
    example: "With a 50/30/20 budget on $4,000: $2,000 for needs, $1,200 for wants (guilt-free!), $800 to savings.",
    reflection: "Do you know exactly where your money went last month? If not, what would tracking reveal?",
  },
  {
    id: 7, topic: "Emergency Fund", emoji: "🛡️",
    title: "Your Financial Safety Net",
    body: "Unexpected expenses happen — car repairs, medical bills, job loss. An emergency fund means you handle surprises with cash instead of credit card debt. Start with $1,000, then build to 3-6 months of expenses.",
    example: "Your laptop breaks and costs $600 to fix. With an emergency fund, it's an inconvenience. Without one, it's debt.",
    reflection: "If you lost your income today, how many months could you survive on savings?",
  },
  {
    id: 8, topic: "Investing", emoji: "🌱",
    title: "Investing Is Planting Seeds",
    body: "When you invest, you're planting financial seeds. Some grow fast, some slow, some don't sprout at all. But a diversified garden almost always produces fruit over time. The hardest part? Just starting.",
    example: "If you invested $200/month starting at age 25 at 8% return, you'd have ~$700,000 by 65.",
    reflection: "What's stopping you from investing your first $50 today?",
  },
  {
    id: 9, topic: "Debt", emoji: "⛓️",
    title: "Interest Works For You or Against You",
    body: "When you save or invest, interest makes you money. When you carry debt, interest costs you money. High-interest debt (like credit cards at 20%) can undo months of saving in weeks.",
    example: "A $5,000 credit card balance at 20% interest costs you $1,000/year — just in interest, not paying it off.",
    reflection: "Do you have any high-interest debt that's secretly eating your wealth?",
  },
  {
    id: 10, topic: "Index Funds", emoji: "📦",
    title: "The Lazy Way to Build Wealth",
    body: "Index funds hold hundreds of stocks in one purchase. They're cheap, diversified, and historically beat most professional fund managers. Warren Buffett recommends them for a reason.",
    example: "An S&P 500 index fund returned an average of ~10% per year over the last 50 years.",
    reflection: "Would you rather pick individual stocks or own a piece of the 500 biggest companies at once?",
  },
  {
    id: 11, topic: "Net Worth", emoji: "🧮",
    title: "The One Number That Matters Most",
    body: "Net worth = what you own minus what you owe. It's the truest measure of financial health. Track it monthly. Seeing it grow — even slowly — is incredibly motivating.",
    example: "You own $15,000 in savings and a $20,000 car, but owe $10,000 on loans. Net worth: $25,000.",
    reflection: "Have you ever calculated your net worth? What do you think it would be?",
  },
  {
    id: 12, topic: "Time Value", emoji: "⏰",
    title: "Time Is Your Greatest Financial Asset",
    body: "A dollar today is worth more than a dollar tomorrow because today's dollar can be invested. This is why starting early — even with tiny amounts — beats waiting for the 'perfect' time.",
    example: "Investing $100/month from age 22 beats investing $200/month from age 32 — by tens of thousands of dollars.",
    reflection: "What would your future self thank you for starting today?",
  },
  {
    id: 13, topic: "Spending Habits", emoji: "🔍",
    title: "Small Leaks Sink Big Ships",
    body: "It's rarely one big purchase that hurts your finances — it's dozens of small, mindless ones. A $5 daily coffee, unused subscriptions, impulse buys. Track spending for one month and you'll be surprised.",
    example: "$5/day on coffee = $1,825/year. Invested at 8% for 20 years, that's over $90,000.",
    reflection: "What's one small daily expense you could redirect toward your future?",
  },
  {
    id: 14, topic: "Patience", emoji: "🐢",
    title: "Wealth Is Built Slowly, Then Suddenly",
    body: "Compounding feels painfully slow at first. But after 10-15 years, growth accelerates dramatically. Most of Warren Buffett's wealth came after age 60. The secret? He started at 11 and never stopped.",
    example: "At 8% returns, it takes 9 years to double your money. But the second doubling only takes 9 more years — on a much bigger base.",
    reflection: "Can you commit to investing consistently for the next 10 years, even when it feels slow?",
  },
];

/** Returns today's daily lesson based on the date */
export function getTodayLesson(): DailyLesson {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return dailyLessons[dayOfYear % dailyLessons.length];
}
