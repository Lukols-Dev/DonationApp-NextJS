import CardStatistic from "@/components/dashboard/cards/card-statistic";
import CardImage from "@/components/dashboard/cards/card-image";
import { Card, CardContent } from "@/components/ui/card";
import CardNews from "@/components/dashboard/cards/card-news";
import Avatar from "@/components/ui/avatar";
import InputCopy from "@/components/ui/input-copy";

const UserPage = () => {
  return (
    <section className="pb-20">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-5 gap-4">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 flex gap-4 overflow-x-auto">
            <div className="h-[140px] w-1/2 min-w-[300px] md:h-auto">
              <CardStatistic
                title="Aktualny przychód"
                value="45,231.89"
                valueDesc="+20.1% ostatni miesiąc"
                icon="PLN"
              />
            </div>
            <div className="h-[140px] w-1/2 min-w-[300px] md:h-auto ">
              <CardImage />
            </div>
          </div>
          <div className="hidden lg:flex row-span-1 lg:row-span-2">
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
          <div className="hidden row-span-2 col-start-3 row-start-2 md:flex lg:row-span-3  lg:row-start-3">
            <CardNews title="Aktualności 1" />
          </div>
          <div className="col-span-2 row-span-2 col-start-1 row-start-2">
            <CardNews title="Aktualności 2" />
          </div>
          <div className="col-span-3 lg:col-span-2 row-span-2 row-start-4 md:row-start-4">
            <CardNews title="Aktualności 3" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPage;
