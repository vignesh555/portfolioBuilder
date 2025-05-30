/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormField, FormItem, FormMessage } from "./form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "./calendar"
import { CalendarIcon } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

import { Control, FieldErrors, FieldValues, Path  } from "react-hook-form";

type FormDateWrapperProps<T extends FieldValues> = {
  fieldName: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>[keyof T] | undefined;
};

function FormDateWrapper<T extends FieldValues>({ fieldName, control, errors }: FormDateWrapperProps<T>) {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a {fieldName}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                captionLayout="dropdown"
                fromYear={1900}          // ✅ Set starting year
                toYear={new Date().getFullYear()}
              />
            </PopoverContent>
          </Popover>
          {errors ? (
            <FormMessage />
          ) : (
            <div className="text-sm text-muted-foreground min-h-[20px]">&nbsp;</div>
          )}
        </FormItem>
      )}
    />
  )
}

export default FormDateWrapper;
