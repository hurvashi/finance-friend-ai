/** Smart Q&A: keyword-matched answers in explain → example → tip format */

interface SmartAnswer {
  keywords: string[];
  answer: string;
}

const smartAnswers: SmartAnswer[] = [
  {
    keywords: ["credit score", "credit rating", "fico"],
    answer: `**📖 What is a Credit Score?**\n\nA credit score is a number (300-850) that tells lenders how reliable you are with borrowed money. Higher score = better loan terms, lower interest rates. It's like a financial report card.\n\n**💡 Real-world example:**\nTwo people want a $200,000 mortgage. Person A has a 750 score and gets 6% interest ($1,199/month). Person B has a 620 score and gets 8% ($1,468/month). That's $269/month — or $96,840 over 30 years — just because of a credit score difference!\n\n**✅ Actionable tip:** Pay all bills on time and keep credit card usage below 30% of your limit. These two habits alone can significantly boost your score.`,
  },
  {
    keywords: ["tax", "taxes", "income tax", "tax return"],
    answer: `**📖 How Do Taxes Work?**\n\nTaxes are money you pay to the government from your income. The US uses a "progressive" system — you pay a higher percentage only on income above certain thresholds, not on ALL your income.\n\n**💡 Real-world example:**\nIf you earn $50,000: you pay 10% on the first $11,000 ($1,100), then 12% on $11,001-$44,725 ($4,047), then 22% on the rest ($1,160). Total: ~$6,307 — not $11,000 (which 22% of $50K would be).\n\n**✅ Actionable tip:** Contribute to a 401(k) or IRA to reduce your taxable income. Every dollar you invest pre-tax is a dollar the government doesn't tax this year.`,
  },
  {
    keywords: ["etf", "exchange traded fund"],
    answer: `**📖 What is an ETF?**\n\nAn ETF (Exchange-Traded Fund) is a basket of investments you can buy and sell like a single stock. It gives you instant diversification — owning tiny pieces of hundreds of companies in one purchase.\n\n**💡 Real-world example:**\nBuying one share of VTI (~$250) gives you ownership in over 4,000 US companies. Instead of researching individual stocks, you own a piece of the entire market.\n\n**✅ Actionable tip:** Start with a broad market ETF like VTI or VOO. Set up automatic monthly purchases and don't check the price daily — let time do the work.`,
  },
  {
    keywords: ["dividend", "dividends"],
    answer: `**📖 What Are Dividends?**\n\nDividends are payments companies make to shareholders — like a "thank you" for owning their stock. Not all companies pay them, but those that do give you income just for holding shares.\n\n**💡 Real-world example:**\nIf you own 100 shares of a company that pays $1/share quarterly, you receive $400/year without selling anything. Reinvest those dividends and they compound!\n\n**✅ Actionable tip:** Turn on "dividend reinvestment" (DRIP) in your brokerage account. This automatically buys more shares with your dividends, accelerating compound growth.`,
  },
  {
    keywords: ["crypto", "bitcoin", "cryptocurrency", "ethereum"],
    answer: `**📖 What is Cryptocurrency?**\n\nCryptocurrency is digital money that runs on decentralized technology (blockchain). Bitcoin was the first; thousands now exist. It's highly volatile — prices can swing 20%+ in a day.\n\n**💡 Real-world example:**\nBitcoin went from $60,000 to $30,000 and back to $60,000+ within a year. Someone who panic-sold at $30K lost half their money. Someone who held recovered fully.\n\n**✅ Actionable tip:** If you're interested in crypto, never invest more than 5-10% of your portfolio, and only money you can afford to lose completely. Master traditional investing first.`,
  },
  {
    keywords: ["retirement", "retire", "401k", "401(k)", "ira", "pension"],
    answer: `**📖 How Does Retirement Saving Work?**\n\nRetirement accounts (401k, IRA) let your money grow tax-advantaged. A 401(k) is through your employer (often with matching!). An IRA is personal. Both let investments compound for decades.\n\n**💡 Real-world example:**\nInvesting $500/month from age 25 at 8% returns = ~$1.75 million by 65. Starting at 35 with the same amount = ~$750,000. Those 10 early years are worth a million dollars!\n\n**✅ Actionable tip:** At minimum, contribute enough to get your full employer 401(k) match. It's literally free money — a 50-100% instant return before any market gains.`,
  },
  {
    keywords: ["real estate", "property", "house", "mortgage", "home"],
    answer: `**📖 Is Real Estate a Good Investment?**\n\nReal estate can build wealth through appreciation (value going up) and rental income. But it's not passive — it requires maintenance, management, and large upfront costs. It's also illiquid (hard to sell quickly).\n\n**💡 Real-world example:**\nYou buy a $300,000 home with $60,000 down. If it appreciates 3%/year, it's worth $403,000 in 10 years. Your $60,000 investment gained $103,000 — that's leverage at work.\n\n**✅ Actionable tip:** Don't rush to buy a house. Rent vs. buy depends on your location, timeline, and finances. Use an online rent-vs-buy calculator before deciding.`,
  },
  {
    keywords: ["side hustle", "extra money", "passive income", "side income"],
    answer: `**📖 Building Extra Income Streams**\n\nRelying on one income source is risky. Side income — freelancing, selling online, investing for dividends — creates financial resilience. Even small extra income, invested wisely, compounds dramatically.\n\n**💡 Real-world example:**\nA $500/month side hustle invested at 8% for 15 years = ~$173,000. That's retirement money from something you started in your spare time.\n\n**✅ Actionable tip:** Start with skills you already have. Can you write, design, tutor, or fix things? Monetize one existing skill before chasing trendy ideas.`,
  },
  {
    keywords: ["insurance", "life insurance", "health insurance"],
    answer: `**📖 Why Insurance Matters**\n\nInsurance protects you from financial disasters you can't afford on your own. You pay a small monthly amount (premium) so that if something big happens, the insurance company covers the cost.\n\n**💡 Real-world example:**\nA hospital stay can cost $10,000+. Without health insurance, that's devastating debt. With insurance, your out-of-pocket might be $1,000. The $300/month premium suddenly feels worth it.\n\n**✅ Actionable tip:** At minimum, have health insurance and auto insurance (if you drive). Consider renters/homeowners insurance too — it's usually cheap ($15-30/month) and covers theft, fire, and liability.`,
  },
  {
    keywords: ["loan", "interest rate", "apr", "borrow"],
    answer: `**📖 How Loans & Interest Rates Work**\n\nWhen you borrow money, you pay it back plus interest — a fee for using someone else's money. APR (Annual Percentage Rate) tells you the true yearly cost. Lower APR = cheaper borrowing.\n\n**💡 Real-world example:**\nA $20,000 car loan at 5% APR for 5 years costs $22,645 total. At 10% APR, it costs $25,496. That 5% difference costs you $2,851 extra!\n\n**✅ Actionable tip:** Always shop around for the lowest APR before borrowing. Even 1-2% lower can save you thousands. And pay more than the minimum when possible.`,
  },
  {
    keywords: ["save", "saving", "how to save", "saving money", "save money"],
    answer: `**📖 The Art of Saving Money**\n\nSaving is the foundation of financial health. It's not about deprivation — it's about intentional choices. The key is automation: make saving happen without willpower.\n\n**💡 Real-world example:**\nAutomate $200 on payday to a high-yield savings account (4.5% APY). After 3 years, you'll have ~$7,800 — including $400+ in free interest. You barely noticed the money leaving.\n\n**✅ Actionable tip:** Set up an automatic transfer today — even $25/week. Put it in a separate high-yield savings account so it's out of sight, out of mind.`,
  },
  {
    keywords: ["stock market", "market crash", "bear market", "recession"],
    answer: `**📖 Market Crashes & What To Do**\n\nMarket crashes happen every few years — it's normal. The S&P 500 has dropped 20%+ many times, but has always recovered and gone higher. Panic selling locks in losses; patience is rewarded.\n\n**💡 Real-world example:**\nIn March 2020, stocks dropped 34%. By August 2020 — just 5 months later — they'd fully recovered. Those who panic-sold missed the fastest recovery in history.\n\n**✅ Actionable tip:** During a crash, don't sell. If anything, invest MORE — you're buying stocks "on sale." Keep a written plan for what to do in a downturn so emotions don't drive decisions.`,
  },
  {
    keywords: ["credit card", "credit cards", "credit card debt"],
    answer: `**📖 Credit Cards: Tool or Trap?**\n\nCredit cards are powerful tools when used correctly (rewards, building credit) and dangerous traps when misused (carrying balances at 20%+ interest). The key: pay your full balance every month.\n\n**💡 Real-world example:**\nA $3,000 balance at 22% APR with minimum payments takes 10+ years to pay off and costs $3,800 in interest — more than the original purchase!\n\n**✅ Actionable tip:** Use a credit card like a debit card — only spend what you already have in your bank account, and pay the full statement balance each month. Never carry a balance.`,
  },
  {
    keywords: ["dollar cost averaging", "dca", "when to invest", "timing"],
    answer: `**📖 Dollar Cost Averaging (DCA)**\n\nDCA means investing a fixed amount at regular intervals — regardless of market price. When prices are high, you buy fewer shares. When low, you buy more. Over time, this averages out to a good price.\n\n**💡 Real-world example:**\nInvesting $500/month: In January stocks are expensive (you buy 5 shares). In February they drop (you buy 8 shares). In March they recover (you buy 6 shares). You averaged a better price than trying to time it.\n\n**✅ Actionable tip:** Set up automatic monthly investments and stop worrying about timing. Studies show DCA beats trying to "buy the dip" for most investors.`,
  },
  {
    keywords: ["net worth", "how rich", "wealth"],
    answer: `**📖 Understanding Your Net Worth**\n\nNet worth = what you own (assets) minus what you owe (liabilities). It's the single most important number in personal finance — your true financial scorecard.\n\n**💡 Real-world example:**\nYou have $10,000 in savings, a $25,000 car, and $5,000 in investments. You owe $15,000 on the car and $3,000 on credit cards. Net worth: $40,000 - $18,000 = $22,000.\n\n**✅ Actionable tip:** Calculate your net worth today and track it monthly. Use a simple spreadsheet. Watching it grow — even by small amounts — is incredibly motivating.`,
  },
];

export function findSmartAnswer(input: string): string | null {
  const lower = input.toLowerCase();
  for (const sa of smartAnswers) {
    if (sa.keywords.some((kw) => lower.includes(kw))) {
      return sa.answer;
    }
  }
  return null;
}
