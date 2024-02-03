import { cn } from "@/lib/utils";
import Container from "../Container";
import { generalSans } from "@/fonts";
import MailTo from "../ui/mail-to";

const font = generalSans.medium.className;

const ContactSection = () => {
  return (
    <section className="pb-20">
      <Container>
        <p className="text-[70px]">Porozmawiaj z nami</p>
        <MailTo>
          <p
            className={cn(
              font,
              "w-[300px] flex items-center relative justify-center text-[#18181A] text-base px-8 py-4 rounded-full border border-[#18181A] cursor-pointer"
            )}
          >
            kontakt@tipey.pl
          </p>
        </MailTo>
      </Container>
    </section>
  );
};

export default ContactSection;
