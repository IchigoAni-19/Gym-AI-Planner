import { createContext } from "react";
import type { TrainingPlan, UserProfile } from "../types";

export interface AuthUser {
  id: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  plan: TrainingPlan | null;
  isLoading: boolean;
  saveProfile: (
    profile: Omit<UserProfile, "userId" | "updatedAt">,
  ) => Promise<void>;
  generatePlan: () => Promise<void>;
  refreshData: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);