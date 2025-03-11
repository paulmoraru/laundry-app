import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepsProps {
  currentStep: number;
  className?: string;
  children: React.ReactNode;
}

export function Steps({ currentStep, className, children }: StepsProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={cn("flex items-center", className)}>
      {childrenArray.map((child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<StepProps>, {
            step: index + 1,
            currentStep,
            isLastStep: index === childrenArray.length - 1,
          });
        }
        return child;
      })}
    </div>
  );
}

interface StepProps {
  step: number;
  title: string;
  currentStep?: number;
  isLastStep?: boolean;
}

export function Step({
  step,
  title,
  currentStep = 1,
  isLastStep = false,
}: StepProps) {
  const isCompleted = currentStep > step;
  const isActive = currentStep === step;

  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
            isCompleted
              ? "border-primary bg-primary text-primary-foreground"
              : isActive
              ? "border-primary text-primary"
              : "border-muted-foreground/30 text-muted-foreground"
          )}
        >
          {isCompleted ? <Check className="h-5 w-5" /> : <span>{step}</span>}
        </div>
        <span
          className={cn(
            "mt-2 text-sm font-medium",
            isCompleted
              ? "text-primary"
              : isActive
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          {title}
        </span>
      </div>

      {!isLastStep && (
        <div
          className={cn(
            "h-[2px] w-full flex-1 transition-colors",
            isCompleted ? "bg-primary" : "bg-muted-foreground/30"
          )}
        />
      )}
    </>
  );
}
