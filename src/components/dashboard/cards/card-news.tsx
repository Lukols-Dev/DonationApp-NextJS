import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { News } from "@/types";
import { NotebookPen } from "lucide-react";

interface Props {
  title?: string;
  items?: News[];
}

const CardNews = ({ title, items }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-[#343C6A]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {!items ? (
          <div>
            <NotebookPen className="w-6 h-6" />
            Aktualnie nie mamy nowych informacji
          </div>
        ) : (
          <div>dane</div>
        )}
      </CardContent>
    </Card>
  );
};

export default CardNews;
