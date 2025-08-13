import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormFieldIndicatorProps {
  isCompleted: boolean;
  className?: string;
}

export const FormFieldIndicator = ({ isCompleted, className }: FormFieldIndicatorProps) => {
  return (
    <div className={cn(
      "flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-300",
      isCompleted 
        ? "bg-success border-success text-success-foreground scale-100" 
        : "border-muted scale-75 opacity-60",
      className
    )}>
      <Check className={cn(
        "h-3 w-3 transition-all duration-200",
        isCompleted ? "opacity-100 scale-100" : "opacity-0 scale-50"
      )} />
    </div>
  );
};