import { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Button } from "../components/ui/Button";
import {
  Calendar,
  CheckCircle2,
  Dumbbell,
  Loader2,
  RefreshCcw,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { PlanDisplay } from "../components/plan/PlanDisplay";

const REGEN_STEPS = [
  "Analyzing your profile goals & previous schedule...",
  "Consulting AI model to optimize weekly split...",
  "Recalculating exercise volume, sets, reps & RPE...",
  "Finalizing schedule & progressive overload targets...",
];

export default function Profile() {
  const { user, isLoading, plan, generatePlan } = useAuth();
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const stepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  if (!user && !isLoading) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  if (!plan) {
    return <Navigate to="/onboarding" replace />;
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function handleRegenerate() {
    if (isRegenerating) return;
    setIsRegenerating(true);
    setCurrentStepIndex(0);
    setErrorNotice(null);
    setSuccessNotice(null);

    const nextVersion = plan ? plan.version + 1 : 2;

    // Cycle through engagement steps every 900ms
    stepTimerRef.current = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < REGEN_STEPS.length - 1 ? prev + 1 : prev));
    }, 900);

    const startTime = Date.now();

    try {
      await generatePlan();

      // Ensure single-digit seconds (approx 3.6s) so the user experiences the AI generation process
      const elapsed = Date.now() - startTime;
      if (elapsed < 3600) {
        await new Promise((resolve) => setTimeout(resolve, 3600 - elapsed));
      }

      setSuccessNotice(`Your plan has been successfully regenerated to Version ${nextVersion}!`);
      setTimeout(() => {
        setSuccessNotice(null);
      }, 7000);
    } catch (err) {
      setErrorNotice(err instanceof Error ? err.message : "Failed to regenerate plan. Please try again.");
    } finally {
      if (stepTimerRef.current) {
        clearInterval(stepTimerRef.current);
        stepTimerRef.current = null;
      }
      setIsRegenerating(false);
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Your Training Plan</h1>
            <p className="text-muted-foreground">
              Version {plan.version} • Created {formatDate(plan.createdAt)}
            </p>
          </div>

          <Button
            variant="secondary"
            className="gap-2 shrink-0 shadow-sm"
            disabled={isRegenerating}
            onClick={handleRegenerate}
          >
            {isRegenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-accent" />
                <span>Regenerating (V{plan.version + 1})...</span>
              </>
            ) : (
              <>
                <RefreshCcw className="w-4 h-4" />
                <span>Regenerate Plan</span>
              </>
            )}
          </Button>
        </div>

        {/* Success Feedback Notification */}
        {successNotice && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-between gap-3 animate-fade-up">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              <p className="text-sm font-medium">{successNotice}</p>
            </div>
            <button
              type="button"
              onClick={() => setSuccessNotice(null)}
              className="text-emerald-400/70 hover:text-emerald-300 p-1"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Error Feedback Notification */}
        {errorNotice && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-between gap-3 animate-fade-up">
            <p className="text-sm font-medium">{errorNotice}</p>
            <button
              type="button"
              onClick={() => setErrorNotice(null)}
              className="text-red-400/70 hover:text-red-300 p-1"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* AI Regeneration Processing Banner */}
        {isRegenerating && (
          <Card
            variant="bordered"
            className="mb-8 p-6 relative overflow-hidden border-accent/40 bg-accent/5 animate-fade-up"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-foreground flex items-center gap-2">
                    AI Generating Version {plan.version + 1}
                    <Loader2 className="w-4 h-4 animate-spin text-accent" />
                  </h3>
                  <p className="text-xs text-accent font-medium mt-0.5">
                    {REGEN_STEPS[currentStepIndex]}
                  </p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground px-2.5 py-1 rounded-full bg-card border border-border">
                Step {currentStepIndex + 1} of {REGEN_STEPS.length}
              </span>
            </div>

            {/* Live Progress Bar */}
            <div className="w-full bg-card h-2 rounded-full overflow-hidden border border-border">
              <div
                className="bg-accent h-full transition-all duration-700 ease-out"
                style={{
                  width: `${((currentStepIndex + 1) / REGEN_STEPS.length) * 100}%`,
                }}
              />
            </div>
          </Card>
        )}

        {/* Overview Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Target className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Goal</p>
              <p className="font-medium text-sm">{plan.overview.goal}</p>
            </div>
          </Card>
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Frequency</p>
              <p className="font-medium text-sm">{plan.overview.frequency}</p>
            </div>
          </Card>
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Split</p>
              <p className="font-medium text-sm">{plan.overview.split}</p>
            </div>
          </Card>
          <Card
            variant="bordered"
            className={`flex items-center gap-3 transition-all duration-300 ${
              isRegenerating ? "ring-2 ring-accent/50 bg-accent/5" : ""
            }`}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Version</p>
              <p className="font-medium text-sm">
                {isRegenerating ? `V${plan.version} → V${plan.version + 1}` : plan.version}
              </p>
            </div>
          </Card>
        </div>

        {/* Plan notes */}
        <Card variant="bordered" className="mb-8">
          <h2 className="font-semibold text-lg mb-2">Program Notes</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {plan.overview.notes}
          </p>
        </Card>

        {/* Weekly Schedule */}
        <h2 className="font-semibold text-xl mb-4">Weekly Schedule</h2>
        <PlanDisplay weeklySchedule={plan.weeklySchedule} />

        {/* Progression Strategy */}
        <Card variant="bordered" className="mb-8 mt-8">
          <h2 className="font-semibold text-lg mb-2">Progression Strategy</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {plan.progression}
          </p>
        </Card>
      </div>
    </div>
  );
}
