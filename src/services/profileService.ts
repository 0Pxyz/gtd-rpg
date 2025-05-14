import { supabase } from "./supabase";
import type { Profile, SupabaseError } from "../types";

export const fetchOrCreateProfile = async (userId: string, email: string): Promise<Profile> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    if ((error as SupabaseError).code === "PGRST116") {
      // Profile doesn't exist, create one
      const defaultProfile: Profile = {
        id: userId,
        username: email.split("@")[0] || "Unknown Hero", // Use email prefix as username
        avatar_url: undefined,
        level: 1,
        xp: 0,
        xp_to_next_level: 100,
        created_at: new Date().toISOString(),
        attributes: {
          strength: 100,
          intelligence: 100,
          wisdom: 100,
          dexterity: 100,
          charisma: 100,
        },
        stats: {
          tasks_completed: 0,
          quests_completed: 0,
          days_streak: 0,
          achievements_earned: 0,
        },
      };

      const { data: newProfile, error: insertError } = await supabase
        .from("profiles")
        .insert(defaultProfile)
        .select()
        .single();

      if (insertError) {
        throw new Error("Failed to create profile.");
      }
      return newProfile;
    }
    throw new Error("Failed to fetch profile.");
  }
  return data;
};