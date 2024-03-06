"use client";

import CardTable from "@/components/dashboard/cards/card-table";
import { getColumnsPayoutsPerUser } from "./payout";
import { ExportBtn } from "@/components/dashboard/buttons/export-btn";

interface Props {
  data: any[];
  type?: string;
  title?: string;
}

const CustomWalletTable = ({ data, type, title }: Props) => {
  const columnsPayouts = getColumnsPayoutsPerUser();

  return (
    <div className="w-full h-full">
      <div className="flex gap-4 items-center">
        {title}
        <ExportBtn columns={exportColPayout} data={data} />
      </div>
      <CardTable data={data} columns={columnsPayouts} />
    </div>
  );
};

export default CustomWalletTable;

const exportColPayout = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "amount",
    header: "Kwota Wypłaty",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Imię",
  },
  {
    accessorKey: "surname",
    header: "Nazwisko",
  },
  {
    accessorKey: "bank",
    header: "Bank",
  },
  {
    accessorKey: "create_at",
    header: "Data",
  },
  {
    accessorKey: "methods",
    header: "Metody",
  },
  {
    accessorKey: "addres",
    header: "Adres",
  },
  {
    accessorKey: "city",
    header: "Miasto",
  },
  {
    accessorKey: "country",
    header: "Kraj",
  },
];
