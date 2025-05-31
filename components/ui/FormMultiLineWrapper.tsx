import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "./form"
import Editor from 'react-simple-wysiwyg';

type typeFormMultiLineWrapper<T extends FieldValues> = {
    form: UseFormReturn<T>;
    fieldName: Path<T>;
}

function FormMultiLineWrapper<T extends FieldValues>({ form, fieldName }: typeFormMultiLineWrapper<T>) {
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Editor
                              className="bg-white min-h-[200px]"
                              value={field.value}
                              onChange={(e) => form.setValue(fieldName, e?.target?.value as PathValue<T, Path<T>>)} />
                    </FormControl>
                    {form.formState.errors[fieldName] ? (
                        <FormMessage />
                    ) : (
                        <div className="text-sm text-muted-foreground min-h-[20px]">&nbsp;</div>
                    )}
                </FormItem>
            )}
        />
    )
}

export default FormMultiLineWrapper;
