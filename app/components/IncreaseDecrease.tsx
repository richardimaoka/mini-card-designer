import { JSX, useEffect, useState } from "react";
import styles from "./IncreaseDecrease.module.css";
import { SquareComponent } from "./shapes/SquareComponent";
import { copyShape, defaultSquare, Shape, Square } from "./types";
import { CircleComponent } from "./shapes/CircleComponent";
import { RectangleComponent } from "./shapes/RectangleComponent";

type Props = {};

function Swither({ s }: { s: Shape }): JSX.Element {
  switch (s.shapeType) {
    case "circle":
      return <CircleComponent />;
    case "rectangle":
      return <RectangleComponent />;
    case "card":
      return <div>card</div>;
    case "square":
      return <SquareComponent />;
  }
}

export function IncreaseDecrease(props: Props) {
  const initShape = defaultSquare();
  const [contents, setContents] = useState<Shape[]>([initShape]);
  const [focusMode, setFocusMode] = useState(false);
  const [focused, setFocused] = useState(1);

  // argument `e` is NOT React.KeyboardEvent as it's passed to document.addEventListner
  function onKeyDown(e: KeyboardEvent) {
    console.log("onKeyDown", contents.length, e.key);
    if (focusMode) {
      switch (e.key) {
        case "Escape":
          setFocusMode(false);
          break;
        case "ArrowLeft":
          if (focused > 1) {
            setFocused(focused - 1);
          }
          break;
        case "ArrowRight":
          if (focused < contents.length) {
            setFocused(focused + 1);
          }
          break;
        case "c":
          const newContents = [contents];

          break;
        default:
          break;
      }
    } else {
      switch (e.key) {
        case "i":
          setFocusMode(true);
          break;
        case "-":
          if (contents.length > 1) {
            const minus1 = contents
              .map(copyShape)
              .slice(0, contents.length - 1);
            setContents(minus1);
          }
          break;
        case "+":
          if (contents.length < 8) {
            let plus1 = contents.map(copyShape);
            plus1.push(defaultSquare());
            setContents(plus1);
          }
          break;
        default:
          break;
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [
    // State variables are necessary dependencies, othwerwise,
    // onKeydown callback always uses the initial (stale) state.
    focused,
    focusMode,
    contents,
  ]);

  function focusStyle() {
    if (focusMode) {
      switch (focused) {
        case 1:
          return styles.focus1;
        case 2:
          return styles.focus2;
        case 3:
          return styles.focus3;
        case 4:
          return styles.focus4;
        case 5:
          return styles.focus5;
        case 6:
          return styles.focus6;
        case 7:
          return styles.focus7;
        case 8:
          return styles.focus8;
        default:
          return "";
      }
    } else {
      return "";
    }
  }

  return (
    <div className={styles.component}>
      <div
        className={styles.card + (focusMode ? " " + focusStyle() : "")}
        style={{ gridTemplateColumns: `repeat(${contents.length}, auto)` }}
      >
        {contents.map((x, i) => (
          <Swither key={i} s={x} />
        ))}
      </div>
    </div>
  );
}
