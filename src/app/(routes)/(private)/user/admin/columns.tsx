"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  ShieldAlert,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Payment } from "@/components/ui/table";
import DropDownWrapper from "@/components/ui/dropdown-menu";
import TooltipWrapper from "@/components/ui/tooltip";
import { DropDownMenuItem } from "@/types";
import { formatTimestamp } from "@/lib/utils";

export const getColumnsUsers = (uid: string): ColumnDef<Payment>[] => {
  const dropdownItems: DropDownMenuItem[] = [
    {
      title: "Zablokuj konto",
      element: (
        <div className="flex items-center gap-2 cursor-pointer">
          <ShieldAlert className="w-4 h-4" /> Zablokuj Konto
        </div>
      ),
      action: (payment: any) => {
        //   QueueService.addToQueue(uid, payment)
        //     .then(() => console.log("add to queue"))
        //     .catch((err) => console.log("problem with add to queue: ", err));
      },
    },
    {
      title: "Usuń konto",
      element: (
        <div className="flex items-center gap-2 cursor-pointer">
          <XCircle className="w-4 h-4" /> Usuń Konto
        </div>
      ),
      action: (payment: any) => {
        //   QueueService.addToQueue(uid, payment)
        //     .then(() => console.log("add to queue"))
        //     .catch((err) => console.log("problem with add to queue: ", err));
      },
    },
  ];

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
      accessorKey: "nick",
      header: "Nick",
      cell: ({ row }) => <div className="">{row.getValue("nick")}</div>,
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
      accessorKey: "account_type",
      header: "Typ konta",
      cell: ({ row }) => <div className="">{row.getValue("account_type")}</div>,
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
      accessorKey: "account_status",
      header: "Status konta",
      cell: ({ row }) => {
        const statuses: string[] = row.getValue("account_status");
        if (!statuses) return <></>;
        return (
          <div className="flex gap-1 items-center">
            {statuses &&
              statuses.map((status, index) => {
                switch (status) {
                  case "block":
                    return <ShieldAlert key={index} className="w-4 h-4" />;
                  default:
                    return null;
                }
              })}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;

        const itemsWithActions = dropdownItems.map((item) => ({
          ...item,
          action: () => item.action(payment),
        }));

        return (
          <DropDownWrapper items={itemsWithActions} row={payment}>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropDownWrapper>
        );
      },
    },
  ];
};
