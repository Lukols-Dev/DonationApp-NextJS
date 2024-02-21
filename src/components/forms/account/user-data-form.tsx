"use client";

import { Input } from "@/components/ui/input";
import Dropzone from "@/components/ui/input-file";
import { useToast } from "@/components/ui/use-toast";
import {
  FileService,
  PaymentPageService,
  UserService,
} from "@/lib/firebase/firebase-actions";
import { useEffect, useState } from "react";

interface Props {
  uid: string;
  pid?: string;
  data: any;
}

type UserData = {
  nick: string;
  email: string;
  picture: File | null | undefined;
  socials: {
    youtube?: string;
    twitch?: string;
    twitter?: string;
  };
};

const UserDataForm = ({ uid, pid, data }: Props) => {
  const { toast } = useToast();
  const [changes, setChanges] = useState<Partial<UserData>>({});
  const [values, setValues] = useState<UserData>({
    nick: "",
    email: "",
    picture: null,
    socials: {
      youtube: "",
      twitch: "",
      twitter: "",
    },
  });

  const initUserData = () => {
    setValues({ ...values, ...data });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof UserData | keyof UserData["socials"]
  ) => {
    if (field in values) {
      setValues({ ...values, [field]: e.target.value });
      setChanges({ ...changes, [field]: e.target.value });
    } else {
      setValues({
        ...values,
        socials: { ...values.socials, [field]: e.target.value },
      });
      setChanges({
        ...changes,
        socials: { ...changes.socials, [field]: e.target.value },
      });
    }
  };

  const onSubmit = async () => {
    try {
      await UserService.updateUserData(uid, changes);
      if (changes.nick && pid) {
        await PaymentPageService.updatePaymentPageInfo(pid, {
          nick: changes.nick,
        });
      }

      if (changes.socials && pid) {
        await PaymentPageService.updatePaymentPageInfo(pid, {
          socials: changes.socials,
        });
      }

      if (changes.picture && pid) {
        const pictureUrl = await FileService.addFile(uid, changes.picture);
        await UserService.updateUserData(uid, { picture: pictureUrl });
        await PaymentPageService.updatePaymentPageInfo(pid, {
          picture: pictureUrl,
        });
      }
      toast({
        variant: "default",
        title: "Sukces",
        description: `Dane zostały zaktualizowane.`,
      });
      setChanges({});
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Wystąpił błąd podczas zapisu. Spróbuj jeszcze raz lub skontaktuj się z Tipey.",
      });
      console.log("Error update user setting page: ", err);
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
          {/* <Input
            label="Zdjęcie konta"
            value={values.picture}
            onChange={(e) => handleChange(e, "picture")}
          /> */}
          <div className="max-w-[200px]">
            <Dropzone
              value={values.picture}
              dropzoneOptions={{
                maxSize: 1024 * 1024 * 1, // 1MB
              }}
              onChange={(file) => {
                setValues((prev) => ({
                  ...prev,
                  picture: file,
                }));
                setChanges((prev) => ({
                  ...prev,
                  picture: file,
                }));
              }}
            />
          </div>
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
      <button
        className="px-9 py-2 rounded-full bg-[#1814F3] text-white font-semibold text-lg mr-0 ml-auto"
        onClick={onSubmit}
      >
        ZAPISZ
      </button>
    </>
  );
};

export default UserDataForm;
