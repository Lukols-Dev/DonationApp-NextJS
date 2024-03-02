"use client";

import CardTable from "@/components/dashboard/cards/card-table";
import { getColumnsUsers } from "./columns";

interface Props {
  data: any[];
  uid: string;
}

const CustomAdminTable = ({ data, uid }: Props) => {
  const columns = getColumnsUsers(uid);

  return (
    <div className="w-full h-full">
      <CardTable data={data} columns={columns} />
    </div>
  );
};

export default CustomAdminTable;
