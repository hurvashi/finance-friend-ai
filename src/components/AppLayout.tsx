import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageCircle,
  BookOpen,
  Trophy,
  BarChart3,
  Calculator,
  Flame,
  Star,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: MessageCircle, label: "AI Tutor", path: "/tutor" },
  { icon: BookOpen, label: "Lessons", path: "/lessons" },
  { icon: Trophy, label: "Quizzes", path: "/quiz" },
  { icon: BarChart3, label: "Progress", path: "/progress" },
  { icon: Calculator, label: "Calculator", path: "/calculator" },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-sidebar-border bg-sidebar p-4 gap-1 overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-4 mb-4">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
            <Star className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground tracking-tight">Finance Mentor</span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-3 py-3 rounded-xl bg-muted">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-1">
            <Flame className="h-4 w-4 text-warning" />
            3 Day Streak
          </div>
          <p className="text-xs text-muted-foreground">Keep learning daily!</p>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border">
        <nav className="flex justify-around py-2">
          {navItems.slice(0, 5).map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
