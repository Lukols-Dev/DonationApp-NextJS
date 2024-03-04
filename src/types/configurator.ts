export type EditorBtns =
  | "list"
  | "text"
  | "donate"
  | "goal"
  | "container"
  | "section"
  | "contactForm"
  | "paymentForm"
  | "link"
  | "2Col"
  | "video"
  | "__body"
  | "image"
  | "3Col"
  | null;

type ListItem = {
  id: string;
  innerText: string;
};

export type EditorElement = {
  id: string;
  styles: React.CSSProperties;
  name: string;
  type: EditorBtns;
  content:
    | EditorElement[]
    | {
        href?: string;
        innerText?: string | string[];
        src?: string;
        number_list_elements?: number;
        list_data_setting?: string;
        amount_type?: string;
        donate_url?: string;
        donate_delay?: number;
        donate_activation_amount?: number;
        donate_lector?: boolean;
        donate_controller?: boolean;
        goal_activation?: boolean;
        goal_max_value?: number;
        goal_start_date?: any;
        goal_controller?: boolean;
      };
};

export type Editor = {
  liveMode: boolean;
  elements: EditorElement[];
  selectedElement: EditorElement;
  device: DeviceTypes;
  previewMode: boolean;
  funnelPageId: string;
};

export type HistoryState = {
  history: Editor[];
  currentIndex: number;
};

export type EditorState = {
  editor: Editor;
  history: HistoryState;
};

export type EditorContextData = {
  device: DeviceTypes;
  previewMode: boolean;
  setPreviewMode: (previewMode: boolean) => void;
  setDevice: (device: DeviceTypes) => void;
};

export type DeviceTypes = "Desktop" | "Mobile" | "Tablet";
