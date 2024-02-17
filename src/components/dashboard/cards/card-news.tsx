import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTimestamp } from "@/lib/utils";
import { News } from "@/types";
import { Calendar, NotebookPen } from "lucide-react";

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
          <ul className="w-full h-full max-h-[480px] flex flex-col overflow-auto">
            {items.map((item: News) => (
              <li key={item.title} className="flex flex-col mt-4 gap-4">
                <p className="flex gap-2 items-center">
                  <Calendar className="w-6 h-6" />
                  {formatTimestamp(item.create_at)}
                </p>
                <p className="line-clamp-2 overflow-hidden text-ellipsis font-semibold">
                  {item.title}
                </p>
                <p className="line-clamp-3 overflow-hidden text-ellipsis">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default CardNews;
