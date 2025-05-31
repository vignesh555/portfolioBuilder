"use client"

import { IProjectResponse } from "@/app/interfaces"
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export const getColumns = ({ onEdit, onDelete }: { onEdit: (exp: IProjectResponse) => void; onDelete: (exp: IProjectResponse) => void; }): ColumnDef<IProjectResponse>[] => {
  return [
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "objective",
    header: "objective",
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "skills",
    header: "skills",
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
}