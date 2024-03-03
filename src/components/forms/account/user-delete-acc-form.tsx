"use client";

import { UserService } from "@/lib/firebase/firebase-actions";
import { signOut } from "next-auth/react";

interface Props {
  uid: string;
}

const UserDeleteAccForm = ({ uid }: Props) => {
  const deleteAcc = async () => {
    await UserService.deleteUser(uid);
    signOut();
  };

  return (
    <>
      <div className="flex flex-col gap-y-2 text-sm max-w-[300px]">
        Jeśli nie chcesz już korzystać z narzędzia możesz usunąć konto w tym
        miejscu.
        <span className="text-xs">
          Pamiętaj, konto zostanie usunięte trwale!
        </span>
      </div>
      <button
        className="px-9 py-2 rounded-md bg-red-500 text-white font-semibold text-lg mr-0 ml-auto"
        onClick={deleteAcc}
      >
        USUŃ
      </button>
    </>
  );
};

export default UserDeleteAccForm;
