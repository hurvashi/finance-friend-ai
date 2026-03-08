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
    teach: `**Budgeting** is simply a plan for your money. Think of it like packing a suitcase — you decide what goes in before the trip, not after.\n\n**Real-life example:**\nSay you earn $3,000/month. A simple budget could look like:\n\n• 🏠 **50% Needs** ($1,500) — Rent, groceries, bills\n• 🎮 **30% Wants** ($900) — Eating out, Netflix, hobbies\n• 💰 **20% Savings** ($600) — Emergency fund, investments\n\nThis is called the **50/30/20 rule** and it's a great starting point.\n\n**Scenario:** Imagine you get a $200 bonus. Instead of spending it all, you could split it: $100 toward savings, $60 for something fun, $40 for groceries.\n\n---\n🧠 **Quick check:** If you earn $4,000/month and follow the 50/30/20 rule, how much should go to savings?`,
    followUp: `That's the spirit! 🎉 **$800 is correct!** (20% of $4,000)\n\nYou're already thinking like a budgeter. The key is: **pay yourself first** — move savings out before you spend.\n\nWant to learn about **Emergency Funds** next? They go hand-in-hand with budgeting!`,
    correctKeywords: ["800", "eight hundred"],
    praise: "Incredible! You nailed it! 🎉",
  },
  inflation: {
    teach: `**Inflation** means prices go up over time, so your money buys less.\n\n**Real-life example:**\nRemember when a movie ticket cost $8? Now it's $15. That's inflation! The ticket didn't get "better" — money just became worth less.\n\n**Simple scenario:**\nIf you hide $1,000 under your mattress for 10 years and inflation is 3%/year, that money would only buy about $740 worth of stuff. You didn't lose any bills, but their purchasing power shrank.\n\nThat's why keeping ALL your money in cash is risky — inflation slowly eats it away. 🐛\n\n---\n🧠 **Quick check:** If a coffee costs $5 today and inflation is 4% per year, roughly what will it cost next year?`,
    followUp: `Yes! 🎉 **$5.20 is right!** ($5 × 1.04 = $5.20)\n\nThis is why investing matters — you need your money to grow faster than inflation.\n\nShall we explore **Compound Interest** next? It's the antidote to inflation!`,
    correctKeywords: ["5.20", "5.2", "$5.20"],
    praise: "Spot on! 🎯",
  },
  emergency: {
    teach: `An **Emergency Fund** is money set aside for unexpected expenses — like a financial safety net.\n\n**Real-life example:**\nYour car breaks down and needs a $800 repair. Without an emergency fund, you'd have to use a credit card (and pay interest). With one, you just use your savings — no stress, no debt.\n\n**How much should you save?**\n• Start with **$1,000** as a mini emergency fund\n• Then build up to **3-6 months** of living expenses\n\n**Scenario:**\nIf your monthly expenses are $2,500, your full emergency fund goal would be $7,500–$15,000. Start small — even $50/month adds up!\n\n---\n🧠 **Quick check:** If your monthly expenses are $3,000, what's the minimum you'd want in a full emergency fund (3 months)?`,
    followUp: `🎉 **$9,000 is correct!** ($3,000 × 3 months)\n\nHaving this cushion means unexpected expenses become minor inconveniences, not financial disasters.\n\nReady to learn about **Investing** and making your money work for you?`,
    correctKeywords: ["9000", "9,000", "$9,000", "$9000"],
    praise: "You got it! 💪",
  },
  money: {
    teach: `Let's start with the basics — **What is money?**\n\nMoney is simply a tool we all agree has value. It does three things:\n\n1. 🛒 **Medium of exchange** — You trade it for goods (buy coffee)\n2. 📏 **Unit of account** — It measures value ($5 coffee vs $50 dinner)\n3. 🏦 **Store of value** — You can save it for later\n\n**Real-life example:**\nBefore money existed, people bartered. Imagine trading 3 chickens for a haircut — awkward, right? Money solved that problem.\n\n**Scenario:**\nYou work 8 hours and earn $120. That money \"stores\" your work so you can spend it whenever you want — today, tomorrow, or next month.\n\n---\n🧠 **Quick check:** What are the three main functions of money?`,
    followUp: `🎉 **Exactly right!** Money works as a medium of exchange, unit of account, and store of value.\n\nYou've got the foundation down! Want to learn about **Budgeting** next — how to actually manage your money?`,
    correctKeywords: ["exchange", "account", "store", "medium"],
    praise: "That's perfect! 🌟",
  },
  compound: {
    teach: `**Compound Interest** is when you earn interest on your interest. It's like a snowball rolling downhill — it gets bigger and bigger.\n\n**Real-life example:**\nYou invest $1,000 at 10% annual return:\n• Year 1: $1,000 → $1,100 (earned $100)\n• Year 2: $1,100 → $1,210 (earned $110!)\n• Year 3: $1,210 → $1,331 (earned $121!)\n\nNotice how you earn MORE each year? That's compounding!\n\n**Scenario:**\nIf you invest $200/month starting at age 25 at 8% return, by age 65 you'd have about **$700,000**. But if you start at 35? Only about **$300,000**. Starting 10 years earlier more than DOUBLES your money.\n\n---\n🧠 **Quick check:** If you invest $1,000 at 10% for 2 years with compound interest, how much do you have?`,
    followUp: `🎉 **$1,210 is correct!**\n\nYear 1: $1,000 + $100 = $1,100\nYear 2: $1,100 + $110 = $1,210\n\nEinstein reportedly called compound interest "the eighth wonder of the world." The earlier you start, the more powerful it becomes!\n\nWant to explore **Stocks & Mutual Funds** to see where you can earn compound returns?`,
    correctKeywords: ["1210", "1,210", "$1,210", "$1210"],
    praise: "Brilliant! 🚀",
  },
  stock: {
    teach: `A **Stock** is a tiny piece of ownership in a company. When you buy a stock, you become a part-owner!\n\n**Real-life example:**\nIf Apple has 1 million shares and you buy 1, you own 0.0001% of Apple. If Apple does well, your share becomes worth more. If it does poorly, it drops.\n\n**Mutual Funds** are like a basket of stocks. Instead of picking one company, you buy a little bit of many companies at once — instant **diversification**!\n\n**Scenario:**\nImagine you have $100. You could:\n• Buy 1 stock of Company A (risky — if it fails, you lose everything)\n• Buy a mutual fund that holds 500 companies (safer — if one fails, 499 others protect you)\n\n---\n🧠 **Quick check:** What's the main advantage of a mutual fund over buying a single stock?`,
    followUp: `🎉 **Exactly!** Diversification is the key advantage. You spread your risk across many companies so no single failure can wipe you out.\n\nAs the saying goes: "Don't put all your eggs in one basket." 🥚🧺\n\nWant to learn about **Risk Management** next?`,
    correctKeywords: ["diversif", "spread", "risk", "basket", "many companies"],
    praise: "You're a natural! 🎯",
  },
  bank: {
    teach: `**Banking Basics** — a bank is like a safe warehouse for your money that also pays you a little rent (interest) for keeping it there.\n\n**Two main account types:**\n\n1. 🏃 **Checking Account** — For daily spending. Easy access, low/no interest.\n2. 🐢 **Savings Account** — For saving. Less access, earns some interest.\n\n**Real-life example:**\nYour paycheck goes into checking. You pay rent, buy groceries from there. Each month, you move $200 to savings — that money earns ~4% interest at a high-yield savings account.\n\n**Scenario:**\nWith $5,000 in a savings account at 4% APY, you'd earn about $200/year just for keeping your money there!\n\n---\n🧠 **Quick check:** Which type of account is better for your emergency fund — checking or savings?`,
    followUp: `🎉 **Savings is correct!** Your emergency fund should be in a savings account where it earns interest but stays accessible.\n\nPro tip: Look for a **high-yield savings account** — online banks often offer 4-5% vs traditional banks' 0.01%.\n\nWhat would you like to learn about next?`,
    correctKeywords: ["saving"],
    praise: "Smart thinking! 💡",
  },
  risk: {
    teach: `**Risk Management** in finance means understanding that higher potential rewards come with higher potential losses.\n\n**Real-life example:**\nThink of it like roller coasters:\n• 🎠 **Savings account** = Kiddie ride (safe, small returns ~4%)\n• 🎢 **Stock market** = Big coaster (exciting, average ~10%/year, but bumpy)\n• 🚀 **Crypto/options** = Extreme ride (could double or lose it all)\n\n**The golden rule:** Never invest money you can't afford to lose.\n\n**Scenario:**\nYou have $10,000 to invest. A balanced approach:\n• $5,000 in index funds (moderate risk)\n• $3,000 in bonds (low risk)\n• $2,000 in individual stocks (higher risk)\n\nThis way, even if the risky part drops, your safer investments protect you.\n\n---\n🧠 **Quick check:** If an investment promises "guaranteed 50% returns with zero risk," what should you do?`,
    followUp: `🎉 **Absolutely right — run away!** If it sounds too good to be true, it probably is. No legitimate investment guarantees high returns with zero risk.\n\nThis is one of the most important rules in finance: **risk and return are always connected.**\n\nYou've covered a lot of ground! Check your **Progress** page or try the **Investment Calculator** to see compound interest in action!`,
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
        addAssistant(
          `Great question! I'd love to help with that. 🤔\n\nTo give you the best lesson, try asking about one of these topics:\n\n• **Money Basics** — What is money?\n• **Budgeting** — The 50/30/20 rule\n• **Inflation** — Why prices go up\n• **Emergency Funds** — Your financial safety net\n• **Banking** — Checking vs savings\n• **Stocks & Mutual Funds** — Intro to investing\n• **Compound Interest** — The 8th wonder of the world\n• **Risk Management** — Protecting your money\n\nJust type a topic name to start learning!`
        );
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
            "What is compound interest?",
            "Explain inflation",
            "How do stocks work?",
            "Tell me about emergency funds",
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
