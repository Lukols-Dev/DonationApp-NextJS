"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PaymentService } from "@/lib/firebase/firebase-actions";
import { getStripeOAuthLink } from "@/lib/stripe/stripe-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

interface Props {
  uid: string;
  userData: { uid: string; account_type: string };
}

const ConnectStripeButton = ({ uid, userData }: Props) => {
  const router = useRouter();
  //   const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  const onClick = async () => {
    if (!userData) return;

    setLoading(true);
    try {
      const stripeOAuthLink = await getStripeOAuthLink(userData);
      //   toast({
      //     variant: "default",
      //     title: "Sukces",
      //     description: `Link do strony z płatnościami został utworzony.`,
      //   });
      if (!stripeOAuthLink) return;
      router.push(stripeOAuthLink);
    } catch (err) {
      setLoading(false);
      console.log("Error generate payment link: ", err);
      //   toast({
      //     variant: "destructive",
      //     title: "Error",
      //     description:
      //       "Wystąpił błąd podczas generowania linku. Spróbuj jeszcze raz lub skontaktuj się z Tipey.",
      //   });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="border-2 border-[#1814F3] text-[#1814F3] bg-transparent rounded-md px-4 py-2"
      onClick={onClick}
    >
      {!loading ? (
        <>Utwórz portfel dla płatności</>
      ) : (
        <PulseLoader size={10} color="#1814F3" />
      )}
    </Button>
  );
};

export default ConnectStripeButton;
