import { Card, CardContent } from "@/components/ui/card";
import { TableData } from "@/components/ui/table";

interface Props {
  data?: any[];
  columns: any;
}

const CardTable = ({ data, columns }: Props) => {
  return (
    <Card>
      <CardContent>
        <TableData data={data || []} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default CardTable;
