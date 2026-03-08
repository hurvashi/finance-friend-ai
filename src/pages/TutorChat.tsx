import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi! I'm your Finance Mentor AI 🎓\n\nI can help you understand any finance topic — from budgeting basics to investment strategies. What would you like to learn about today?",
};

const SAMPLE_RESPONSES: Record<string, string> = {
  budget:
    "Great question! A **budget** is a plan for your money. The popular 50/30/20 rule suggests:\n\n• **50%** for needs (rent, food, utilities)\n• **30%** for wants (entertainment, dining)\n• **20%** for savings & debt repayment\n\nWould you like me to help you create a budget?",
  invest:
    "**Investing** means putting your money to work so it grows over time. Here are the basics:\n\n1. **Stocks** — Ownership in companies\n2. **Bonds** — Loans to governments/companies\n3. **Index Funds** — Diversified baskets of stocks\n\nThe key principle: **start early**, even with small amounts. Compound interest is incredibly powerful!",
  save: "Here are proven strategies to **save more money**:\n\n1. **Automate savings** — Set up automatic transfers on payday\n2. **Track expenses** — You can't manage what you don't measure\n3. **Emergency fund** — Aim for 3-6 months of expenses\n4. **50/30/20 rule** — Allocate 20% minimum to savings\n\nWhich one would you like to explore further?",
  default:
    "That's a great finance question! Here's what I'd recommend:\n\n1. Start by understanding the basics of that topic\n2. Look at how it affects your personal finances\n3. Create an action plan\n\nWould you like me to break this down further? You can also check the **Lessons** section for structured learning!",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("budget")) return SAMPLE_RESPONSES.budget;
  if (lower.includes("invest") || lower.includes("stock")) return SAMPLE_RESPONSES.invest;
  if (lower.includes("save") || lower.includes("saving")) return SAMPLE_RESPONSES.save;
  return SAMPLE_RESPONSES.default;
}

export default function TutorChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: getResponse(userMsg.content) }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-2rem)] animate-slide-up">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-foreground">AI Finance Tutor</h1>
        <p className="text-sm text-muted-foreground">Ask anything about personal finance</p>
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

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {["How do I start budgeting?", "Explain investing for beginners", "Tips to save more money"].map((q) => (
            <button
              key={q}
              onClick={() => { setInput(q); }}
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
          placeholder="Ask a finance question..."
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
