import { FormControl, FormField, FormItem, FormMessage } from "./form"
import { Input } from "./input"

const FormInputWrapper = ({ form, fieldName }) => {
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input className="bg-white" placeholder={`Enter ${fieldName}`} {...field} />
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

export default FormInputWrapper;
