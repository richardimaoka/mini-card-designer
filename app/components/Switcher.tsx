import { SquareComponent } from "./shapes/SquareComponent";
import { CircleComponent } from "./shapes/CircleComponent";
import { RectangleComponent } from "./shapes/RectangleComponent";
import { HorizontalCardComponent } from "./shapes/HorizontalCardComponent";
import { Shape } from "./types";
import { JSX } from "react";

type Props = { shape: Shape };

export function Swither({ shape }: Props): JSX.Element {
  switch (shape.shapeType) {
    case "circle":
      return <CircleComponent />;
    case "rectangle":
      return <RectangleComponent />;
    case "card":
      return <HorizontalCardComponent {...shape} />;
    case "square":
      return <SquareComponent />;
  }
}
