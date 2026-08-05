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
  ChevronRight,
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

const stats = [
  { value: "10k+", label: "Plans generated" },
  { value: "4.9", label: "Average rating" },
  { value: "6", label: "Day splits supported" },
  { value: "60s", label: "To your first plan" },
];

const testimonials = [
  {
    quote:
      "Finally a plan that fits my 45-minute lunch window. I've added real weight to my big lifts.",
    name: "Marcus T.",
    role: "Intermediate lifter",
  },
  {
    quote:
      "The AI worked around my shoulder injury and gave smart alternatives. Game changer.",
    name: "Priya S.",
    role: "Getting back into it",
  },
  {
    quote:
      "I trained aimlessly for years. Having structure and progression made it click.",
    name: "Diego R.",
    role: "Beginner",
  },
  {
    quote:
      "Swapped my whole routine to the PPL split and I'm seeing gains I never had before.",
    name: "Aisha K.",
    role: "Advanced",
  },
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    cadence: "forever",
    features: [
      "1 AI-generated training plan",
      "Full weekly schedule with sets & reps",
      "Exercise alternatives",
      "Regenerate anytime",
    ],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Pro Athlete",
    price: "$9",
    cadence: "/month",
    features: [
      "Unlimited plan regeneration",
      "Injury-aware programming",
      "Progression tracking",
      "Priority AI model",
      "Equipment-switch variants",
    ],
    cta: "Start Pro",
    highlight: true,
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
            <span className="text-sm text-muted">
              AI-powered training plans in seconds
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            Your Perfect
            <br />
            <span className="text-gradient">Gym Plan</span> in Seconds
          </h1>

          <p
            className="text-xl text-muted max-w-2xl mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            Stop guessing. Get a personalized training program built by AI,
            tailored to your goals, experience, and schedule.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <Link to="/onboarding">
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

          {/* Floating preview card */}
          <Reveal delay={120} className="mt-16 max-w-4xl mx-auto">
            <Card
              variant="bordered"
              className="text-left p-0 overflow-hidden shadow-glow"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-secondary/40">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Dumbbell className="w-4 h-4 text-accent" />
                  <span>Monday — Upper Body</span>
                </div>
                <span className="text-xs text-muted">5 exercises</span>
              </div>
              <div className="divide-y divide-border">
                {[
                  ["Bench Press", "4 x 6-8", "RPE 8"],
                  ["Lat Pulldown", "3 x 8-12", "RPE 7"],
                  ["Overhead Press", "3 x 8-10", "RPE 7"],
                  ["Cable Row", "3 x 10-12", "RPE 7"],
                  ["Lateral Raise", "3 x 12-15", "RPE 6"],
                ].map(([name, sets, rpe], i) => (
                  <div
                    key={name}
                    className="flex items-center justify-between px-5 py-3 text-sm animate-fade-up"
                    style={{ animationDelay: `${420 + i * 90}ms` }}
                  >
                    <span className="font-medium">{name}</span>
                    <div className="flex items-center gap-6 text-muted">
                      <span className="text-accent font-medium">{sets}</span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-accent/10 text-accent">
                        {rpe}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Stats ---------------- */}
      <section className="px-6 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <Card variant="bordered" className="text-center h-full">
                <p className="text-3xl md:text-4xl font-bold text-gradient">
                  {s.value}
                </p>
                <p className="text-sm text-muted mt-1">{s.label}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why GymAI?</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
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
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted text-sm">{feature.description}</p>
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
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted text-sm">{step.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Testimonials marquee ---------------- */}
      <section className="py-20 px-6 overflow-hidden">
        <Reveal className="text-center mb-12 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Lifters are getting results
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Real structure, real progression — no more guessing what to do.
          </p>
        </Reveal>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex gap-6 animate-marquee w-max">
            {[...testimonials, ...testimonials].map((t, i) => (
              <Card
                key={i}
                variant="bordered"
                className="w-80 shrink-0 h-full"
              >
                <p className="text-sm leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center text-accent font-semibold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Pricing ---------------- */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, honest pricing
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Start free. Upgrade when you want unlimited regeneration.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 120}>
                <Card
                  variant="bordered"
                  className={`h-full flex flex-col ${
                    plan.highlight
                      ? "border-accent/60 shadow-glow relative"
                      : ""
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2 mb-5">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted text-sm">{plan.cadence}</span>
                  </div>
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <ChevronRight className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/onboarding" className="block">
                    <Button
                      variant={plan.highlight ? "primary" : "secondary"}
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your next PR starts with a plan
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto mb-8">
                Answer a few questions and get a structured training program
                you can actually follow — free.
              </p>
              <Link to="/onboarding" className="inline-block">
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
          <div className="flex items-center gap-2 text-foreground">
            <Dumbbell className="w-5 h-5 text-accent" />
            <span className="font-semibold">GymAI</span>
          </div>
          <p className="text-sm text-muted flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 text-accent" />
            Built for lifters who train with intent.
          </p>
        </div>
      </footer>
    </div>
  );
}
