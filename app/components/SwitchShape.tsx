import { JSX, useEffect, useState } from "react";
import { Circle } from "./shapes/Circle";
import { SquareComponent } from "./shapes/SquareComponent";
import styles from "./SwitchShape.module.css";
import { Shape } from "./types";
import { RectangleRoundCorner } from "./shapes/RectangleRoundCorner";
import { SquareRoundCorner } from "./shapes/SquareRoundCorner";
import { Rectangle } from "./shapes/Rectangle";

type Props = {};

function Swither({ shape }: { shape: Shape }): JSX.Element {
  switch (shape) {
    case "circle":
      return <Circle />;
    case "rectangle":
      return <Rectangle />;
    case "rectangle-rounded":
      return <RectangleRoundCorner />;
    case "square":
      return <SquareComponent />;
    case "square-rounded":
      return <SquareRoundCorner />;
  }
}

export function SwitchShape(props: Props): JSX.Element {
  const [shape, setShape] = useState<Shape>("circle");

  // argument `e` is NOT React.KeyboardEvent as it's passed to document.addEventListner
  function onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "c":
        setShape("circle");
        break;
      case "r":
        setShape("rectangle");
        break;
      case "R":
        setShape("rectangle-rounded");
        break;
      case "s":
        setShape("square");
        break;
      case "S":
        setShape("square-rounded");
        break;
      // case "4":
      //   setNumItems("4");
      //   break;
      // case "5":
      //   setNumItems("5");
      //   break;
      // case "6":
      //   setNumItems("6");
      //   break;
      // case "7":
      //   setNumItems("7");
      //   break;
      // case "8":
      //   setNumItems("8");
      // break;
      default:
        break;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className={styles.component}>
      <Swither shape={shape} />
    </div>
  );
}
