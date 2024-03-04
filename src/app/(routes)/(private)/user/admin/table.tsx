"use client";

import CardTable from "@/components/dashboard/cards/card-table";
import { getColumnsUsers } from "./_columns/user";
import { getColumnsPayouts } from "./_columns/payout";

interface Props {
  data: any[];
  type: string;
}

const CustomAdminTable = ({ data, type }: Props) => {
  const columnsUsers = getColumnsUsers();
  const columnsPayouts = getColumnsPayouts();

  return (
    <div className="w-full h-full">
      <CardTable
        data={data}
        columns={type === "users" ? columnsUsers : columnsPayouts}
      />
    </div>
  );
};

export default CustomAdminTable;
