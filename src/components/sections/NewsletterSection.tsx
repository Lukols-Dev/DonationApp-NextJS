"use client";

import Image from "next/image";
import Container from "../Container";
import Input from "../inputs/Input";
import { FormEvent, useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState<string>("");

  const saveNewsletter = async () => {
    try {
      const send = await fetch("/api/sendEmail", {
        method: "POST",
        body: JSON.stringify({
          data: {
            from: "Acme <onboarding@resend.dev>",
            to: email,
            subject: "Newsletter",
            text: "Thank you for subscribing to our newsletter.",
            // react: EmailTemplate({ link: "customLink" }) as React.ReactElement,
          },
        }),
      });

      if (send.ok) {
        setEmail("");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    const { value }: any = e.target;

    setEmail(value);
  };

  return (
    <section>
      <Container>
        <div className="relative w-full h-full  md:h-[800px] flex">
          <div className="w-[630px] min-h-[330px] flex flex-col items-center gap-6 p-4 m-auto text-black">
            <form className="w-full p-4 flex flex-col gap-4 items-center shadow-xl rounded-md bg-white text-center">
              <h2 className="text-4xl font-medium">
                Subscribe To Our Newsletter
              </h2>
              <p className="text-base font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque
                duis ultrices sollicitudin.
              </p>
              <Input
                id="email"
                type="email"
                value={email}
                label="E-mail"
                onChange={(e: FormEvent<HTMLInputElement>) => handleInput(e)}
              />
            </form>
            <button
              className="px-3 py-2 bg-black rounded-md text-white font-light"
              onClick={saveNewsletter}
            >
              Subscribe now
            </button>
          </div>
          <div className="relative hidden left-12 top-5 z-10 -ml-12 md:flex md:left-5">
            <Image
              src="/assets/person2.png"
              alt="Great Photo"
              className="h-full w-full object-cover object-center"
              priority
              width={500}
              height={500}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NewsletterSection;
