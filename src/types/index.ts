import type { User as SupabaseUser } from "@supabase/supabase-js";

export interface AppUser extends SupabaseUser {
  id: string;
  email?: string;
}

export interface Profile {
  id: string;
  username: string;
  avatar_url?: string;
  level: number;
  xp: number;
  xp_to_next_level: number;
  created_at: string;
  attributes: Attributes;
  stats: Stats;
}

export interface Attributes {
  strength: number;
  intelligence: number;
  wisdom: number;
  dexterity: number;
  charisma: number;
}

export interface Stats {
  tasks_completed: number;
  quests_completed: number;
  days_streak: number;
  achievements_earned: number;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status: "inbox" | "actionable" | "waiting" | "delegated" | "someday" | "completed" | "archived";
  difficulty: "easy" | "medium" | "hard" | "insane";
  category?: string;
  due_date?: string;
  completed_at?: string;
  created_at: string;
  xp_reward: number;
  tags?: string[];
}

export interface Quest {
  id: string;
  user_id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard" | "insane";
  tasks: string[];
  progress: number;
  total: number;
  due_date?: string;
  completed_at?: string;
  created_at: string;
  xp_reward: number;
  status: "active" | "completed" | "failed";
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlocked_at?: string;
  progress?: number;
  target?: number;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: "achievement" | "level_up" | "task_completed" | "quest_completed" | "reminder";
  read: boolean;
  created_at: string;
}

export interface SupabaseError {
  code: string;
  details: string | null;
  hint: string | null;
  message: string;
}