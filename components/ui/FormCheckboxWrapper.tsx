"use client"
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { Checkbox } from "./checkbox";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"

type typeFormCheckboxWrapper<T extends FieldValues> = {
    form: UseFormReturn<T>;
    fieldName: Path<T>;
    label: string;
}

function FormCheckboxWrapper<T extends FieldValues>({
    form,
    label,
    fieldName
}: typeFormCheckboxWrapper<T>) {
    console.log(form.getValues(), "FormCheckboxWrapper Rendered");
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => {
                return (
                    <FormItem
                        className="flex flex-row items-center gap-2"
                    >
                        <FormControl>
                            <Checkbox
                                className=" bg-white"
                                checked={field.value}
                                onCheckedChange={(checked: boolean) => {
                                    form?.setValue(fieldName, checked as PathValue<T, Path<T>>);
                                }}
                            />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                            {label}
                        </FormLabel>
                    </FormItem>
                )
            }}
        />
    )
}

export default FormCheckboxWrapper;
