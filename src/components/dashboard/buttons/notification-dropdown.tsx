"use client";

import TooltipWrapper from "@/components/ui/tooltip";
import { NotificationService } from "@/lib/firebase/firebase-actions";
import { formatTimestamp } from "@/lib/utils";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Notification = {
  description: string;
  create_at: any;
};

interface Props {
  uid: string;
}

const NotificationBtn = ({ uid }: Props) => {
  const route = useRouter();
  const [notifications, setNotifications] = useState<{
    count: number;
    notifications: Notification[];
  }>();
  const [open, setOpen] = useState<boolean>(false);

  const getNotifications = async () => {
    try {
      const notifications: { count: number; notifications: Notification[] } =
        await NotificationService.getAllNotifications(uid);
      setNotifications(notifications);
    } catch (err) {
      console.log("Err get notification: ", err);
    }
  };

  const deleteNotifications = async () => {
    try {
      await NotificationService.deleteAllNotifications(uid);
      route.refresh();
    } catch (err) {
      console.log("Err delete notification: ", err);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="relative" onClick={() => setOpen((prev) => !prev)}>
      <TooltipWrapper description={`Komunikaty: ${notifications?.count}`}>
        <Bell className="w-7 h-7 cursor-pointer text-[#343C6A] hover:text-blue-700" />
      </TooltipWrapper>

      {notifications && notifications.count > 0 && (
        <>
          <span className="text-[8px] w-3 h-3 rounded-full bg-red-500 absolute -top-2 -right-2 animate-ping" />
          <span className="text-[8px] w-3 h-3 rounded-full bg-red-500 absolute -top-2 -right-2" />
        </>
      )}
      {open && (
        <div className="absolute top-12 right-0 p-4 w-[300px] bg-white z-50 rounded-md shadow-md border-2 border-gray-50">
          {notifications && notifications.count > 0 ? (
            <div className="flex flex-col gap-2">
              <div className="overflow-y-auto max-h-[300px]">
                {notifications.notifications.map(
                  (item: Notification, index: any) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 text-sm"
                    >
                      <span>{item.description}</span>
                      <span>{formatTimestamp(item.create_at)}</span>
                    </div>
                  )
                )}
              </div>
              <button
                className="ml-auto mr-0 text-sm"
                onClick={deleteNotifications}
              >
                wyczyść
              </button>
            </div>
          ) : (
            <div>Brak komunikatów</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBtn;
