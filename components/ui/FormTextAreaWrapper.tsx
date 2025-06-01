import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "./form"
import { Input } from "./input"
import { Textarea } from "./textarea";

type FormTextAreaWrapperProps<T extends FieldValues> = {
    fieldName: Path<T>;
    control: Control<T>;
    errors: FieldErrors<T>[keyof T] | undefined;
    maxLength?: number;
}

function FormTextAreaWrapper<T extends FieldValues>({ fieldName, control, errors, maxLength }: FormTextAreaWrapperProps<T>) {
    return (
        <FormField
            control={control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Textarea 
                            className="bg-white" 
                            placeholder={`Enter ${fieldName}`} {...field} 
                            maxLength={maxLength}
                        />
                    </FormControl>
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

export default FormTextAreaWrapper;
