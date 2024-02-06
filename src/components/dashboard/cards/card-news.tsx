import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        {items ? (
          <div>
            <NotebookPen className="w-6 h-6" />
            Aktualnie nie mamy nowych informacji
          </div>
        ) : (
          <ul className="w-full h-full max-h-[480px] flex flex-col overflow-auto">
            <li className="flex flex-col mt-4 gap-4">
              <p className="flex gap-2 items-center">
                <Calendar className="w-6 h-6" /> 01.01.2024
              </p>
              <p className="line-clamp-3 overflow-hidden text-ellipsis">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text
              </p>
            </li>
            <li className="flex flex-col mt-4 gap-4">
              <p className="flex gap-2 items-center">
                <Calendar className="w-6 h-6" /> 01.01.2024
              </p>
              <p className="line-clamp-3 overflow-hidden text-ellipsis">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text
              </p>
            </li>
            <li className="flex flex-col mt-4 gap-4">
              <p className="flex gap-2 items-center">
                <Calendar className="w-6 h-6" /> 01.01.2024
              </p>
              <p className="line-clamp-3 overflow-hidden text-ellipsis">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text
              </p>
            </li>
            <li className="flex flex-col mt-4 gap-4">
              <p className="flex gap-2 items-center">
                <Calendar className="w-6 h-6" /> 01.01.2024
              </p>
              <p className="line-clamp-3 overflow-hidden text-ellipsis">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text
              </p>
            </li>
            <li className="flex flex-col mt-4 gap-4">
              <p className="flex gap-2 items-center">
                <Calendar className="w-6 h-6" /> 01.01.2024
              </p>
              <p className="line-clamp-3 overflow-hidden text-ellipsis">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text
              </p>
            </li>
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default CardNews;
