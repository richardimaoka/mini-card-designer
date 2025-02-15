import { JSX } from "react";
import { Mode, NumItems } from "../types";
import { HorizontalSwitch } from "./HorizontalSwitch";
import { VerticalSwitch } from "./VerticalSwitch";

type Props = {
  mode: Mode;
  numItems: NumItems;
};

export function RootSwitch(props: Props): JSX.Element {
  switch (props.mode) {
    case "horizontal":
      return <HorizontalSwitch numItems={props.numItems} />;
    case "vertical":
      return <VerticalSwitch numItems={props.numItems} />;
  }
}
