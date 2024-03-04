"use client";

import CardTable from "@/components/dashboard/cards/card-table";
import { getColumnsUsers } from "./_columns/user";
import { getColumnsPayouts } from "./_columns/payout";
import { ExportBtn } from "@/components/dashboard/buttons/export-btn";

interface Props {
  data: any[];
  type: string;
}

const CustomAdminTable = ({ data, type }: Props) => {
  const columnsUsers = getColumnsUsers();
  const columnsPayouts = getColumnsPayouts();

  return (
    <div className="w-full h-full">
      <ExportBtn
        columns={type === "users" ? exportColUser : exportColPayout}
        data={data}
      />
      <CardTable
        data={data}
        columns={type === "users" ? columnsUsers : columnsPayouts}
      />
    </div>
  );
};

export default CustomAdminTable;

const exportColUser = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nick",
    header: "Nick",
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
    accessorKey: "surname",
    header: "Nazwisko",
  },
  {
    accessorKey: "account_type",
    header: "Typ konta",
  },
  {
    accessorKey: "create_at",
    header: "Data utworzenia",
  },
  {
    accessorKey: "account_status",
    header: "Status konta",
  },
];

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
