"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ContactMeSchemaConvertedType } from "@/app/validationSchema/contactMe"

export const columns: ColumnDef<ContactMeSchemaConvertedType>[] = [
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "emailId",
    header: "emailId",
  },
  {
    accessorKey: "subject",
    header: "subject",
  },
  {
    accessorKey: "content",
    header: "content",
  }
]