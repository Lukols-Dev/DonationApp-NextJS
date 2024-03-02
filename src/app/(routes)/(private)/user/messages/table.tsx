"use client";

import CardTable from "@/components/dashboard/cards/card-table";
import { getColumnsMessage } from "@/components/dashboard/columns/columns-message";

interface Props {
  messages: any;
  uid: string;
}

const CustomTable = ({ messages, uid }: Props) => {
  const columns = getColumnsMessage(uid);

  return (
    <div className="w-full h-full">
      <CardTable data={messages.messages} columns={columns} />
    </div>
  );
};

export default CustomTable;
