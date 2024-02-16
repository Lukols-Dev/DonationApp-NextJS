"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Clock, Eye, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Payment } from "@/components/ui/table";
import DropDownWrapper from "@/components/ui/dropdown-menu";
import { formatTimestamp } from "@/lib/utils";
import TooltipWrapper from "@/components/ui/tooltip";

export const columnsWallet: ColumnDef<Payment>[] = [
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
    accessorKey: "mid",
    header: "id",
    cell: ({ row }) => (
      <TooltipWrapper description={row.getValue("mid")}>
        <div className="w-[4rem] text-nowrap overflow-hidden text-ellipsis">
          {row.getValue("mid")}
        </div>
      </TooltipWrapper>
    ),
  },
  {
    accessorKey: "description",
    header: "Treść",
    cell: ({ row }) => (
      <TooltipWrapper description={row.getValue("description")}>
        <div className="max-w-[800px] min-w-[200px] line-clamp-3 overflow-hidden text-ellipsis">
          {row.getValue("description")}
        </div>
      </TooltipWrapper>
    ),
  },
  {
    accessorKey: "create_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="max-w-[100px]">
        {formatTimestamp(row.getValue("create_at"))}
      </div>
    ),
  },
  {
    accessorKey: "nick",
    header: "Nick",
    cell: ({ row }) => <div className="">{row.getValue("nick")}</div>,
  },
  {
    accessorKey: "payment_method",
    header: "Metoda",
    cell: ({ row }) => <div className="">{row.getValue("payment_method")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PLN",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
