import { JSX } from "react";
import { CardShape, Shape } from "../types";
import { CircleComponent } from "./CircleComponent";
import styles from "./HorizontalCardComponent.module.css";
import { RectangleComponent } from "./RectangleComponent";
import { SquareComponent } from "./SquareComponent";

type InnerProps = { shape: Shape };

function InnerSwitcher({ shape }: InnerProps): JSX.Element {
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

type Props = CardShape;

export function HorizontalCardComponent(props: Props) {
  return (
    <div
      className={styles.component}
      style={{ gridAutoColumns: `repeat(${props.children.length}, auto)` }}
    >
      {props.children.map((x, i) => (
        <InnerSwitcher key={i} shape={x} />
      ))}
    </div>
  );
}
