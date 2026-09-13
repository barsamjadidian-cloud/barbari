import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-full font-medium tracking-wide uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
      primary: "bg-espresso-900 text-cream-50 hover:bg-espresso-800 shadow-soft hover:shadow-medium hover:-translate-y-[1px] active:translate-y-0",
      secondary: "bg-cream-100 text-espresso-900 border border-espresso-200 hover:bg-cream-200",
      gold: "bg-gold-400 text-espresso-900 hover:bg-gold-500 shadow-gold hover:shadow-medium font-semibold",
      ghost: "bg-transparent hover:bg-espresso-50 text-espresso-700",
      outline: "bg-transparent border border-espresso-900 text-espresso-900 hover:bg-espresso-900 hover:text-cream-50",
    };
    const sizes = {
      sm: "h-9 px-5 text-[12px]",
      md: "h-11 px-7 text-[13px]",
      lg: "h-14 px-10 text-[14px]",
      icon: "h-10 w-10 p-0 rounded-full",
    };
    return <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />;
  }
);
Button.displayName = "Button";
