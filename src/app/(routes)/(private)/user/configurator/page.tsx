import WidgetEditor from "@/components/widget-configurator/editor";
import EditorFooter from "@/components/widget-configurator/footer";
import EditorSidebar from "@/components/widget-configurator/sidebar";
import { useDonateModal } from "@/hooks/useDonate";
import getCurrentUser from "@/lib/auth-actions";
import EditorProvider from "@/providers/widget-configurator/configurator-provider";

const ConfiguratorPage = async () => {
  const currentUser: { uid: string } = await getCurrentUser();

  if (!currentUser) return;
  return (
    <div className="w-full h-full bg-white overflow-hidden">
      <EditorProvider subaccountId={"1"} funnelId={"2"} pageDetails={1}>
        <div className="h-full w-full flex justify-center">
          <WidgetEditor uid={currentUser.uid} />
        </div>
        <EditorFooter uid={currentUser.uid} />
        <EditorSidebar subaccountId={"22"} />
      </EditorProvider>
    </div>
  );
};

export default ConfiguratorPage;
