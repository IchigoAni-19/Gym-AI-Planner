import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "primary", size = "md", children, ...props },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-300 ease-out";

    const variants = {
      primary:
        "bg-accent text-accent-foreground hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 shadow-md hover:shadow-lg active:translate-y-0",
      secondary:
        "bg-transparent text-foreground border border-border hover:border-accent hover:text-accent hover:bg-accent/10 hover:-translate-y-0.5",
      ghost:
        "bg-transparent text-foreground hover:text-accent hover:bg-accent/10",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-8 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
