import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { TrainingPlan, UserProfile } from "../types";
import { authClient } from "../lib/auth";
import { api } from "../lib/api";
import { AuthContext, type AuthUser } from "./authContext";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [neonUser, setNeonUser] = useState<AuthUser | null>(null);
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isRefreshingRef = useRef(false);

  const refreshData = useCallback(async (activeUser: AuthUser | null) => {
    if (!activeUser || isRefreshingRef.current) return;

    isRefreshingRef.current = true;

    try {
      const planData = await api.getCurrentPlan(activeUser.id).catch(() => null);
      if (planData) {
        setPlan({
          id: planData.id,
          userId: planData.userId,
          overview: planData.planJson.overview,
          weeklySchedule: planData.planJson.weeklySchedule,
          progression: planData.planJson.progression,
          version: planData.version,
          createdAt: planData.createdAt,
        });
      } else {
        setPlan(null);
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      isRefreshingRef.current = false;
    }
  }, []);

  useEffect(() => {
    async function loadUser() {
      try {
        const result = await authClient.getSession();
        if (result && result.data?.user) {
          const rawUser = result.data.user as unknown as {
            id: string;
            email?: string | null;
            name?: string | null;
            avatarUrl?: string | null;
          };
          const sessionUser: AuthUser = {
            id: rawUser.id,
            email: rawUser.email ?? null,
            name: rawUser.name ?? null,
            avatarUrl: rawUser.avatarUrl ?? null,
          };
          setNeonUser(sessionUser);
          await refreshData(sessionUser);
        } else {
          setNeonUser(null);
          setPlan(null);
        }
      } catch (error) {
        console.error("Error loading session:", error);
        setNeonUser(null);
        setPlan(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, [refreshData]);

  async function saveProfile(
    profileData: Omit<UserProfile, "userId" | "updatedAt">,
  ) {
    if (!neonUser) {
      throw new Error("User must be authenticated to save profile");
    }

    await api.saveProfile(neonUser.id, profileData);
    await refreshData(neonUser);
  }

  async function generatePlan() {
    if (!neonUser) {
      throw new Error("User must be authenticated to generate plan");
    }

    await api.generatePlan(neonUser.id);
    await refreshData(neonUser);
  }

  async function signOut() {
    await authClient.signOut();
    setNeonUser(null);
    setPlan(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user: neonUser,
        plan,
        isLoading,
        saveProfile,
        generatePlan,
        signOut,
        refreshData: async () => await refreshData(neonUser),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}