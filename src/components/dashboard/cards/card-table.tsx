import { Card, CardContent } from "@/components/ui/card";
import { TableData } from "@/components/ui/table";

interface Props {
  data?: any[];
  columns: any;
  displayHeader?: boolean;
  displayFooter?: boolean;
}

const CardTable = ({ data, columns, displayHeader, displayFooter }: Props) => {
  return (
    <Card>
      <CardContent>
        <TableData
          data={data || []}
          columns={columns}
          displayHeader={displayHeader}
          displayFooter={displayFooter}
        />
      </CardContent>
    </Card>
  );
};

export default CardTable;
