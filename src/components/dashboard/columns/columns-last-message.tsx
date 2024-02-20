"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "@/components/ui/table";
import { formatTimestamp } from "@/lib/utils";

export const columnsLastMessage: ColumnDef<Payment>[] = [
  {
    accessorKey: "payment_method_icon",
    cell: ({ row }) => (
      <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-[#E7EDFF] text-[#718EBF]">
        {mapPaymentMethodName(row.getValue("payment_method"))}
      </div>
    ),
  },
  {
    accessorKey: "nick",
    cell: ({ row }) => <div className="">{row.getValue("nick")}</div>,
  },
  {
    accessorKey: "create_at",
    cell: ({ row }) => (
      <div className="max-w-[100px]">
        {formatTimestamp(row.getValue("create_at"))}
      </div>
    ),
  },
  {
    accessorKey: "payment_method",
    cell: ({ row }) => <div className="">{row.getValue("payment_method")}</div>,
  },
  {
    accessorKey: "payment_status",
    cell: ({ row }) => <div className="">{row.getValue("payment_status")}</div>,
  },
  {
    accessorKey: "amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PLN",
      }).format(amount);

      return (
        <div className="text-right text-green-500 font-medium">{formatted}</div>
      );
    },
  },
];

const mapPaymentMethodName = (name: string): string => {
  switch (name.toLowerCase()) {
    case "blik":
      return "B";
    case "paypal":
      return "PP";
    case "p24":
      return "P";
    case "card":
      return "C";
    default:
      return name;
  }
};
