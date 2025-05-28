import { FormControl, FormField, FormItem, FormMessage } from "./form"
import Editor from 'react-simple-wysiwyg';

const FormMultiLineWrapper = ({ form, fieldName }) => {
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
                              onChange={(e) => form.setValue(fieldName, e?.target?.value)} />
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
