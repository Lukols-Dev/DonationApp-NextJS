"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlignCenter,
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEndIcon,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyStart,
  ChevronsLeftRightIcon,
  LucideImageDown,
} from "lucide-react";

import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useEditor } from "@/hooks/useEditor";
import { Switch } from "@/components/ui/switch";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { ControllerService } from "@/lib/firebase/firebase-actions";

type Props = {};

const StylesTab = (props: Props) => {
  const { state, dispatch } = useEditor();

  const handleOnChanges = (e: any) => {
    const styleSettings = e.target.id;
    let value =
      styleSettings === "backgroundImage"
        ? `url(${e.target.value})`
        : e.target.value;
    const styleObject = {
      [styleSettings]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    });
  };

  const handleChangeCustomValues = (e: any) => {
    const settingProperty = e.target.id;
    let value = e.target.value;
    const styleObject = {
      [settingProperty]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          content: {
            ...state.editor.selectedElement.content,
            ...styleObject,
          },
        },
      },
    });
  };

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["Typography", "Dimensions", "Decorations", "Flexbox"]}
    >
      <AccordionItem value="Custom" className="px-6 py-0  ">
        <AccordionTrigger className="!no-underline">Dodatki</AccordionTrigger>
        <AccordionContent>
          <div className="flex gap-4 flex-col">
            {state.editor.selectedElement.type === "list" &&
              !Array.isArray(state.editor.selectedElement.content) && (
                <>
                  <div>
                    <Label className="text-muted-foreground">
                      Liczba elementów listy
                    </Label>
                    <Input
                      id="number_list_elements"
                      placeholder="0"
                      onChange={handleChangeCustomValues}
                      value={
                        state.editor.selectedElement.content
                          .number_list_elements
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">
                      Rodzaj danych
                    </Label>
                    <Select
                      defaultValue={
                        state.editor.selectedElement.content.list_data_setting
                      }
                      onValueChange={(e) =>
                        handleChangeCustomValues({
                          target: {
                            id: "list_data_setting",
                            value: e,
                          },
                        })
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Wybierz dane" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="amount">Top Wpłaty</SelectItem>
                          <SelectItem value="create_at">
                            Ostatnie Wpłaty
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            {state.editor.selectedElement.type === "donate" &&
              !Array.isArray(state.editor.selectedElement.content) && (
                <>
                  <div>
                    <Label className="text-muted-foreground">
                      Grafika donejta
                    </Label>
                    <Input
                      id="donate_url"
                      placeholder="url()"
                      onChange={handleChangeCustomValues}
                      value={state.editor.selectedElement.content.donate_url}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">
                      Opóźnienie między donejtami
                    </Label>
                    <Input
                      id="donate_delay"
                      placeholder="1s"
                      onChange={handleChangeCustomValues}
                      value={state.editor.selectedElement.content.donate_delay}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">
                      Kwota aktywująca
                    </Label>
                    <Input
                      id="donate_activation_amount"
                      placeholder="1"
                      onChange={handleChangeCustomValues}
                      value={
                        state.editor.selectedElement.content
                          .donate_activation_amount
                      }
                    />
                  </div>
                  <div className="flex items-center gap-x-6">
                    <Label className="text-muted-foreground">Lektor</Label>
                    <Switch
                      id="donate_lector"
                      checked={
                        state.editor.selectedElement.content.donate_lector
                      }
                      onCheckedChange={(e) =>
                        handleChangeCustomValues({
                          target: {
                            id: "donate_lector",
                            value: e,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center gap-x-6">
                    <Label className="text-muted-foreground">
                      Aktywacja kontrolera donejta
                    </Label>
                    <Switch
                      id="donate_controller"
                      checked={
                        state.editor.selectedElement.content.donate_controller
                      }
                      onCheckedChange={(e) =>
                        handleChangeCustomValues({
                          target: {
                            id: "donate_controller",
                            value: e,
                          },
                        })
                      }
                    />
                  </div>
                </>
              )}
            {state.editor.selectedElement.type === "goal" &&
              !Array.isArray(state.editor.selectedElement.content) && (
                <>
                  <div>
                    <Label className="text-muted-foreground">
                      Maksymalna kwota celu
                    </Label>
                    <Input
                      id="goal_max_value"
                      placeholder="100"
                      onChange={handleChangeCustomValues}
                      value={
                        state.editor.selectedElement.content.goal_max_value
                      }
                    />
                  </div>
                  <div className="flex items-center gap-x-6">
                    <Label className="text-muted-foreground">Start celu</Label>
                    <Switch
                      id="goal_activation"
                      checked={
                        state.editor.selectedElement.content.goal_activation
                      }
                      onCheckedChange={(e) =>
                        handleChangeCustomValues({
                          target: {
                            id: "goal_activation",
                            value: e,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center gap-x-6">
                    <Label className="text-muted-foreground">
                      Aktywacja kontrolera celu
                    </Label>
                    <Switch
                      id="goal_controller"
                      checked={
                        state.editor.selectedElement.content.goal_controller
                      }
                      onCheckedChange={(e) =>
                        handleChangeCustomValues({
                          target: {
                            id: "goal_controller",
                            value: e,
                          },
                        })
                      }
                    />
                  </div>
                </>
              )}

            {(state.editor.selectedElement.type === "list" ||
              state.editor.selectedElement.type === "donate" ||
              state.editor.selectedElement.type === "goal") &&
              !Array.isArray(state.editor.selectedElement.content) && (
                <>
                  <div>
                    <Label className="text-muted-foreground">
                      Wyświetlana kwota
                    </Label>
                    <Select
                      defaultValue={
                        state.editor.selectedElement.content.amount_type
                      }
                      onValueChange={(e) =>
                        handleChangeCustomValues({
                          target: {
                            id: "amount_type",
                            value: e,
                          },
                        })
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Rodzaj kwoty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="amount">
                            Kwota bez prowizji
                          </SelectItem>
                          <SelectItem value="amount_after_fees">
                            Kwota z prowizją
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Typography" className="px-6 py-0  border-y-[1px]">
        <AccordionTrigger className="!no-underline">Tekst</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 ">
          <div className="flex flex-col gap-2 ">
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: "textAlign",
                    value: e,
                  },
                })
              }
              value={state.editor.selectedElement.styles.textAlign}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TabsTrigger
                  value="left"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignLeft size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="right"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignRight size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="center"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignCenter size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="justify"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                >
                  <AlignJustify size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Kolor</Label>
            <div className="flex  border-[1px] rounded-md overflow-clip">
              <div
                className="w-12"
                style={{
                  backgroundColor: state.editor.selectedElement.styles.color,
                }}
              />
              <Input
                placeholder="black"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="color"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.color}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <Label className="text-muted-foreground">Grubość czcionki</Label>
              <Select
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: "font-weight",
                      value: e,
                    },
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Wybierz grubość" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="bold">Bold</SelectItem>
                    <SelectItem value="normal">Regular</SelectItem>
                    <SelectItem value="lighter">Light</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-muted-foreground">Rozmiar</Label>
              <Input
                placeholder="px"
                id="fontSize"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.fontSize}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Dimensions" className=" px-6 py-0 ">
        <AccordionTrigger className="!no-underline">
          Wymiary elementu
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Wysokość</Label>
                    <Input
                      id="height"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.height}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Szerokość</Label>
                    <Input
                      placeholder="px"
                      id="width"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.width}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Positions" className="px-6 py-0 ">
        <AccordionTrigger className="!no-underline">
          Pozycja elementu
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Góra</Label>
                    <Input
                      id="top"
                      placeholder="%"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.top}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Dół</Label>
                    <Input
                      placeholder="%"
                      id="bottom"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.bottom}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Lewo</Label>
                    <Input
                      placeholder="%"
                      id="left"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.left}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Prawo</Label>
                    <Input
                      placeholder="%"
                      id="right"
                      onChange={handleOnChanges}
                      value={state.editor.selectedElement.styles.right}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default StylesTab;
