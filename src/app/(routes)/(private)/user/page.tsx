import Container from "@/components/Container";
import CardStatistic from "@/components/dashboard/cards/card-statistic";
import CardImage from "@/components/dashboard/cards/card-image";
import { MessageCircleMore } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CardNews from "@/components/dashboard/cards/card-news";
import Avatar from "@/components/ui/avatar";
import InputCopy from "@/components/ui/input-copy";

const UserPage = () => {
  return (
    <Container>
      <section className="w-full h-full grid grid-rows-6 grid-flow-col gap-4">
        <div className="flex row-span-1 space-x-4">
          <CardStatistic
            title="Aktualny przychód"
            value="45,231.89"
            valueDesc="+20.1% ostatni miesiąc"
            icon="PLN"
          />
          <CardImage />
        </div>
        <div className="w-full h-full row-span-3">
          <CardStatistic title="Aktualny przychód" />
        </div>
        <div className="w-full h-full row-span-2">
          <CardStatistic title="Aktualny przychód" />
        </div>
        <div className="w-full h-full row-span-2">
          <Card>
            <CardContent className="h-full">
              <div className="w-full h-full flex flex-col items-center justify-between">
                <div className="h-24 w-24">
                  <Avatar fill />
                </div>
                <p className="text-2xl text-[#343C6A]">Jan Nowak</p>
                <InputCopy />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full h-full row-span-4">
          <CardNews title="Aktualności Tipey" />
        </div>
      </section>
    </Container>
  );
};

export default UserPage;
