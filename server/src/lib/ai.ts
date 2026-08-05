import OpenAI from "openai";
import dotenv from "dotenv";
import { TrainingPlan, UserProfile } from "../../types";

dotenv.config();

type ProfileInput = Partial<UserProfile>;

interface AiExercise {
  name?: string;
  sets?: number;
  reps?: string;
  rest?: string;
  rpe?: number;
  notes?: string;
  alternatives?: string[];
}

interface AiDaySchedule {
  day?: string;
  focus?: string;
  exercises?: AiExercise[];
}

interface AiPlanResponse {
  overview?: {
    goal?: string;
    frequency?: string;
    split?: string;
    notes?: string;
  };
  weeklySchedule?: AiDaySchedule[];
  progression?: string;
}

export async function generateTrainingPlan(
  profile: ProfileInput,
): Promise<Omit<TrainingPlan, "id" | "userId" | "version" | "createdAt">> {
  // Normalize profile data
  const normalizedProfile: UserProfile = {
    goal: profile.goal || "bulk",
    experience: profile.experience || "intermediate",
    days_per_week: profile.days_per_week || 4,
    session_length: profile.session_length || 60,
    equipment: profile.equipment || "full_gym",
    injuries: profile.injuries || null,
    preferred_split: profile.preferred_split || "upper_lower",
  };

  const apiKey = process.env.OPEN_ROUTER_KEY;

  if (!apiKey) {
    console.warn("OPEN_ROUTER_KEY is not set; using fallback training plan");
    return createFallbackPlan(normalizedProfile);
  }

  const openai = new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": process.env.BASE_URL || "http://localhost:3001",
      "X-Title": "GymAI Plan Generator",
    },
  });

  // Build the prompt
  const prompt = buildPrompt(normalizedProfile);

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert fitness trainer and program designer. You must respond with valid JSON only. Do not include any markdown, reasoning, or additional text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;

    if (!content) {
      console.error(
        "[AI] No content in response:",
        JSON.stringify(completion, null, 2),
      );
      throw new Error("No content in AI response");
    }

    const planData = JSON.parse(content) as AiPlanResponse;

    return formatPlanResponse(planData, normalizedProfile);
  } catch (error) {
    console.error("[AI] Error generating training plan:", error);
    return createFallbackPlan(normalizedProfile);
  }
}

function formatPlanResponse(
  aiResponse: AiPlanResponse,
  profile: UserProfile,
): Omit<TrainingPlan, "id" | "userId" | "version" | "createdAt"> {
  const plan: Omit<TrainingPlan, "id" | "userId" | "version" | "createdAt"> = {
    overview: {
      goal: aiResponse.overview?.goal || `Customized ${profile.goal} program`,
      frequency:
        aiResponse.overview?.frequency ||
        `${profile.days_per_week} days per week`,
      split: aiResponse.overview?.split || profile.preferred_split,
      notes:
        aiResponse.overview?.notes ||
        "Follow the program consistently for best results.",
    },
    weeklySchedule: (aiResponse.weeklySchedule || []).map((day) => ({
      day: day.day || "Day",
      focus: day.focus || "Full Body",
      exercises: (day.exercises || []).map((ex) => ({
        name: ex.name || "Exercise",
        sets: ex.sets || 3,
        reps: ex.reps || "8-12",
        rest: ex.rest || "60-90 sec",
        rpe: ex.rpe || 7,
        notes: ex.notes,
        alternatives: ex.alternatives,
      })),
    })),
    progression:
      aiResponse.progression ||
      "Increase weight by 2.5-5lbs when you can complete all sets with good form. Track your progress weekly.",
  };
  return plan;
}

function buildPrompt(profile: UserProfile): string {
  const goalMap: Record<string, string> = {
    bulk: "build muscle and gain size",
    cut: "lose fat and maintain muscle",
    recomp: "simultaneously lose fat and build muscle",
    strength: "build maximum strength",
    endurance: "improve cardiovascular endurance and stamina",
  };

  const experienceMap: Record<string, string> = {
    beginner: "beginner (0-1 years of training experience)",
    intermediate: "intermediate (1-3 years of training experience)",
    advanced: "advanced (3+ years of training experience)",
  };

  const equipmentMap: Record<string, string> = {
    full_gym: "full gym access with all equipment",
    home: "home gym with limited equipment",
    dumbbells: "only dumbbells available",
  };

  const splitMap: Record<string, string> = {
    full_body: "full body workouts",
    upper_lower: "upper/lower split",
    ppl: "push/pull/legs split",
    custom: "best split for their goals",
  };

  return `Create a personalized ${profile.days_per_week}-day per week training plan for someone with the following profile:
  
Goal: ${goalMap[profile.goal] || profile.goal}
Experience Level: ${experienceMap[profile.experience] || profile.experience}
Session Length: ${profile.session_length} minutes per session
Equipment: ${equipmentMap[profile.equipment] || profile.equipment}
Preferred Split: ${splitMap[profile.preferred_split] || profile.preferred_split}
${profile.injuries ? `Injuries/Limitations: ${profile.injuries}` : ""}

Generate a complete training plan in JSON format with this exact structure:
{
  "overview": {
    "goal": "brief description of the training goal",
    "frequency": "X days per week",
    "split": "training split name",
    "notes": "important notes about the program (2-3 sentences)"
  },
  "weeklySchedule": [
    {
      "day": "Monday",
      "focus": "muscle group or focus area",
      "exercises": [
          {
          "name": "Exercise Name",
          "sets": 4,
          "reps": "6-8",
          "rest": "2-3 min",
          "rpe": 8,
          "notes": "form cues or tips (optional)",
          "alternatives": ["Alternative 1", "Alternative 2"]
        }
      ]
    }
  ],
  "progression": "detailed progression strategy (2-3 sentences explaining how to progress)"
}

  Requirements:
  - Create exactly ${profile.days_per_week} workout days
  - Each workout should fit within ${profile.session_length} minutes
  - Include 4-6 exercises per workout
  - RPE (Rate of Perceived Exertion) should be 6-9
  - Include compound movements for beginners/intermediate, advanced can have more isolation
  - Match the preferred split type: ${profile.preferred_split}
  - ${profile.injuries ? `Avoid exercises that could aggravate: ${profile.injuries}` : ""}
  - Provide exercise alternatives where appropriate
  - Make it progressive and suitable for ${experienceMap[profile.experience] || profile.experience} level
  
  Return ONLY the JSON object (no markdown, no extra text).
  `;
}

function createFallbackPlan(
  profile: UserProfile,
): Omit<TrainingPlan, "id" | "userId" | "version" | "createdAt"> {
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const split = profile.preferred_split;
  const dayCount = Math.max(2, Math.min(6, profile.days_per_week));

  const exerciseLibrary =
    profile.equipment === "home"
      ? [
          "Goblet Squat",
          "Push-Up",
          "Dumbbell Row",
          "Romanian Deadlift",
          "Split Squat",
          "Dumbbell Press",
        ]
      : profile.equipment === "dumbbells"
        ? [
            "Dumbbell Bench Press",
            "One-Arm Row",
            "Dumbbell Squat",
            "Dumbbell RDL",
            "Overhead Press",
            "Lateral Raise",
          ]
        : [
            "Barbell Squat",
            "Bench Press",
            "Lat Pulldown",
            "Romanian Deadlift",
            "Overhead Press",
            "Cable Row",
          ];

  const weeklySchedule = Array.from({ length: dayCount }, (_, index) => {
    const dayLabel = dayNames[index] || `Day ${index + 1}`;
    const focus =
      split === "full_body"
        ? "Full Body"
        : split === "upper_lower"
          ? index % 2 === 0
            ? "Upper Body"
            : "Lower Body"
          : split === "ppl"
            ? ["Push", "Pull", "Legs"][index % 3]
            : index % 2 === 0
              ? "Strength"
              : "Hypertrophy";

    const exercises = exerciseLibrary.slice(index % 3, index % 3 + 5).map((name, exerciseIndex) => ({
      name,
      sets: exerciseIndex === 0 ? 4 : 3,
      reps: exerciseIndex === 0 ? "6-8" : "8-12",
      rest: exerciseIndex === 0 ? "2-3 min" : "60-90 sec",
      rpe: exerciseIndex === 0 ? 8 : 7,
      notes: exerciseIndex === 0 ? "Start conservatively and focus on clean technique." : undefined,
      alternatives: ["Bodyweight variation", "Machine variation"],
    }));

    return {
      day: dayLabel,
      focus,
      exercises,
    };
  });

  return {
    overview: {
      goal: `Customized ${profile.goal} program`,
      frequency: `${profile.days_per_week} days per week`,
      split: profile.preferred_split,
      notes:
        "This is a deterministic fallback plan used when the AI service is unavailable. It is intentionally simple but fully usable so the app keeps working.",
    },
    weeklySchedule,
    progression:
      "Add one rep per set each week until you hit the top of the range, then increase load by the smallest available increment and repeat.",
  };
}
