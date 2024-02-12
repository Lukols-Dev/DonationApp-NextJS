import WidgetEditor from "@/components/widget-configurator/editor";
import EditorFooter from "@/components/widget-configurator/footer";
import EditorSidebar from "@/components/widget-configurator/sidebar";
import EditorProvider from "@/providers/widget-configurator/configurator-provider";

const ConfiguratorPage = () => {
  return (
    <div className="w-full h-full bg-background overflow-hidden">
      <EditorProvider subaccountId={"1"} funnelId={"2"} pageDetails={1}>
        <div className="h-full w-full flex justify-center">
          <WidgetEditor widgetId={"1223"} />
        </div>
        <EditorFooter />
        <EditorSidebar subaccountId={"22"} />
      </EditorProvider>
    </div>
  );
};

export default ConfiguratorPage;
