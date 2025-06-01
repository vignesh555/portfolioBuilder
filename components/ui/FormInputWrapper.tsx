import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "./form"
import { Input } from "./input"

type FormInputWrapperProps<T extends FieldValues> = {
    fieldName: Path<T>;
    control: Control<T>;
    errors: FieldErrors<T>[keyof T] | undefined;
    maxLength?: number;
}

function FormInputWrapper<T extends FieldValues>({ fieldName, control, errors, maxLength }: FormInputWrapperProps<T>) {
    return (
        <FormField
            control={control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input 
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

export default FormInputWrapper;
