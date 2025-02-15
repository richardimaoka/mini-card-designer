import { Mode, NumItems } from "./types";
import { Card as VerticalCard } from "./vertical/2-items/auto-1fr/Card";
import { Card as HorizontalCard } from "./horizontal/2-items/auto-1fr/Card";
import { JSX } from "react";

type Props = {
  mode: Mode;
  numItems: NumItems;
};

export function SwitchCard(props: Props): JSX.Element {
  switch (props.mode) {
    case "horizontal":
      return <HorizontalCard />;
    case "vertical":
      return <VerticalCard />;
  }
}
