/** Smart Q&A: keyword-matched answers in explain → example → tip format */

interface SmartAnswer {
  keywords: string[];
  answer: string;
}

const smartAnswers: SmartAnswer[] = [
  {
    keywords: ["credit score", "credit rating", "fico"],
    answer: `**📖 What is a Credit Score?**\n\nA credit score is a number (300-850) that tells lenders how reliable you are with borrowed money. Higher score = better loan terms, lower interest rates. It's like a financial report card.\n\n**💡 Real-world example:**\nTwo people want a $200,000 mortgage. Person A (750 score) gets 6% interest ($1,199/month). Person B (620 score) gets 8% ($1,468/month). That's $96,840 extra over 30 years — just from a number!\n\n**✅ Actionable tip:** Pay all bills on time and keep credit card usage below 30% of your limit.\n\n---\n🤔 **Think about this:** If a higher credit score saves you $96,840 on one loan, what might it save you across a lifetime of borrowing — car loans, credit cards, and mortgages combined?`,
  },
  {
    keywords: ["tax", "taxes", "income tax", "tax return"],
    answer: `**📖 How Do Taxes Work?**\n\nTaxes are money you pay to the government from your income. The US uses a "progressive" system — you pay a higher percentage only on income above certain thresholds, not on ALL your income.\n\n**💡 Real-world example:**\nEarning $50,000: you pay 10% on the first $11,000, 12% on the next chunk, 22% on the rest. Total: ~$6,307 — NOT $11,000 (which 22% of the whole $50K would be).\n\n**✅ Actionable tip:** Contribute to a 401(k) or IRA to reduce your taxable income.\n\n---\n🤔 **Think about this:** If you invest $6,000 in a traditional IRA and your tax rate is 22%, how much did you just save in taxes this year? And what will that $6,000 become in 30 years?`,
  },
  {
    keywords: ["etf", "exchange traded fund"],
    answer: `**📖 What is an ETF?**\n\nAn ETF (Exchange-Traded Fund) is a basket of investments you can buy and sell like a single stock. It gives you instant diversification — owning tiny pieces of hundreds of companies in one purchase.\n\n**💡 Real-world example:**\nBuying one share of VTI (~$250) gives you ownership in over 4,000 US companies. One purchase, instant diversification.\n\n**✅ Actionable tip:** Start with a broad market ETF like VTI or VOO. Set up automatic monthly purchases.\n\n---\n🤔 **Think about this:** If one of those 4,000 companies goes bankrupt, how much of your investment do you actually lose? That's the beauty of diversification — can you see why single stocks are riskier?`,
  },
  {
    keywords: ["dividend", "dividends"],
    answer: `**📖 What Are Dividends?**\n\nDividends are payments companies make to shareholders — like a "thank you" for owning their stock. Not all companies pay them, but those that do give you income just for holding shares.\n\n**💡 Real-world example:**\n100 shares at $1/share quarterly = $400/year without selling anything. Reinvest those dividends and they compound!\n\n**✅ Actionable tip:** Turn on "dividend reinvestment" (DRIP) in your brokerage account.\n\n---\n🤔 **Think about this:** If you reinvest $400 in dividends each year and those new shares also earn dividends, what happens after 20 years? Can you see how dividends create a "money machine"?`,
  },
  {
    keywords: ["crypto", "bitcoin", "cryptocurrency", "ethereum"],
    answer: `**📖 What is Cryptocurrency?**\n\nCryptocurrency is digital money on decentralized technology (blockchain). Bitcoin was first; thousands exist now. It's highly volatile — prices can swing 20%+ in a day.\n\n**💡 Real-world example:**\nBitcoin went from $60K to $30K and back to $60K+ within a year. Panic-sellers lost half. Holders recovered fully.\n\n**✅ Actionable tip:** Never invest more than 5-10% of your portfolio in crypto, and only money you can afford to lose completely.\n\n---\n🤔 **Think about this:** If you invested $10,000 in crypto and it dropped 50% overnight, could you sleep peacefully? If not, that tells you something important about your risk tolerance. What amount *would* let you sleep?`,
  },
  {
    keywords: ["retirement", "retire", "401k", "401(k)", "ira", "pension"],
    answer: `**📖 How Does Retirement Saving Work?**\n\nRetirement accounts (401k, IRA) let your money grow tax-advantaged. A 401(k) is through your employer (often with matching!). An IRA is personal. Both let investments compound for decades.\n\n**💡 Real-world example:**\n$500/month from age 25 at 8% = ~$1.75 million by 65. Starting at 35 = ~$750,000. Ten years cost you a million dollars.\n\n**✅ Actionable tip:** Contribute enough to get your full employer 401(k) match — it's free money.\n\n---\n🤔 **Think about this:** Your employer offers a 50% match on your 401(k). If you DON'T contribute, you're essentially declining a 50% raise. Would you ever turn down a raise? Then why leave matching money on the table?`,
  },
  {
    keywords: ["real estate", "property", "house", "mortgage", "home"],
    answer: `**📖 Is Real Estate a Good Investment?**\n\nReal estate builds wealth through appreciation and rental income. But it's not passive — it requires maintenance, management, and large upfront costs.\n\n**💡 Real-world example:**\n$300,000 home with $60,000 down, appreciating 3%/year = $403,000 in 10 years. Your $60K gained $103,000 — that's leverage.\n\n**✅ Actionable tip:** Don't rush. Use a rent-vs-buy calculator before deciding.\n\n---\n🤔 **Think about this:** If you put that $60,000 down payment into index funds instead, earning 10%/year for 10 years, how much would you have? Which path builds more wealth — and which gives you a place to live? There's no single right answer.`,
  },
  {
    keywords: ["side hustle", "extra money", "passive income", "side income"],
    answer: `**📖 Building Extra Income Streams**\n\nRelying on one income source is risky. Side income creates financial resilience. Even small extra income, invested wisely, compounds dramatically.\n\n**💡 Real-world example:**\nA $500/month side hustle invested at 8% for 15 years = ~$173,000. Retirement money from your spare time.\n\n**✅ Actionable tip:** Start with skills you already have — writing, design, tutoring, fixing things.\n\n---\n🤔 **Think about this:** You spend 2 hours a day on social media. If you redirected just 1 hour to a skill that earns $25/hour, that's $9,000/year. Invested for 20 years at 8%, that's over $450,000. What's your hour really worth?`,
  },
  {
    keywords: ["insurance", "life insurance", "health insurance"],
    answer: `**📖 Why Insurance Matters**\n\nInsurance protects you from financial disasters you can't afford alone. You pay a small monthly premium so that if something big happens, the insurance company covers it.\n\n**💡 Real-world example:**\nA hospital stay costs $10,000+. Without insurance = devastating debt. With insurance = maybe $1,000 out-of-pocket.\n\n**✅ Actionable tip:** At minimum: health insurance + auto insurance. Renters insurance is usually just $15-30/month.\n\n---\n🤔 **Think about this:** You pay $300/month for health insurance and think "I never use it." But one emergency surgery costs $50,000. How many months of premiums is that? Sometimes the best investments are the ones you hope you never need.`,
  },
  {
    keywords: ["loan", "interest rate", "apr", "borrow"],
    answer: `**📖 How Loans & Interest Rates Work**\n\nWhen you borrow, you pay back the amount plus interest — a fee for using someone else's money. APR (Annual Percentage Rate) tells you the true yearly cost.\n\n**💡 Real-world example:**\n$20,000 car loan at 5% APR for 5 years = $22,645 total. At 10% APR = $25,496. That 5% difference costs $2,851.\n\n**✅ Actionable tip:** Always shop around for the lowest APR. Even 1-2% lower saves thousands.\n\n---\n🤔 **Think about this:** If you pay $2,851 extra in interest on a car loan, and that car loses 50% of its value in 5 years anyway — are you paying interest on something that's making you richer or poorer? How does this change how you think about car loans?`,
  },
  {
    keywords: ["save", "saving", "how to save", "saving money", "save money"],
    answer: `**📖 The Art of Saving Money**\n\nSaving is the foundation of financial health. It's not about deprivation — it's about intentional choices. The key is automation: make saving happen without willpower.\n\n**💡 Real-world example:**\nAutomate $200 on payday to a high-yield savings account (4.5% APY). After 3 years: ~$7,800 including $400+ in free interest.\n\n**✅ Actionable tip:** Set up an automatic transfer today — even $25/week.\n\n---\n🤔 **Think about this:** If you save $25/week, that's $1,300/year. In 10 years at 5%, it's ~$17,000. But if you DON'T save and face a $5,000 emergency, you'll borrow at 20% interest. Which path is actually cheaper — saving now or paying interest later?`,
  },
  {
    keywords: ["stock market", "market crash", "bear market", "recession"],
    answer: `**📖 Market Crashes & What To Do**\n\nCrashes happen every few years — it's normal. The S&P 500 has dropped 20%+ many times but has always recovered and gone higher. Panic selling locks in losses.\n\n**💡 Real-world example:**\nMarch 2020: stocks dropped 34%. By August — 5 months later — fully recovered. Panic-sellers missed the fastest recovery in history.\n\n**✅ Actionable tip:** During a crash, don't sell. If anything, invest MORE — stocks are "on sale."\n\n---\n🤔 **Think about this:** If your favorite store had a 30% off sale, would you run away or buy more? So why do investors do the opposite when stocks go on sale? What does that tell you about the role of emotions in financial decisions?`,
  },
  {
    keywords: ["credit card", "credit cards", "credit card debt"],
    answer: `**📖 Credit Cards: Tool or Trap?**\n\nCredit cards are powerful when used correctly (rewards, building credit) and dangerous when misused (carrying balances at 20%+ interest). The key: pay your full balance every month.\n\n**💡 Real-world example:**\n$3,000 balance at 22% APR with minimum payments = 10+ years to pay off and $3,800 in interest — more than the purchase itself!\n\n**✅ Actionable tip:** Use a credit card like a debit card — only spend what you already have.\n\n---\n🤔 **Think about this:** If you pay $3,800 in interest on a $3,000 purchase, you actually paid $6,800 total. Would you have still bought it if the price tag said $6,800? That's the real cost of credit card debt.`,
  },
  {
    keywords: ["dollar cost averaging", "dca", "when to invest", "timing"],
    answer: `**📖 Dollar Cost Averaging (DCA)**\n\nDCA means investing a fixed amount at regular intervals — regardless of price. When prices are high, you buy less. When low, you buy more. Over time, this averages out.\n\n**💡 Real-world example:**\n$500/month: January (expensive, 5 shares), February (cheap, 8 shares), March (recovering, 6 shares). Better average than trying to time it.\n\n**✅ Actionable tip:** Set up automatic monthly investments and stop worrying about timing.\n\n---\n🤔 **Think about this:** Nobody can predict the market — not even professionals. If the experts can't time it, should you try? Or is showing up consistently every month the real edge?`,
  },
  {
    keywords: ["net worth", "how rich", "wealth"],
    answer: `**📖 Understanding Your Net Worth**\n\nNet worth = what you own (assets) minus what you owe (liabilities). It's the single most important number in personal finance.\n\n**💡 Real-world example:**\n$10,000 savings + $25,000 car + $5,000 investments - $15,000 car loan - $3,000 credit cards = $22,000 net worth.\n\n**✅ Actionable tip:** Calculate your net worth today and track it monthly.\n\n---\n🤔 **Think about this:** Someone earns $200,000/year but spends $195,000. Another person earns $60,000 but saves $15,000. Who will be wealthier in 20 years? Income is vanity — net worth is sanity. Which number are you focused on?`,
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
