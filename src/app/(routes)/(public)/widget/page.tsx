import WidgetEditor from "@/components/widget-configurator/editor";
import EditorProvider from "@/providers/widget-configurator/configurator-provider";

const WidgetPage = () => {
  return (
    <div className="h-screen w-screen">
      <EditorProvider subaccountId={"1"} funnelId={"2"} pageDetails={1}>
        <WidgetEditor widgetId={"1223"} liveMode={true} />
      </EditorProvider>
    </div>
  );
};

export default WidgetPage;
