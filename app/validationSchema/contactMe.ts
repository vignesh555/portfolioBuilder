import { z } from "zod"

export const contactMeSchema = z.object({
    name: z.string().nonempty("This is Required"),
    emailId: z.string().email().nonempty("This is Required"),
    subject: z.string().nonempty("This is Required"),
    content: z.string().nonempty("This is Required"),
})

export type ContactMeSchemaConvertedType = z.infer<typeof contactMeSchema>