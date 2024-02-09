import FunnelEditor from "@/components/widget-configurator/editor";

const WidgetPage = () => {
  return (
    <div>
      <FunnelEditor widgetId="123" liveMode />
    </div>
  );
};

export default WidgetPage;

// const testOBJ: EditorElement = {
//   id: "02306",
//   styles: {
//     color: "black",
//     backgroundColor: "red",
//     width: "100px",
//   },
//   name: "Text",
//   type: "text",
//   content: {
//     innerText: "Hello Element Text",
//   },
// };
