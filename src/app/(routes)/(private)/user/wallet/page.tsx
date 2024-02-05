import Container from "@/components/Container";
import CardStatistic from "@/components/dashboard/cards/card-statistic";
import CardLegend from "@/components/dashboard/cards/card-legend";
import CardTable from "@/components/dashboard/cards/card-table";
import CardPayMethod from "@/components/dashboard/cards/card-payMethod";

const WalletPage = () => {
  return (
    <Container>
      <section className="w-full h-full gap-4 flex flex-col">
        <div className="flex gap-4 h-[144px]">
          <CardStatistic
            title="Aktualny przychód"
            value="45,231.89"
            valueDesc="+20.1% ostatni miesiąc"
            icon="PLN"
          />
          <CardStatistic title="W tym roku" value="45,231.89" icon="PLN" />
          <CardStatistic title="Do wypłaty" value="45,231.89" icon="PLN" />
        </div>
        <div className="flex flex-col text-2xl text-[#333B69] my-2 font-semibold">
          Metody płatności
          <span className="text-sm">
            Sprawdź jakiej metody najczęściej użyto
          </span>
        </div>
        <div className="w-full flex gap-4 overflow-x-auto">
          <div className="flex gap-4">
            <CardPayMethod
              icon="/assets/blik-icon.svg"
              value={999}
              descValue={999}
            />
            <CardPayMethod
              icon="/assets/blik-icon.svg"
              value={999}
              descValue={999}
            />
            <CardPayMethod
              icon="/assets/blik-icon.svg"
              value={999}
              descValue={999}
            />
            <CardPayMethod
              icon="/assets/blik-icon.svg"
              value={999}
              descValue={999}
            />
            <CardPayMethod
              icon="/assets/blik-icon.svg"
              value={999}
              descValue={999}
            />
            <CardPayMethod
              icon="/assets/blik-icon.svg"
              value={999}
              descValue={999}
            />
            <CardPayMethod
              icon="/assets/blik-icon.svg"
              value={999}
              descValue={999}
            />
          </div>
        </div>
        <div className="w-full h-full">
          <div className="flex gap-2 text-2xl text-[#333B69] my-2 font-semibold">
            <p>Historia płatności</p>
            <button>Eksportuj tabelę</button>
          </div>
          <CardTable />
        </div>
      </section>
    </Container>
  );
};

export default WalletPage;
