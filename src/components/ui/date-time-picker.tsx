"use client";

import { CalendarIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  DateValue,
  useButton,
  useDatePicker,
  useInteractOutside,
} from "react-aria";
import { DatePickerStateOptions, useDatePickerState } from "react-stately";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { DateField } from "./date-field";
import { TimeField } from "./time-field";
import { useForwardedRef } from "@/hooks/useForwardedRef";
import { Calendar } from "./calendar";

interface DateTimePickerProps extends DatePickerStateOptions<DateValue> {
  value?: DateValue;
  onValueChange?: (newValue: DateValue) => void;
  hasTime?: boolean;
}

const DateTimePicker = React.forwardRef<HTMLDivElement, DateTimePickerProps>(
  (props, forwardedRef) => {
    const { value, onValueChange, hasTime, ...otherProps } = props;
    const ref = useForwardedRef(forwardedRef);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const [open, setOpen] = useState(false);

    const state = useDatePickerState({
      ...otherProps,
      value: value,
    });

    const {
      groupProps,
      fieldProps,
      buttonProps: _buttonProps,
      dialogProps,
      calendarProps,
    } = useDatePicker(otherProps, state, ref);

    const { buttonProps } = useButton(_buttonProps, buttonRef);

    useInteractOutside({
      ref: contentRef,
      onInteractOutside: (e) => {
        // Sprawdzenie, czy event.target jest instancją Node
        if (buttonRef.current && e.target instanceof Node) {
          if (!buttonRef.current.contains(e.target)) {
            setOpen(false);
          }
        }
      },
    });

    return (
      <div
        {...groupProps}
        ref={ref}
        className={cn(
          groupProps.className,
          "flex items-center rounded-md ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 z-[100]"
        )}
      >
        <DateField {...fieldProps} />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              {...buttonProps}
              variant="outline"
              className="rounded-l-none"
              disabled={props.isDisabled}
              onClick={() => setOpen(!open)}
            >
              <CalendarIcon className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent ref={contentRef} className="w-full">
            <div {...dialogProps} className="space-y-3">
              <Calendar {...calendarProps} />
              {!!hasTime && (
                <TimeField
                  value={state.timeValue}
                  onChange={state.setTimeValue}
                />
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker };
