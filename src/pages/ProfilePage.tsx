import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useProgress } from "@/hooks/useProgress";
import { lessons } from "@/data/financeData";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Mail,
  Calendar,
  BookOpen,
  Target,
  Flame,
  Trophy,
  Award,
  Shield,
  Pencil,
  X,
  Check,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Profile {
  display_name: string | null;
  avatar_url: string | null;
  preferred_difficulty: string;
  daily_reminder: boolean;
  favorite_topics: string[];
  created_at: string;
}

const TOPIC_OPTIONS = [
  "Budgeting",
  "Investing",
  "Credit & Debt",
  "Taxes",
  "Retirement",
  "Insurance",
];

export default function ProfilePage() {
  const { user } = useAuth();
  const { completedLessons, quizScores, xp } = useProgress();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    display_name: "",
    avatar_url: "",
    preferred_difficulty: "beginner",
    daily_reminder: false,
    favorite_topics: [] as string[],
  });

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        setProfile(data);
        setEditForm({
          display_name: data.display_name ?? "",
          avatar_url: data.avatar_url ?? "",
          preferred_difficulty: data.preferred_difficulty,
          daily_reminder: data.daily_reminder,
          favorite_topics: data.favorite_topics ?? [],
        });
      }
    };
    fetch();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: editForm.display_name || null,
        avatar_url: editForm.avatar_url || null,
        preferred_difficulty: editForm.preferred_difficulty,
        daily_reminder: editForm.daily_reminder,
        favorite_topics: editForm.favorite_topics,
      })
      .eq("user_id", user.id);

    if (error) {
      toast({ title: "Error saving", description: error.message, variant: "destructive" });
    } else {
      setProfile((p) => (p ? { ...p, ...editForm } : p));
      setEditing(false);
      toast({ title: "Profile updated!" });
    }
    setSaving(false);
  };

  const toggleTopic = (topic: string) => {
    setEditForm((f) => ({
      ...f,
      favorite_topics: f.favorite_topics.includes(topic)
        ? f.favorite_topics.filter((t) => t !== topic)
        : [...f.favorite_topics, topic],
    }));
  };

  // Computed stats
  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const quizzesTaken = Object.keys(quizScores).length;
  const quizAccuracy =
    quizzesTaken > 0
      ? Math.round(
          (Object.values(quizScores).reduce((a, b) => a + b, 0) / quizzesTaken) * 100
        )
      : 0;

  const modules = Array.from(new Set(lessons.map((l) => l.module)));
  const completedModules = modules.filter((mod) => {
    const modLessons = lessons.filter((l) => l.module === mod);
    return modLessons.every((l) => completedLessons.includes(l.id));
  });
  const currentModule =
    modules.find((mod) => {
      const modLessons = lessons.filter((l) => l.module === mod);
      return modLessons.some((l) => !completedLessons.includes(l.id));
    }) ?? "All complete!";

  const streak = 3; // Static for now

  // Achievements
  const achievements = [
    {
      icon: BookOpen,
      title: "Beginner Investor",
      description: "Complete first module",
      unlocked: completedModules.length >= 1,
    },
    {
      icon: Target,
      title: "Quiz Master",
      description: "Score above 80% on a quiz",
      unlocked: Object.values(quizScores).some((s) => s >= 0.8),
    },
    {
      icon: Flame,
      title: "Consistency Badge",
      description: "7 day learning streak",
      unlocked: streak >= 7,
    },
  ];

  const joinedDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage your account & preferences</p>
        </div>
        {!editing ? (
          <Button variant="outline" size="sm" onClick={() => setEditing(true)} className="w-full sm:w-auto">
            <Pencil className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="ghost" size="sm" onClick={() => setEditing(false)} className="flex-1 sm:flex-initial">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving} className="flex-1 sm:flex-initial">
              <Check className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        )}
      </div>

      {/* User Info Card */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
              {(editing ? editForm.avatar_url : profile?.avatar_url) ? (
                <img
                  src={editing ? editForm.avatar_url : profile?.avatar_url ?? ""}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-9 w-9 text-muted-foreground" />
              )}
            </div>
            {editing && (
              <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                <Camera className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1 space-y-1">
            {editing ? (
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Name</Label>
                  <Input
                    value={editForm.display_name}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, display_name: e.target.value }))
                    }
                    placeholder="Your name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Avatar URL</Label>
                  <Input
                    value={editForm.avatar_url}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, avatar_url: e.target.value }))
                    }
                    placeholder="https://..."
                    className="mt-1"
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-foreground">
                  {profile?.display_name ?? "Finance Learner"}
                </h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    {user?.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Joined {joinedDate}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="bg-card rounded-2xl p-6 border border-border space-y-5">
        <h3 className="text-lg font-semibold text-foreground">Learning Progress</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {completedCount}/{totalLessons}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Lessons Completed</p>
          </div>
          <div className="text-center">
            {/* Circular quiz accuracy */}
            <div className="relative mx-auto h-16 w-16">
              <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  className="stroke-muted"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  className="stroke-primary"
                  strokeWidth="3"
                  strokeDasharray={`${quizAccuracy}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">
                {quizAccuracy}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Quiz Accuracy</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground leading-tight mt-2">
              {currentModule}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Current Module</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{completedModules.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Topics Mastered</p>
          </div>
        </div>
        <Progress value={(completedCount / totalLessons) * 100} className="h-2" />
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl p-5 border border-border text-center">
          <Trophy className="h-6 w-6 text-accent mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{quizzesTaken}</p>
          <p className="text-xs text-muted-foreground">Quizzes Taken</p>
        </div>
        <div className="bg-card rounded-2xl p-5 border border-border text-center">
          <BookOpen className="h-6 w-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{xp}</p>
          <p className="text-xs text-muted-foreground">Total XP</p>
        </div>
        <div className="bg-card rounded-2xl p-5 border border-border text-center">
          <Flame className="h-6 w-6 text-warning mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{streak}</p>
          <p className="text-xs text-muted-foreground">Day Streak</p>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((a) => (
            <div
              key={a.title}
              className={`rounded-xl p-4 border text-center transition-colors ${
                a.unlocked
                  ? "bg-primary/5 border-primary/20"
                  : "bg-muted/50 border-border opacity-60"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                  a.unlocked ? "bg-primary/10" : "bg-muted"
                }`}
              >
                <a.icon
                  className={`h-6 w-6 ${
                    a.unlocked ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </div>
              <p className="font-semibold text-sm text-foreground">{a.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
              {a.unlocked && (
                <Badge className="mt-2 bg-primary/10 text-primary border-0 text-xs">
                  Unlocked
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Learning Preferences */}
      <div className="bg-card rounded-2xl p-6 border border-border space-y-5">
        <h3 className="text-lg font-semibold text-foreground">Learning Preferences</h3>

        {/* Difficulty */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Preferred Difficulty</Label>
          {editing ? (
            <div className="flex gap-2">
              {["beginner", "intermediate"].map((level) => (
                <button
                  key={level}
                  onClick={() =>
                    setEditForm((f) => ({ ...f, preferred_difficulty: level }))
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                    editForm.preferred_difficulty === level
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm font-medium text-foreground capitalize">
              {profile?.preferred_difficulty ?? "beginner"}
            </p>
          )}
        </div>

        {/* Daily Reminder */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm text-foreground">Daily Lesson Reminder</Label>
            <p className="text-xs text-muted-foreground">Get notified to study each day</p>
          </div>
          {editing ? (
            <Switch
              checked={editForm.daily_reminder}
              onCheckedChange={(v) =>
                setEditForm((f) => ({ ...f, daily_reminder: v }))
              }
            />
          ) : (
            <Badge variant={profile?.daily_reminder ? "default" : "secondary"}>
              {profile?.daily_reminder ? "On" : "Off"}
            </Badge>
          )}
        </div>

        {/* Favorite Topics */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Favorite Finance Topics</Label>
          <div className="flex flex-wrap gap-2">
            {TOPIC_OPTIONS.map((topic) => {
              const selected = editing
                ? editForm.favorite_topics.includes(topic)
                : (profile?.favorite_topics ?? []).includes(topic);
              return (
                <button
                  key={topic}
                  disabled={!editing}
                  onClick={() => editing && toggleTopic(topic)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selected
                      ? "bg-primary text-primary-foreground"
                      : editing
                      ? "bg-muted text-muted-foreground hover:bg-muted/80 cursor-pointer"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
