"use client"

import { IExperienceResponse } from "@/app/interfaces"
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export const columns = (
  onEdit: (experience: IExperienceResponse) => void,
  onDelete: (experience: IExperienceResponse) => void
): ColumnDef<IExperienceResponse>[] => [
  {
    accessorKey: "position",
    header: "position",
  },
  {
    accessorKey: "companyName",
    header: "companyName",
  },
  {
    accessorKey: "countryName",
    header: "countryName",
  },
  {
    accessorKey: "fromDate",
    header: "fromDate",
  },
  {
    accessorKey: "endDate",
    header: "endDate",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const experience = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel onClick={() => onEdit(experience)}>Edit</DropdownMenuLabel>
            <DropdownMenuLabel onClick={() => onDelete(experience)}>Delete</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];