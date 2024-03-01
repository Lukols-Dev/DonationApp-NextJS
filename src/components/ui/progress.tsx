import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

interface Props
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  maxValue?: number;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  Props
>(({ className, value, maxValue = 100, ...props }, ref) => {
  let percentage = maxValue > 0 ? ((value || 0) / maxValue) * 100 : 0;
  percentage = Math.min(percentage, 100); // Ograniczenie do 100%

  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={value}
      max={maxValue}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-green-500 transition-all"
        style={{ width: `${percentage}%` }}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-white">
        {`${value}/${maxValue} PLN (${percentage.toFixed(0)}%)`}
      </div>
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = "Progress";

export { Progress };
