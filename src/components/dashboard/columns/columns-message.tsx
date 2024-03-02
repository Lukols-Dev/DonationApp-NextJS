"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Clock, Eye, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Payment } from "@/components/ui/table";
import DropDownWrapper from "@/components/ui/dropdown-menu";
import { formatTimestamp } from "@/lib/utils";
import TooltipWrapper from "@/components/ui/tooltip";
import { DropDownMenuItem } from "@/types";
import { QueueService } from "@/lib/firebase/firebase-actions";

export const getColumnsMessage = (uid: string): ColumnDef<Payment>[] => {
  const dropdownItems: DropDownMenuItem[] = [
    {
      title: "Wyświetl ponownie",
      element: (
        <div className="flex items-center gap-2 cursor-pointer">
          <Eye className="w-4 h-4" /> Wyświetl ponownie
        </div>
      ),
      action: (payment: any) => {
        QueueService.addToQueue(uid, payment)
          .then(() => console.log("add to queue"))
          .catch((err) => console.log("problem with add to queue: ", err));
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
      header: "Data",
      cell: ({ row }) => (
        <div className="max-w-[100px]">
          {formatTimestamp(row.getValue("create_at"))}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const statuses: string[] = row.getValue("status");

        return (
          <div className="flex gap-1 items-center">
            {statuses.map((status, index) => {
              switch (status) {
                case "displayed":
                  return <Eye key={index} className="w-4 h-4" />;
                case "queue":
                  return <Clock key={index} className="w-4 h-4" />;
                default:
                  return null;
              }
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));

        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "PLN",
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
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

// const columnsMessage: ColumnDef<Payment>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "mid",
//     header: "id",
//     cell: ({ row }) => (
//       <TooltipWrapper description={row.getValue("mid")}>
//         <div className="w-[4rem] text-nowrap overflow-hidden text-ellipsis">
//           {row.getValue("mid")}
//         </div>
//       </TooltipWrapper>
//     ),
//   },
//   {
//     accessorKey: "description",
//     header: "Treść",
//     cell: ({ row }) => (
//       <TooltipWrapper description={row.getValue("description")}>
//         <div className="max-w-[800px] min-w-[200px] line-clamp-3 overflow-hidden text-ellipsis">
//           {row.getValue("description")}
//         </div>
//       </TooltipWrapper>
//     ),
//   },
//   {
//     accessorKey: "create_at",
//     header: "Data",
//     cell: ({ row }) => (
//       <div className="max-w-[100px]">
//         {formatTimestamp(row.getValue("create_at"))}
//       </div>
//     ),
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => {
//       const statuses: string[] = row.getValue("status");

//       return (
//         <div className="flex gap-1 items-center">
//           {statuses.map((status, index) => {
//             switch (status) {
//               case "displayed":
//                 return <Eye key={index} className="w-4 h-4" />;
//               case "queue":
//                 return <Clock key={index} className="w-4 h-4" />;
//               default:
//                 return null;
//             }
//           })}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "amount",
//     header: () => <div className="text-right">Amount</div>,
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("amount"));

//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "PLN",
//       }).format(amount);

//       return <div className="text-right font-medium">{formatted}</div>;
//     },
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original;
//       console.log("row: ", row);

//       const itemsWithActions = dropdownItems.map((item) => ({
//         ...item,
//         action: () => item.action(payment),
//       }));

//       return (
//         <DropDownWrapper items={itemsWithActions} row={payment}>
//           <Button variant="ghost" className="h-8 w-8 p-0">
//             <MoreHorizontal className="h-4 w-4" />
//           </Button>
//         </DropDownWrapper>
//       );
//     },
//   },
// ];

// const dropdownItems: DropDownMenuItem[] = [
//   {
//     title: "Wyświetl ponownie",
//     element: (
//       <div className="flex items-center gap-2 cursor-pointer">
//         <Eye className="w-4 h-4" /> Wyświetl ponownie
//       </div>
//     ),
//   },
// ];
