export interface User {
  id: string;
  level: number;
  xp: number;
  attributes: {
    strength: number;
    intelligence: number;
    spiritual: number;
    charisma: number;
    core: number;
  };
  avatar: {
    hair: string;
    clothes: string;
    accessory: string;
  };
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  status: "captured" | "clarified" | "organized" | "completed";
  category?: string;
}