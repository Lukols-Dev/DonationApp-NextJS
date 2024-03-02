"use client";

import CardTable from "@/components/dashboard/cards/card-table";
import { getColumnsUsers } from "./columns";

interface Props {
  data: any[];
}

const CustomAdminTable = ({ data }: Props) => {
  const columns = getColumnsUsers();

  return (
    <div className="w-full h-full">
      <CardTable data={data} columns={columns} />
    </div>
  );
};

export default CustomAdminTable;
