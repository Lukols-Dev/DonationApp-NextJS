"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Payment } from "@/components/ui/table";
import TooltipWrapper from "@/components/ui/tooltip";
import { formatTimestamp } from "@/lib/utils";

export const getColumnsPayoutsPerUser = (): ColumnDef<Payment>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "id",
      cell: ({ row }) => (
        <TooltipWrapper description={row.getValue("id")}>
          <div className="w-[4rem] text-nowrap overflow-hidden text-ellipsis">
            {row.getValue("id")}
          </div>
        </TooltipWrapper>
      ),
    },
    {
      accessorKey: "amount",
      header: "Kwota Wypłaty",
      cell: ({ row }) => <div className="">{row.getValue("amount")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "name",
      header: "Imię",
      cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "surname",
      header: "Nazwisko",
      cell: ({ row }) => <div className="">{row.getValue("surname")}</div>,
    },
    {
      accessorKey: "bank",
      header: "Bank",
      cell: ({ row }) => <div className="">{row.getValue("bank")}</div>,
    },
    {
      accessorKey: "create_at",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data utworzenia
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">
          {formatTimestamp(row.getValue("create_at"))}
        </div>
      ),
    },
    {
      accessorKey: "methods",
      header: "Metody",
      cell: ({ row }) => {
        const methods: string[] = row.getValue("methods");
        if (!methods) return <></>;
        return (
          <div className="flex gap-1 items-center">
            {methods &&
              methods.map((method, index) => <span key={index}>{method}</span>)}
          </div>
        );
      },
    },
    {
      accessorKey: "addres",
      header: "Adres",
      cell: ({ row }) => <div className="">{row.getValue("addres")}</div>,
    },
    {
      accessorKey: "city",
      header: "Miasto",
      cell: ({ row }) => <div className="">{row.getValue("city")}</div>,
    },
    {
      accessorKey: "country",
      header: "Kraj",
      cell: ({ row }) => <div className="">{row.getValue("country")}</div>,
    },
  ];
};
