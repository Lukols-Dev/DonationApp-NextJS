import getCurrentUser from "@/lib/auth-actions";
import MailTo from "./ui/mail-to";

export const BlockAccInfo = async () => {
  const currentUser: { account_status: string[] } = await getCurrentUser();

  if (currentUser.account_status[0] !== "block") return <></>;
  return (
    <div className="z-[20] fixed top-0 left-0 w-screen h-screen bg-red-200/80 flex">
      <div className="m-auto flex">
        Twoje konto zostało zablokowane. Skontaktój się z Tipey po więcej
        informacji.
        <MailTo subject="Zablokowane konto">
          <span className="p-2 border-2">Kontakt</span>
        </MailTo>
      </div>
    </div>
  );
};
