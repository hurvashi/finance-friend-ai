import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { findSmartAnswer } from "@/data/smartAnswers";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hey there! 👋 I'm your personal Finance Mentor.\n\nI'll teach you finance step by step — no confusing jargon, just simple explanations with real-life examples.\n\nAfter each concept, I'll ask you a quick question to make sure it clicks. Ready?\n\nPick a topic to start, or just ask me anything!\n\n• Money Basics\n• Budgeting\n• Inflation\n• Emergency Funds\n• Investing (Stocks, Mutual Funds)\n• Compound Interest",
};

interface TopicLesson {
  teach: string;
  followUp: string;
  correctKeywords: string[];
  praise: string;
}

const TOPIC_LESSONS: Record<string, TopicLesson> = {
  budget: {
    teach: `**Budgeting** is simply a plan for your money. Think of it like packing a suitcase — you decide what goes in before the trip, not after.\n\n**Real-life example:**\nSay you earn $3,000/month. A simple budget could look like:\n\n• 🏠 **50% Needs** ($1,500) — Rent, groceries, bills\n• 🎮 **30% Wants** ($900) — Eating out, Netflix, hobbies\n• 💰 **20% Savings** ($600) — Emergency fund, investments\n\nThis is called the **50/30/20 rule**.\n\n🤔 **Before I ask the quiz question, think about this:** If you got a surprise $500, your first instinct might be to spend it. But what if you treated "future you" as a person you're taking care of? How would you split that $500 between present-you and future-you?\n\n---\n🧠 **Quick check:** If you earn $4,000/month and follow the 50/30/20 rule, how much should go to savings?`,
    followUp: `That's the spirit! 🎉 **$800 is correct!** (20% of $4,000)\n\nYou're already thinking like a budgeter. The key is: **pay yourself first** — move savings out before you spend.\n\n🤔 **Something to ponder:** People who budget often say they feel *more* free, not less. Why do you think planning your money actually makes you feel richer?\n\nWant to learn about **Emergency Funds** next?`,
    correctKeywords: ["800", "eight hundred"],
    praise: "Incredible! You nailed it! 🎉",
  },
  inflation: {
    teach: `**Inflation** means prices go up over time, so your money buys less.\n\n**Real-life example:**\nRemember when a movie ticket cost $8? Now it's $15. The ticket didn't get "better" — money just became worth less.\n\nIf you hide $1,000 under your mattress for 10 years at 3% inflation, it would only buy about $740 worth of stuff. 🐛\n\n🤔 **Here's a thought:** If inflation is 7% and your savings earn 3%, are you actually gaining money or losing purchasing power? Sit with that for a moment — it changes how you think about "safe" savings.\n\n---\n🧠 **Quick check:** If a coffee costs $5 today and inflation is 4% per year, roughly what will it cost next year?`,
    followUp: `Yes! 🎉 **$5.20 is right!** ($5 × 1.04 = $5.20)\n\nThis is why investing matters — you need your money to grow *faster* than inflation.\n\n🤔 **Think deeper:** If your grandparents could buy a house for $30,000 and now it costs $400,000 — that's not the house getting "better." It's the dollar getting weaker. What does this mean for the cash sitting in your bank account right now?\n\nShall we explore **Compound Interest** next? It's the antidote to inflation!`,
    correctKeywords: ["5.20", "5.2", "$5.20"],
    praise: "Spot on! 🎯",
  },
  emergency: {
    teach: `An **Emergency Fund** is money set aside for unexpected expenses — your financial safety net.\n\n**Real-life example:**\nYour car breaks down: $800 repair. Without an emergency fund = credit card debt at 20% interest. With one = you pay cash, no stress.\n\n**Target:**\n• Start: **$1,000** mini fund\n• Goal: **3-6 months** of expenses\n\n🤔 **Think about this:** If you lost your job tomorrow, how many months could you survive? Whatever number just popped into your head — does it make you feel secure or anxious? That feeling IS the reason emergency funds exist.\n\n---\n🧠 **Quick check:** If your monthly expenses are $3,000, what's the minimum you'd want in a full emergency fund (3 months)?`,
    followUp: `🎉 **$9,000 is correct!** ($3,000 × 3 months)\n\nHaving this cushion means unexpected expenses become inconveniences, not disasters.\n\n🤔 **Deeper question:** Why do you think most financial advisors say to build an emergency fund *before* investing? What happens to your investments if you need to sell them during an emergency — and the market is down?\n\nReady to learn about **Investing**?`,
    correctKeywords: ["9000", "9,000", "$9,000", "$9000"],
    praise: "You got it! 💪",
  },
  money: {
    teach: `Let's start with **What is money?**\n\nMoney is a tool we all agree has value. It does three things:\n\n1. 🛒 **Medium of exchange** — Trade it for goods\n2. 📏 **Unit of account** — Measures value ($5 vs $50)\n3. 🏦 **Store of value** — Save it for later\n\n**Example:** Before money, people bartered — 3 chickens for a haircut. Awkward, right? Money solved that.\n\n🤔 **Something to think about:** Money "stores" your work. You trade 8 hours of labor for $120. But if inflation is 3%, that stored labor loses value every year. So is money really a *good* store of value — or just a *temporary* one? What might be a better long-term store?\n\n---\n🧠 **Quick check:** What are the three main functions of money?`,
    followUp: `🎉 **Exactly right!** Medium of exchange, unit of account, and store of value.\n\n🤔 **One more thought:** If everyone stopped believing the dollar had value tomorrow, it would become worthless paper. Money only works because of collective trust. Isn't it fascinating that the entire global economy runs on *belief*?\n\nWant to learn about **Budgeting** next?`,
    correctKeywords: ["exchange", "account", "store", "medium"],
    praise: "That's perfect! 🌟",
  },
  compound: {
    teach: `**Compound Interest** is earning interest on your interest — like a snowball rolling downhill.\n\n**Example:**\n$1,000 at 10%:\n• Year 1: $1,100 (earned $100)\n• Year 2: $1,210 (earned $110!)\n• Year 3: $1,331 (earned $121!)\n\nYou earn MORE each year because interest builds on itself.\n\n🤔 **Here's what blows people's minds:** Investing $200/month from age 25 = ~$700,000 by 65. Starting at 35 = ~$300,000. Those 10 "extra" years are worth $400,000. Ask yourself: what is one year of delay actually costing your future self?\n\n---\n🧠 **Quick check:** If you invest $1,000 at 10% for 2 years with compound interest, how much do you have?`,
    followUp: `🎉 **$1,210 is correct!**\n\nYear 1: $1,000 + $100 = $1,100\nYear 2: $1,100 + $110 = $1,210\n\n🤔 **A question worth millions:** If compound interest works this well for your investments, what happens when it works *against* you — like a credit card at 22% interest compounding monthly? The same math that builds wealth can destroy it. Which side do you want to be on?\n\nWant to explore **Stocks & Mutual Funds** next?`,
    correctKeywords: ["1210", "1,210", "$1,210", "$1210"],
    praise: "Brilliant! 🚀",
  },
  stock: {
    teach: `A **Stock** is a tiny ownership share in a company. Buy one share of Apple, and you literally own a piece of it.\n\n**Mutual Funds** are baskets of stocks — buy one fund, own hundreds of companies instantly.\n\n**Scenario:**\nWith $100:\n• 1 stock of Company A (risky — if it fails, you lose everything)\n• A mutual fund holding 500 companies (safer — one failure barely hurts)\n\n🤔 **A question for you:** If 90% of professional fund managers can't beat a simple index fund over 10 years, what does that tell you about trying to pick individual winning stocks? Sometimes the "boring" choice is the smartest one.\n\n---\n🧠 **Quick check:** What's the main advantage of a mutual fund over buying a single stock?`,
    followUp: `🎉 **Exactly!** Diversification. No single failure can wipe you out.\n\n🤔 **Think deeper:** If diversification is so obviously smart, why do so many people still put all their money in one "hot" stock they heard about? What role do emotions play in financial decisions — and how can you protect yourself from your own excitement?\n\nWant to learn about **Risk Management** next?`,
    correctKeywords: ["diversif", "spread", "risk", "basket", "many companies"],
    praise: "You're a natural! 🎯",
  },
  bank: {
    teach: `**Banking Basics** — a bank pays you a little rent (interest) for keeping your money there.\n\n**Two account types:**\n1. 🏃 **Checking** — Daily spending. Easy access, low interest.\n2. 🐢 **Savings** — Storing money. Earns interest (~4% at online banks).\n\n**Example:** $5,000 in savings at 4% APY = $200/year for doing nothing.\n\n🤔 **Consider this:** A traditional bank pays 0.01% on savings. A high-yield online bank pays 4.5%. On $10,000, that's $1 vs $450 per year. Same money, same effort — 450x difference. Why do most people never switch? Is it laziness, or do they simply not know? What's it costing YOU right now?\n\n---\n🧠 **Quick check:** Which account type is better for your emergency fund — checking or savings?`,
    followUp: `🎉 **Savings is correct!** Earns interest while staying accessible.\n\n🤔 **One last thought:** If switching banks takes 30 minutes and earns you $449 more per year, that's like getting paid $898/hour for your time. What other 30-minute financial tasks might have outsized returns?\n\nWhat would you like to learn about next?`,
    correctKeywords: ["saving"],
    praise: "Smart thinking! 💡",
  },
  risk: {
    teach: `**Risk Management** means understanding that higher rewards come with higher potential losses.\n\n**Think of it like roller coasters:**\n• 🎠 Savings = Kiddie ride (safe, ~4%)\n• 🎢 Stocks = Big coaster (~10%, but bumpy)\n• 🚀 Crypto = Extreme ride (could 2x or go to zero)\n\n**Golden rule:** Never invest money you can't afford to lose.\n\n🤔 **A powerful question:** Imagine your $10,000 investment drops to $7,000 tomorrow. Do you feel sick? Angry? Calm? Your emotional reaction to that imaginary scenario tells you your REAL risk tolerance — not what you think it is on paper. Be honest with yourself.\n\n---\n🧠 **Quick check:** If an investment promises "guaranteed 50% returns with zero risk," what should you do?`,
    followUp: `🎉 **Absolutely right — walk away!** If it sounds too good to be true, it is.\n\n🤔 **Final mentor question:** The best investors in history — Buffett, Bogle, Lynch — all say the same thing: *"The biggest risk is not taking any risk at all."* If inflation is 3% and your savings earn 1%, you're losing 2% per year *guaranteed*. So which is actually riskier — investing in the market, or keeping everything in cash?\n\nCheck your **Progress** page or try the **Investment Calculator**!`,
    correctKeywords: ["scam", "run", "avoid", "don't", "fake", "too good", "away", "no"],
    praise: "Wise beyond your years! 🛡️",
  },
};

function findTopic(input: string): string | null {
  const lower = input.toLowerCase();
  if (lower.includes("budget") || lower.includes("50/30/20")) return "budget";
  if (lower.includes("inflat")) return "inflation";
  if (lower.includes("emergency") || lower.includes("safety net")) return "emergency";
  if (lower.includes("money basic") || lower.includes("what is money")) return "money";
  if (lower.includes("compound") || lower.includes("interest")) return "compound";
  if (lower.includes("stock") || lower.includes("mutual") || lower.includes("invest") || lower.includes("diversif")) return "stock";
  if (lower.includes("bank") || lower.includes("checking") || lower.includes("savings account")) return "bank";
  if (lower.includes("risk")) return "risk";
  return null;
}

export default function TutorChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastTopic, setLastTopic] = useState<string | null>(null);
  const [awaitingAnswer, setAwaitingAnswer] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addAssistant = (content: string) => {
    setMessages((m) => [...m, { role: "assistant", content }]);
  };

  const send = () => {
    if (!input.trim()) return;
    const text = input.trim();
    const userMsg: Message = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      // Check if we're awaiting a quiz answer
      if (awaitingAnswer && lastTopic && TOPIC_LESSONS[lastTopic]) {
        const lesson = TOPIC_LESSONS[lastTopic];
        const lower = text.toLowerCase();
        const isCorrect = lesson.correctKeywords.some((kw) => lower.includes(kw));

        if (isCorrect) {
          addAssistant(lesson.followUp);
        } else {
          addAssistant(
            `Not quite — but don't worry, that's how we learn! 😊\n\nHere's a hint: Look at the numbers in the example above and try again. You can also type **"show answer"** if you'd like me to explain.`
          );
          if (lower.includes("show answer") || lower.includes("tell me") || lower.includes("give up")) {
            addAssistant(lesson.followUp);
            setAwaitingAnswer(false);
            setLastTopic(null);
          }
          setIsTyping(false);
          return;
        }
        setAwaitingAnswer(false);
        setLastTopic(null);
        setIsTyping(false);
        return;
      }

      // Find topic
      const topic = findTopic(text);
      if (topic && TOPIC_LESSONS[topic]) {
        addAssistant(TOPIC_LESSONS[topic].teach);
        setLastTopic(topic);
        setAwaitingAnswer(true);
      } else if (text.toLowerCase().includes("show answer") || text.toLowerCase().includes("tell me")) {
        if (lastTopic && TOPIC_LESSONS[lastTopic]) {
          addAssistant(TOPIC_LESSONS[lastTopic].followUp);
          setAwaitingAnswer(false);
          setLastTopic(null);
        } else {
          addAssistant("Pick a topic and I'll teach you! Here are some options:\n\n• Money Basics\n• Budgeting\n• Inflation\n• Emergency Funds\n• Banking\n• Stocks & Mutual Funds\n• Compound Interest\n• Risk Management");
        }
      } else {
        // Try smart Q&A for free-form questions
        const smartAnswer = findSmartAnswer(text);
        if (smartAnswer) {
          addAssistant(smartAnswer);
        } else {
          addAssistant(
            `Great question! 🤔 I don't have a specific lesson on that yet, but here's what I can teach you:\n\n**📚 Structured Lessons:**\n• Money Basics · Budgeting · Inflation\n• Emergency Funds · Banking · Compound Interest\n• Stocks & Mutual Funds · Risk Management\n\n**💬 Quick Answers:**\nTry asking about: credit scores, taxes, ETFs, dividends, crypto, retirement, real estate, insurance, loans, credit cards, market crashes, dollar cost averaging, net worth, or saving tips!\n\nJust type your question and I'll explain it simply.`
          );
        }
      }

      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-2rem)] animate-slide-up">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-foreground">AI Finance Tutor</h1>
        <p className="text-sm text-muted-foreground">Learn finance step by step — I'll explain, give examples, then quiz you!</p>
      </div>

      <div className="flex-1 overflow-auto space-y-4 mb-4 pr-1">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="h-4 w-4 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <User className="h-4 w-4 text-accent" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-pulse-soft" />
                <span className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-pulse-soft [animation-delay:0.2s]" />
                <span className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-pulse-soft [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Topic suggestions */}
      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {[
            "Teach me about budgeting",
            "What is a credit score?",
            "How do ETFs work?",
            "Explain compound interest",
            "How should I start investing?",
            "What is dollar cost averaging?",
          ].map((q) => (
            <button
              key={q}
              onClick={() => setInput(q)}
              className="px-3 py-1.5 text-xs font-medium rounded-full border border-border bg-card text-foreground hover:border-primary/40 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={awaitingAnswer ? "Type your answer..." : "Ask about a finance topic..."}
          className="flex-1 bg-muted rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
