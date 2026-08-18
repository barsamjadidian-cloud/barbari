import { cn } from "@/lib/utils";
export function Badge({ children, variant="default", className }: { children: React.ReactNode; variant?: "default"|"gold"|"sale"|"new"; className?: string }) {
  const styles = {
    default: "bg-espresso-100 text-espresso-800",
    gold: "bg-gold-400 text-espresso-900",
    sale: "bg-red-500 text-white",
    new: "bg-sage-500 text-white",
  };
  return <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase", styles[variant], className)}>{children}</span>;
}
