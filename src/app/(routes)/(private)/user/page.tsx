import CardImage from "@/components/dashboard/cards/card-image";
import CardNews from "@/components/dashboard/cards/card-news";
import CardStatistic from "@/components/dashboard/cards/card-statistic";
import Avatar from "@/components/ui/avatar";
import { Overview } from "@/components/ui/barchart";
import { Card, CardContent } from "@/components/ui/card";
import InputCopy from "@/components/ui/input-copy";
import { PaymentService } from "@/lib/firebase/firebase-actions";

const UserPage = async () => {
  const url = await PaymentService.getCheckout();

  return (
    <section className="flex flex-col w-full items-center justify-center px-4">
      <div className="w-full flex flex-col  item-center justify-center gap-4 lg:flex-row">
        <div className="max-w-[900px] w-full h-full flex flex-col gap-4 lg:w-2/3">
          <div className="w-full h-full overflow-x-auto">
            <div className="flex gap-4 w-full h-[140px]">
              <CardStatistic
                title="Aktualny przychód"
                value="45,231.89"
                valueDesc="+20.1% ostatni miesiąc"
                icon="PLN"
              />
              <CardImage />
            </div>
          </div>
          <div className="flex w-full h-[330px] bg-white p-6 border rounded-lg shadow-sm">
            <Overview />
          </div>
          <div>
            <p className="my-4 text-[#333B69] font-semibold">Ostatnie Wpłaty</p>
            <div className="flex w-full h-[330px] bg-white p-6 border rounded-lg shadow-sm">
              <ul className="w-full">
                <li className="w-full flex justify-between items-center text-[#718EBF]">
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-[#E7EDFF] text-[#718EBF]">
                    B
                  </div>
                  <p>Jan Nowak</p>
                  <p>21.01.2024</p>
                  <p>Blik</p>
                  <p>Completed</p>
                  <p className="text-green-500">
                    + 3 <span className="text-xs">PLN</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[350px] h-full flex flex-col gap-4">
          <div className="hidden lg:flex w-full h-[300px]">
            <Card>
              <CardContent className="h-full">
                <div className="w-full h-full flex flex-col items-center justify-between">
                  <div className="h-24 w-24">
                    <Avatar fill />
                  </div>
                  <p className="text-2xl text-[#343C6A]">Jan Nowak</p>
                  <InputCopy
                    value={`${process.env.NEXT_PUBLIC_URL}/payment/${url}`}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex w-full h-full">
            <CardNews title="Aktualności Tipey" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPage;
