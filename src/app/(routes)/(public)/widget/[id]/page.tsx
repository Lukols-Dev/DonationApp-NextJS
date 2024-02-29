import WidgetEditor from "@/components/widget-configurator/editor";
import { isEmpty } from "@/lib/utils";
import EditorProvider from "@/providers/widget-configurator/configurator-provider";
import { Page } from "@/types/page";
import { notFound } from "next/navigation";

const WidgetPage = async (props: Page) => {
  const { params } = props;

  if (isEmpty(params) || !params.id) {
    return notFound();
  }

  return (
    <div className="h-screen w-screen">
      <EditorProvider subaccountId={"1"} funnelId={"2"} pageDetails={1}>
        <WidgetEditor uid={params.id} liveMode={true} />
      </EditorProvider>
    </div>
  );
};

export default WidgetPage;
