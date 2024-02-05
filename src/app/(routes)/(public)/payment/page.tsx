import Logo from "@/components/Header/Logo";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import Image from "next/image";

const PaymentPage = () => {
  const paymentDescription = true;

  return (
    <main className="w-screen min-h-screen flex flex-col relative bg-red-500">
      {/* <Image
        fill
        alt="Payment background"
        src="/assets/images/payment-bg.png"
      /> */}
      <header className="p-10 w-full flex items-center justify-center sm:justify-start">
        <Logo className="text-white" />
      </header>
      <section className="bg-red-500 w-full h-full flex items-center justify-center py-10">
        <div className="flex flex-col-reverse sm:flex-row gap-4 mx-2">
          <div className="bg-white w-full max-w-[700px] sm:w-3/4 sm:max-h-screen min-h-[700px] flex flex-col rounded-lg p-4 gap-6 overflow-y-auto">
            {paymentDescription ? (
              <div className="flex flex-col w-full">
                <p className="text-[#18181A] text-lg font-medium">Od twórcy</p>
                <p className="text-[#18181A] text-sm font-normal">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text
                </p>
              </div>
            ) : (
              <></>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <Input id="nick" className="pr-9" label="Nick" />
              <Input id="price" className="pr-9" label="Kwota" />
            </div>
            <Textarea id="message" label="Treść wiadomości" />
            <div>
              Metody Płatności
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                <li className="w-full h-[80px] border-2 rounded-md"></li>
                <li className="w-full h-[80px] border-2 rounded-md"></li>
                <li className="w-full h-[80px] border-2 rounded-md"></li>
                <li className="w-full h-[80px] border-2 rounded-md"></li>
                <li className="w-full h-[80px] border-2 rounded-md"></li>
                <li className="w-full h-[80px] border-2 rounded-md"></li>
                <li className="w-full h-[80px] border-2 rounded-md"></li>
                <li className="w-full h-[80px] border-2 rounded-md"></li>
                <li className="w-full h-[80px] border-2 rounded-md"></li>
              </ul>
            </div>
            <Input id="email" className="pr-9" label="Email" />
            <button className="w-full sm:w-[160px] py-2 ml-auto mr-0 mt-auto mb-0 flex items-center justify-center gap-4 text-white bg-[#1814F3] rounded-md relative">
              WYŚLIJ <Send className="w-6 h-6 absolute right-2" />
            </button>
          </div>
          <div className="w-full h-auto sm:w-[250px] sm:h-screen sm:min-h-[700px] flex flex-col gap-4 items-center">
            <div className="bg-white w-full h-[200px] sm:w-[250px] sm:h-[350px] rounded-lg overflow-hidden relative">
              <Image
                className="object-contain object-center"
                alt="Payment User"
                fill
                src="/assets/person.png"
              />
            </div>
            <div className="bg-white w-full h-[60px] p-4 rounded-lg flex items-center justify-center">
              <p>@jannowak</p>
            </div>
            <div className="bg-white w-full h-[60px] p-4 rounded-lg flex justify-center items-center gap-x-8">
              <a href="/">
                <Image
                  alt="Youtube"
                  width={30}
                  height={30}
                  src={"/assets/youtube-icon.svg"}
                />
              </a>
              <a href="/">
                <Image
                  alt="Twitch"
                  width={30}
                  height={30}
                  src={"/assets/twitch-icon.svg"}
                />
              </a>
              <a href="/">
                <Image
                  alt="Twitter"
                  width={30}
                  height={30}
                  src={"/assets/twitter-icon.svg"}
                />
              </a>
            </div>
            <div className="bg-white w-full h-full p-4 rounded-lg hidden sm:flex flex-col">
              <div className="relative ml-auto mr-4">
                <div className="w-4 h-4 rounded-full bg-red-500 animate-ping absolute top-0 left-0" />
                <div className="w-4 h-4 rounded-full bg-red-500 absolute top-0 left-0" />
              </div>
              <ul className="w-full h-full mt-4">
                <li className="flex flex-col m-0">
                  <p className="text-xs text-[#B1B1B1]">12.01.2024</p>
                  <p className="text-sm text-[#B1B1B1]">
                    <span className="text-bold text-black mr-2">Jan Nowak</span>
                    wysłał wiadomość
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PaymentPage;