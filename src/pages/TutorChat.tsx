import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hey there! 👋 I'm your personal **Finance Mentor**, powered by AI.\n\nI'll teach you finance step by step — no confusing jargon, just simple explanations with real-life examples.\n\nAfter each concept, I'll ask you a quick question to make sure it clicks. Ready?\n\nPick a topic to start, or just ask me anything!\n\n• Money Basics\n• Budgeting\n• Inflation\n• Emergency Funds\n• Investing (Stocks, Mutual Funds)\n• Compound Interest",
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/finance-tutor`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (err: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok) {
    if (resp.status === 429) {
      onError("Rate limit reached — please wait a moment and try again.");
      return;
    }
    if (resp.status === 402) {
      onError("AI credits exhausted. Please add credits to continue.");
      return;
    }
    onError("Something went wrong. Please try again.");
    return;
  }

  if (!resp.body) {
    onError("No response received.");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);

      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") {
        streamDone = true;
        break;
      }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }

  // Flush remaining buffer
  if (textBuffer.trim()) {
    for (let raw of textBuffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }

  onDone();
}

export default function TutorChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const send = async () => {
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user" && prev[prev.length - 2]?.content === text) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      // Send only user/assistant messages (skip initial greeting for cleaner context)
      const chatHistory = newMessages.slice(1).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      await streamChat({
        messages: chatHistory,
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => setIsLoading(false),
        onError: (err) => {
          toast.error(err);
          setIsLoading(false);
        },
      });
    } catch (e) {
      console.error(e);
      toast.error("Failed to get response. Please try again.");
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-2rem)] animate-slide-up">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Finance Tutor</h1>
          <p className="text-sm text-muted-foreground">Powered by AI — ask anything about personal finance!</p>
        </div>
        <button
          onClick={resetChat}
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          title="New conversation"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
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
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:mb-2 [&>ul]:mb-2 [&>ol]:mb-2">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <span className="whitespace-pre-wrap">{msg.content}</span>
              )}
            </div>
            {msg.role === "user" && (
              <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <User className="h-4 w-4 text-accent" />
              </div>
            )}
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
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
          placeholder="Ask about any finance topic..."
          disabled={isLoading}
          className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
        />
        <button
          onClick={send}
          disabled={isLoading || !input.trim()}
          className="rounded-xl bg-primary text-primary-foreground px-4 py-3 hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
