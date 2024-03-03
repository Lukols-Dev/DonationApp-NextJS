"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Payment } from "@/components/ui/table";
import DropDownWrapper from "@/components/ui/dropdown-menu";
import TooltipWrapper from "@/components/ui/tooltip";
import { DropDownMenuItem } from "@/types";
import { formatTimestamp } from "@/lib/utils";
import { AdminUsersService } from "@/lib/firebase/firebase-admin-actions";
import { useRouter } from "next/navigation";

export const getColumnsUsers = (): ColumnDef<Payment>[] => {
  const route = useRouter();
  const generateDropdownItems = (user: any): DropDownMenuItem[] => {
    let accountStatusAction: DropDownMenuItem;
    let deleteAccount: DropDownMenuItem;

    if (user.account_status.includes("block")) {
      accountStatusAction = {
        title: "Odblokuj konto",
        element: (
          <div className="flex items-center gap-2 cursor-pointer">
            <ShieldAlert className="w-4 h-4" /> Odblokuj Konto
          </div>
        ),
        action: () => {
          AdminUsersService.updateUserData(
            "AfaKosCBYUxTnUzrRBz26cvAFfBH7j",
            user.id,
            { account_status: ["active"] }
          )
            .then(() => {
              console.log("User unblocked");
              route.refresh();
            })
            .catch((err) => console.log("Problem with unblocked: ", err));
        },
      };
    } else {
      accountStatusAction = {
        title: "Zablokuj konto",
        element: (
          <div className="flex items-center gap-2 cursor-pointer">
            <ShieldAlert className="w-4 h-4" /> Zablokuj Konto
          </div>
        ),
        action: () => {
          AdminUsersService.updateUserData(
            "AfaKosCBYUxTnUzrRBz26cvAFfBH7j",
            user.id,
            { account_status: ["block"] }
          )
            .then(() => {
              console.log("User blocked");
              route.refresh();
            })
            .catch((err) => console.log("Problem with blocked: ", err));
        },
      };
    }

    deleteAccount = {
      title: "Usuń konto",
      element: (
        <div className="flex items-center gap-2 cursor-pointer">
          <XCircle className="w-4 h-4" /> Usuń Konto
        </div>
      ),
      action: () => {
        AdminUsersService.deleteUser("AfaKosCBYUxTnUzrRBz26cvAFfBH7j", user.id)
          .then(() => {
            console.log("delete user");
            route.refresh();
          })
          .catch((err) => console.log("problem with delete user: ", err));
      },
    };

    return [accountStatusAction, deleteAccount];
  };

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
                    return (
                      <span className="flex gap-2 items-center bg-yellow-600 rounded-md text-white px-2 py-1">
                        <ShieldAlert key={index} className="w-4 h-4" />
                        blocked
                      </span>
                    );
                  case "active":
                    return (
                      <span
                        key={index}
                        className="flex gap-2 items-center  bg-green-600 rounded-md text-white px-2 py-1"
                      >
                        <ShieldCheck key={index} className="w-4 h-4" />
                        active
                      </span>
                    );
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
        const user = row.original;

        const itemsWithActions = generateDropdownItems(user);

        return (
          <DropDownWrapper items={itemsWithActions} row={user}>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropDownWrapper>
        );
      },
    },
  ];
};
