import { Link, Navigate } from "react-router-dom";
import {
  Zap,
  Target,
  Calendar,
  ArrowRight,
  Sparkles,
  Clock,
  Dumbbell,
  Brain,
  HeartPulse,
  Trophy,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Reveal } from "../components/ui/Reveal";
import { useAuth } from "../context/useAuth";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Plans",
    description:
      "Get a training program tailored to your goals, experience, and schedule — generated in seconds.",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description:
      "Whether you want to build muscle, lose fat, or get stronger — we optimize every set for your goal.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description:
      "Plans that fit your lifestyle. Train 2 days or 6 — we adapt the split to your week.",
  },
  {
    icon: Clock,
    title: "Time-Efficient",
    description:
      "Every workout is designed to maximize results within the minutes you actually have.",
  },
];

const steps = [
  {
    icon: Brain,
    title: "Share your goals",
    description:
      "Tell us your experience level, available equipment, schedule, and any injuries.",
  },
  {
    icon: Zap,
    title: "AI builds your plan",
    description:
      "Our model designs a structured weekly split with sets, reps, rest, and RPE.",
  },
  {
    icon: Dumbbell,
    title: "Train with confidence",
    description:
      "Follow a clear daily schedule with progression guidance and exercise alternatives.",
  },
];

export default function Home() {
  const { user, isLoading } = useAuth();

  if (!isLoading && user) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ---------------- Hero ---------------- */}
      <section className="relative pt-36 pb-24 px-6">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] bg-accent/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border mb-8 animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-pulse-ring" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">
              AI-powered training plans in seconds
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            Your Perfect Gym Plan in Seconds
          </h1>

          <p
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            Stop guessing. Get a personalized training program built by AI,
            tailored to your goals, experience, and schedule.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <Link to="/auth/sign-up">
              <Button size="lg" className="gap-2 group shadow-glow">
                Get Started Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/auth/sign-in">
              <Button variant="secondary" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why GymAI?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine fitness expertise with AI to create programs that
              actually work for you.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 90}>
                <Card
                  variant="bordered"
                  className="group h-full hover:border-accent/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" />
        <div className="relative max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              How it works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-2">
              From questions to gains in 3 steps
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 120}>
                <Card variant="bordered" className="h-full relative">
                  <span className="absolute -top-3 -left-3 w-9 h-9 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center text-sm shadow-glow">
                    {i + 1}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="py-24 px-6">
        <Reveal className="max-w-4xl mx-auto">
          <Card
            variant="bordered"
            className="relative overflow-hidden text-center py-16 px-8 border-accent/40"
          >
            <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <Trophy className="w-10 h-10 text-accent mx-auto mb-5" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Your next PR starts with a plan
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                Answer a few questions and get a structured training program
                you can actually follow — free.
              </p>
              <Link to="/auth/sign-up" className="inline-block">
                <Button size="lg" className="gap-2 group shadow-glow">
                  Build my plan
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </Card>
        </Reveal>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="px-6 py-10 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-accent" />
            <span className="font-semibold text-foreground">GymAI</span>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 text-accent" />
            Built for lifters who train with intent.
          </p>
        </div>
      </footer>
    </div>
  );
}
