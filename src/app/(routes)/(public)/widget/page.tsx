import WidgetEditor from "@/components/widget-configurator/editor";
import getCurrentUser from "@/lib/auth-actions";
import EditorProvider from "@/providers/widget-configurator/configurator-provider";

const WidgetPage = async () => {
  const currentUser: { uid: string } = await getCurrentUser();

  if (!currentUser.uid) return;

  return (
    <div className="h-screen w-screen">
      <EditorProvider subaccountId={"1"} funnelId={"2"} pageDetails={1}>
        <WidgetEditor uid={currentUser.uid} liveMode={true} />
      </EditorProvider>
    </div>
  );
};

export default WidgetPage;
