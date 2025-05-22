"use client"
import Header from "./Header";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import LayoutWrapper from "./LayoutWrapper";

const formSchema = z.object({
    name: z.string().nonempty("This is Required"),
    email: z.string().email().nonempty("This is Required"),
    subject: z.string().nonempty("This is Required"),
    content: z.string().nonempty("This is Required"),
})

function ContactMe() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            content: "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    return (
        <LayoutWrapper id="contact">
            <Header title="Contact Me" />
            <div className="w-full flex justify-between items-center md:justify-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="bg-white" placeholder="Enter Your Name" {...field} />
                                    </FormControl>
                                    {form.formState.errors.name ? (
                                        <FormMessage />
                                    ) : (
                                        <div className="text-sm text-muted-foreground min-h-[20px]">&nbsp;</div>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="bg-white" placeholder="Enter Your Email Id" {...field} />
                                    </FormControl>
                                    {form.formState.errors.email ? (
                                        <FormMessage />
                                    ) : (
                                        <div className="text-sm text-muted-foreground min-h-[20px]">&nbsp;</div>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="bg-white" placeholder="Enter the Subject" {...field} />
                                    </FormControl>
                                    {form.formState.errors.subject ? (
                                        <FormMessage />
                                    ) : (
                                        <div className="text-sm text-muted-foreground min-h-[20px]">&nbsp;</div>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea className="bg-white" placeholder="Enter the Content" {...field} />
                                    </FormControl>
                                    {form.formState.errors.content ? (
                                        <FormMessage />
                                    ) : (
                                        <div className="text-sm text-muted-foreground min-h-[20px]">&nbsp;</div>
                                    )}
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </LayoutWrapper>
    )
}

export default ContactMe;