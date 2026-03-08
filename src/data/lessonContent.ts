export interface LessonContent {
  explanation: string;
  example: string;
  scenario: string;
  takeaway: string;
}

export const lessonContent: Record<string, LessonContent> = {
  "1-1": {
    explanation: "Money is a tool everyone agrees has value. Before money, people traded directly — chickens for haircuts, wheat for tools. That was messy! Money solved this by giving us something universal to exchange. It does three things: lets you buy stuff (medium of exchange), measures how much things are worth (unit of account), and holds value for later (store of value).",
    example: "Think of money like a universal gift card. Instead of giving your boss 10 apples for your salary, you get dollars that work everywhere — at the grocery store, online, or overseas.",
    scenario: "You work 8 hours and earn $120. That $120 'stores' your work. Next week, you spend $40 on groceries and $20 on gas. You've exchanged your stored labor for things you need, and still have $60 saved for later.",
    takeaway: "Money is a tool with three jobs: exchange, measure, and store value. Understanding this is the foundation of all financial decisions.",
  },
  "1-2": {
    explanation: "Income is money coming in (salary, side hustles, gifts). Expenses are money going out (rent, food, subscriptions). Net worth is everything you own minus everything you owe. It's the single best number to track your financial health — like stepping on a scale for your money.",
    example: "You earn $3,500/month. You spend $2,800 on rent, food, and bills. Your monthly surplus is $700 — that's money you can save or invest.",
    scenario: "Sarah owns a car worth $15,000 and has $5,000 in savings. She owes $8,000 on her car loan and $2,000 on a credit card. Her net worth: ($15,000 + $5,000) - ($8,000 + $2,000) = $10,000.",
    takeaway: "Track your income, expenses, and net worth. You can't improve what you don't measure.",
  },
  "1-3": {
    explanation: "A dollar today is worth more than a dollar tomorrow. Why? Because you can invest today's dollar and earn returns. This concept — the time value of money — drives every financial decision from loans to retirement planning.",
    example: "If someone offers you $1,000 today or $1,000 in a year, always take it today. You could invest that $1,000 at 5% and have $1,050 in a year.",
    scenario: "You're offered a $10,000 bonus now or $10,500 in one year. If you can invest at 7%, taking $10,000 now gives you $10,700 in a year — better than waiting for $10,500!",
    takeaway: "Money has a time component. The sooner you have it, the more it can grow. Start saving and investing as early as possible.",
  },
  "1-4": {
    explanation: "Not all debt is evil. 'Good debt' helps you build wealth — like a mortgage on a home that appreciates or a student loan for a high-earning career. 'Bad debt' costs you money on things that lose value — like credit card debt for impulse shopping or a car loan on a depreciating vehicle.",
    example: "A $200,000 mortgage on a house that grows to $300,000 = good debt. A $5,000 credit card balance from clothes shopping at 20% interest = bad debt eating your wealth.",
    scenario: "Tom borrows $30,000 for a computer science degree and lands a $75,000 job. Lisa borrows $30,000 on credit cards for vacations. In 5 years, Tom's earning well. Lisa's still paying interest.",
    takeaway: "Before borrowing, ask: 'Will this debt make me richer or poorer over time?' If it builds value, it can be worth it.",
  },
  "2-1": {
    explanation: "A budget is a plan for your money. The simplest method is the 50/30/20 rule: 50% of income goes to needs (rent, groceries, insurance), 30% to wants (dining, hobbies, entertainment), and 20% to savings and debt payoff.",
    example: "You earn $4,000/month. Under 50/30/20: $2,000 for needs, $1,200 for wants, $800 for savings. Simple, flexible, and effective.",
    scenario: "You get a $300 bonus. Instead of spending it all, you split it: $150 into savings, $90 for something fun, $60 for groceries. You enjoyed the bonus AND built wealth.",
    takeaway: "A budget isn't restrictive — it's permission to spend guilt-free because you've already covered savings and essentials.",
  },
  "2-2": {
    explanation: "Tracking spending means knowing exactly where every dollar goes. Most people are shocked to find they spend hundreds on things they barely notice — subscriptions, daily coffee, impulse buys. Awareness is the first step to control.",
    example: "You think you spend $200/month on food. After tracking for a month, it's actually $450 — those quick lunches and delivery apps add up fast.",
    scenario: "After one month of tracking, you discover: $45 on unused subscriptions, $120 on impulse Amazon purchases, $80 on coffee runs. That's $245/month — nearly $3,000/year — you could redirect to savings.",
    takeaway: "Track every dollar for one month. The awareness alone will change your spending habits and reveal easy savings opportunities.",
  },
  "2-3": {
    explanation: "An emergency fund is savings set aside for unexpected expenses — job loss, medical bills, car repairs. Without one, surprises become debt. Start with a $1,000 mini fund, then build to 3-6 months of living expenses.",
    example: "Your washing machine breaks — $600 repair. With an emergency fund, you pay cash. Without one, it goes on a credit card at 20% interest, costing you even more.",
    scenario: "Monthly expenses: $3,000. Your emergency fund goal is $9,000-$18,000. You save $300/month and hit $9,000 in 2.5 years. Now you sleep better knowing you're covered.",
    takeaway: "An emergency fund turns financial disasters into minor inconveniences. Start small, but start today.",
  },
  "2-4": {
    explanation: "The best saving strategy is automation — set up automatic transfers to savings on payday, before you can spend it. 'Pay yourself first' means treating savings like a bill you can't skip.",
    example: "Your paycheck hits on the 1st. By the 2nd, $500 auto-transfers to savings. You budget the rest. You never 'forget' to save because it's automatic.",
    scenario: "You audit your spending and find $150/month in savings: cancel 2 unused subscriptions ($25), pack lunch twice a week ($60), switch to a cheaper phone plan ($35), reduce takeout ($30).",
    takeaway: "Automate your savings, cut invisible waste, and pay yourself first. Small consistent actions beat big one-time efforts.",
  },
  "3-1": {
    explanation: "Banks hold your money safely and offer two main account types. A checking account is for daily spending — easy access, low interest. A savings account is for storing money — harder to access, but earns interest. Choose a bank with low fees and good rates.",
    example: "Your paycheck goes into checking. You pay bills, buy groceries, swipe your debit card. Each month, $400 moves to savings where it earns 4% interest at a high-yield online bank.",
    scenario: "Traditional bank savings: 0.01% APY on $10,000 = $1/year. High-yield online bank: 4.5% APY on $10,000 = $450/year. Same effort, 450x more earnings.",
    takeaway: "Use checking for spending, savings for storing. Always compare bank rates — a high-yield savings account can earn you hundreds more per year.",
  },
  "3-2": {
    explanation: "APY (Annual Percentage Yield) is how much your bank pays you per year for keeping money there. Unlike simple interest, APY includes compound interest — you earn interest on your interest. A higher APY means your money grows faster.",
    example: "You deposit $5,000 in a 4.5% APY savings account. After one year, you have $5,225 — you earned $225 just for letting your money sit there.",
    scenario: "Bank A offers 0.5% APY. Bank B offers 4.5% APY. On $20,000: Bank A pays $100/year, Bank B pays $900/year. That's $800 difference for the same deposit!",
    takeaway: "Always check APY when choosing a savings account. Small percentage differences mean big dollar differences over time.",
  },
  "3-3": {
    explanation: "Inflation means prices go up over time, so your money buys less. If inflation is 3%, something costing $100 today will cost $103 next year. Your money didn't disappear — it just became weaker. That's why cash under a mattress slowly loses value.",
    example: "A movie ticket cost $8 in 2010, now it's $15. The movie didn't improve — your dollar's purchasing power shrank. That's inflation in action.",
    scenario: "You save $50,000 in cash for 20 years. At 3% inflation, that money would only buy $27,000 worth of today's goods. You lost almost half your purchasing power without spending a dime.",
    takeaway: "Inflation is a silent tax on your savings. To protect your wealth, your money must grow faster than inflation — that's why investing matters.",
  },
  "3-4": {
    explanation: "To beat inflation, your money needs to earn more than the inflation rate. Savings accounts help a little (4-5%), but investing in the stock market historically returns ~10% per year. The goal: keep your purchasing power growing, not shrinking.",
    example: "Inflation: 3%. Savings account: 4.5%. Stocks: ~10%. Cash under mattress: 0%. Only savings accounts and investments keep you ahead of inflation.",
    scenario: "You invest $10,000 in an index fund averaging 10%/year. After 10 years: ~$25,900. Meanwhile, inflation made things 34% more expensive. Your $25,900 still buys the equivalent of $19,300 in today's dollars — much better than cash.",
    takeaway: "Beat inflation by investing. Even a simple index fund historically outpaces rising prices by a wide margin.",
  },
  "4-1": {
    explanation: "Saving protects your money. Investing grows it. When you invest, your money works to earn more money. Over decades, investing can turn modest savings into serious wealth through growth and compounding. The biggest risk? Not investing at all.",
    example: "Save $500/month in cash for 30 years = $180,000. Invest $500/month at 8% average return for 30 years = ~$745,000. Same effort, 4x the result.",
    scenario: "Two friends start at 25. Alex saves $200/month in cash. Jordan invests $200/month in index funds. At 55, Alex has $72,000. Jordan has ~$300,000. The difference is the power of investment returns.",
    takeaway: "Saving is essential, but investing is how you build wealth. Start with what you can and let time do the heavy lifting.",
  },
  "4-2": {
    explanation: "Compound interest is earning interest on your interest — like a snowball rolling downhill, getting bigger every turn. The earlier you start, the more powerful it becomes. Even small amounts grow dramatically over time.",
    example: "$1,000 invested at 10%: Year 1 = $1,100, Year 2 = $1,210, Year 3 = $1,331. Notice you earn MORE each year because interest builds on itself.",
    scenario: "Invest $200/month starting at age 25 (8% return): ~$700,000 by 65. Start at 35: ~$300,000. Starting just 10 years earlier more than doubles your final amount. Time is your greatest asset.",
    takeaway: "Compound interest rewards patience. Start investing early — even small amounts — and let time multiply your money.",
  },
  "4-3": {
    explanation: "Where you invest matters for taxes. A regular brokerage account has no tax benefits. A 401(k) is through your employer with tax-deferred growth (often with matching!). An IRA is a personal retirement account with tax advantages. Use the right account for your goals.",
    example: "Your employer matches 50% of 401(k) contributions up to 6%. If you put in $200/month, they add $100. That's an instant 50% return before any investment growth!",
    scenario: "Step 1: Get full 401(k) employer match (free money). Step 2: Max out a Roth IRA ($6,500/year) for tax-free growth. Step 3: Invest more in your 401(k) or brokerage.",
    takeaway: "Always get your employer's 401(k) match — it's free money. Then use IRAs for additional tax-advantaged growth.",
  },
  "4-4": {
    explanation: "In investing, risk and return are always connected. Higher potential returns mean higher potential losses. Safe investments (savings, bonds) return less. Risky investments (stocks, crypto) can return more — or lose more. Your job is to find the right balance.",
    example: "Savings account: ~4% return, nearly zero risk. Stock market: ~10% average, but can drop 30%+ in bad years. Crypto: could 10x or go to zero.",
    scenario: "Think of it like speed and car accidents. Driving 25mph (bonds) is safe but slow. Driving 60mph (stocks) gets you there faster but with more risk. Driving 120mph (crypto/options) is thrilling but very dangerous.",
    takeaway: "There's no such thing as high return with zero risk. Understand your risk tolerance and invest accordingly.",
  },
  "5-1": {
    explanation: "A stock is a tiny ownership share in a company. Buy one share of Apple, and you literally own a piece of Apple. If Apple grows, your share becomes worth more. If it struggles, it drops. The stock market is where millions of people buy and sell these shares daily.",
    example: "Apple has ~15 billion shares. If you buy 10 shares at $180 each ($1,800 total), you own a tiny slice. If Apple's stock goes to $200, your 10 shares are now worth $2,000 — you gained $200.",
    scenario: "You invest $500 in a tech stock. It rises 20% in a year — your $500 becomes $600. But it could also drop 20% and become $400. Single stocks are exciting but risky.",
    takeaway: "Stocks offer ownership in companies and potential for growth, but individual stocks are volatile. Diversification reduces this risk.",
  },
  "5-2": {
    explanation: "A mutual fund pools money from thousands of investors to buy a basket of stocks. An index fund is a type of mutual fund that tracks a market index (like the S&P 500 — the top 500 US companies). You get instant diversification in a single purchase.",
    example: "Buying an S&P 500 index fund means you own a tiny piece of Apple, Microsoft, Amazon, Google, and 496 other companies — all in one investment.",
    scenario: "Instead of picking individual stocks and hoping they go up, you invest $5,000 in an S&P 500 index fund. Historically, this returns ~10% per year. In 20 years, your $5,000 becomes ~$33,600.",
    takeaway: "Index funds are the simplest, cheapest way to invest. Warren Buffett himself recommends them for most people.",
  },
  "5-3": {
    explanation: "An ETF (Exchange-Traded Fund) works like a mutual fund but trades like a stock. You can buy and sell it anytime during the day at the current price. They typically have very low fees and offer the same diversification as mutual funds.",
    example: "VOO is a popular ETF that tracks the S&P 500. You can buy one share for about $450 and instantly own a piece of 500 companies.",
    scenario: "You have $1,000 to invest. You buy 2 shares of a total market ETF at $450 each. It covers thousands of companies across all industries. One purchase, instant diversification, and you only pay a 0.03% fee.",
    takeaway: "ETFs combine the best of mutual funds (diversification) and stocks (flexibility). They're a great choice for beginner investors.",
  },
  "5-4": {
    explanation: "A stock chart shows how a stock's price moves over time. The line going up means the price is rising; going down means it's falling. Volume bars at the bottom show how many shares were traded. Trends help you see the big picture instead of reacting to daily noise.",
    example: "You look at a 5-year chart of the S&P 500. Despite several dips, the overall trend is upward. This reminds you not to panic during temporary drops.",
    scenario: "A stock drops 10% in one week. The chart shows it's still up 40% over the year. Without the chart, you might panic sell. With it, you see the bigger picture and stay calm.",
    takeaway: "Charts help you zoom out and see trends. Don't react to daily movements — focus on long-term direction.",
  },
  "6-1": {
    explanation: "Diversification means spreading your money across different investments so no single failure can hurt you badly. If you own 10 stocks and one goes to zero, you lose 10%. If you own 1 stock and it goes to zero, you lose everything.",
    example: "Imagine carrying 10 eggs. Putting them all in one basket is risky — drop it and they all break. Put one egg in each of 10 baskets, and dropping one only costs you one egg.",
    scenario: "You invest $10,000: $3,000 in US stocks, $2,000 in international stocks, $2,000 in bonds, $2,000 in real estate (REITs), $1,000 in a savings account. If US stocks drop 20%, you only lose $600 instead of $2,000.",
    takeaway: "Never put all your money in one investment. Spread it across different types of assets to protect yourself.",
  },
  "6-2": {
    explanation: "Asset allocation is how you divide your money between stocks (growth), bonds (stability), and cash (safety). A common rule: subtract your age from 110 to get your stock percentage. At 25, that's 85% stocks, 15% bonds. At 50, it's 60/40.",
    example: "At 25 with decades to retire, you can handle market ups and downs — so mostly stocks. At 60, you need stability — so more bonds and cash.",
    scenario: "Age 30: 80% stocks, 15% bonds, 5% cash. Your portfolio is aggressive because you have 30+ years for it to recover from any dips. At age 55: shift to 55% stocks, 35% bonds, 10% cash for more stability.",
    takeaway: "Your age and timeline determine your ideal mix. Young = more stocks for growth. Older = more bonds for stability.",
  },
  "6-3": {
    explanation: "Beginners often make predictable mistakes: panic selling during dips, trying to time the market, chasing hot tips, and checking their portfolio daily. The best investors are boring — they invest consistently and ignore the noise.",
    example: "During the 2020 market crash, people who panic-sold locked in losses. Those who stayed invested saw their money recover and grow within months.",
    scenario: "Your friend says 'This crypto will 10x!' You invest $5,000 based on the tip. It drops 80% and you lose $4,000. Meanwhile, a boring index fund returned 12% that year.",
    takeaway: "Avoid emotional decisions. Invest regularly, diversify, ignore hot tips, and think in decades — not days.",
  },
  "6-4": {
    explanation: "Building your first portfolio is simpler than you think. Open a brokerage account, start with a low-cost index fund or target-date fund, set up automatic monthly investments, and don't touch it. That's genuinely all most people need.",
    example: "Open a Roth IRA at Fidelity or Vanguard. Buy a target-date fund (like 'Target 2060'). Set up $100/month automatic investing. Done — you now have a solid retirement portfolio.",
    scenario: "Step 1: Open account (15 minutes). Step 2: Buy a total market index fund. Step 3: Set up $200/month auto-invest. Step 4: Check once a quarter, not daily. In 30 years at 8% average return, that $200/month becomes ~$300,000.",
    takeaway: "Don't overthink it. A simple index fund with automatic monthly contributions is better than a 'perfect' plan you never start.",
  },
};
