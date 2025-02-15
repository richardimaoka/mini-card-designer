import { NumItems } from "../types";
import { Card as Card2 } from "../cards/vertical/2-items/auto-1fr/Card";
import { Card as Card3 } from "../cards/vertical/3-items/auto-auto-1fr/Card";
import { JSX } from "react";

type Props = {
  numItems: NumItems;
};

export function VerticalSwitch(props: Props): JSX.Element {
  switch (props.numItems) {
    case "2":
      return <Card2 />;
    case "3":
      return <Card3 />;
  }
}
