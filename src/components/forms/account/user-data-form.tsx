"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface Props {
  data: any;
}

type UserData = {
  nick: string;
  email: string;
  picture: string;
  socials: {
    youtube: string;
    twitch: string;
    twitter: string;
  };
};

const UserDataForm = ({ data }: Props) => {
  const [values, setValues] = useState<UserData>({
    nick: "",
    email: "",
    picture: "",
    socials: {
      youtube: "",
      twitch: "",
      twitter: "",
    },
  });

  const initUserData = () => {
    setValues(data);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof UserData | keyof UserData["socials"]
  ) => {
    if (field in values) {
      setValues({ ...values, [field]: e.target.value });
    } else {
      setValues({
        ...values,
        socials: { ...values.socials, [field]: e.target.value },
      });
    }
  };

  useEffect(() => {
    initUserData();
  }, [data]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-y-9 md:gap-x-9 text-lg">
        <div className="w-full flex flex-col gap-4">
          <p>Dane użytkownika</p>
          <Input
            label="Nick"
            value={values.nick}
            onChange={(e) => handleChange(e, "nick")}
          />
          <Input
            label="Email"
            value={values.email}
            onChange={(e) => handleChange(e, "email")}
          />
          <Input
            label="Zdjęcie konta"
            value={values.picture}
            onChange={(e) => handleChange(e, "picture")}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            Media społecznościowe
            <span className="text-sm">
              Pokaż swoją twórczość na innych mediach społecznościowych.
              <br />
              Będą to dane publiczne widoczne na stronie płatności.
            </span>
          </div>
          <Input
            label="Youtube"
            value={values.socials["youtube"]}
            onChange={(e) => handleChange(e, "youtube")}
          />
          <Input
            label="Twitch"
            value={values.socials["twitch"]}
            onChange={(e) => handleChange(e, "twitch")}
          />
          <Input
            label="Twitter"
            value={values.socials["twitter"]}
            onChange={(e) => handleChange(e, "twitter")}
          />
        </div>
      </div>
      <button className="px-9 py-2 rounded-full bg-[#1814F3] text-white font-semibold text-lg mr-0 ml-auto">
        ZAPISZ
      </button>
    </>
  );
};

export default UserDataForm;
