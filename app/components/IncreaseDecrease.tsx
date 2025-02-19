import { useEffect, useState } from "react";
import styles from "./IncreaseDecrease.module.css";
import {
  copyShape,
  crateCard,
  createCircle,
  createRectangle,
  createSquare,
  Shape,
} from "./types";
import { Swither } from "./Switcher";

type Props = {};

export function IncreaseDecrease(props: Props) {
  const initShape = createSquare();
  const [contents, setContents] = useState<Shape[]>([initShape]);
  const [focusMode, setFocusMode] = useState(false);
  const [focused, setFocused] = useState(0);

  // argument `e` is NOT React.KeyboardEvent as it's passed to document.addEventListner
  function onKeyDown(e: KeyboardEvent) {
    console.log("onKeyDown", contents.length, e.key);
    if (focusMode) {
      switch (e.key) {
        case "Escape":
          setFocusMode(false);
          break;
        case "ArrowLeft":
          if (focused > 0) {
            setFocused(focused - 1);
          }
          break;
        case "ArrowRight":
          if (focused < contents.length - 1) {
            setFocused(focused + 1);
          }
          break;
        case "h": {
          let newContents = contents.map(copyShape);
          const child = newContents[focused];
          newContents[focused] = crateCard(child);
          setContents(newContents);
          break;
        }
        case "c": {
          let newContents = contents.map(copyShape);
          newContents[focused] = createCircle();
          setContents(newContents);
          break;
        }
        case "r": {
          let newContents = contents.map(copyShape);
          newContents[focused] = createRectangle();
          setContents(newContents);
          break;
        }
        case "s": {
          let newContents = contents.map(copyShape);
          newContents[focused] = createSquare();
          setContents(newContents);
          break;
        }
        default:
          break;
      }
    } else {
      switch (e.key) {
        case "i":
          setFocusMode(true);
          break;
        case "-":
          if (contents.length > 0) {
            const minus1 = contents
              .map(copyShape)
              .slice(0, contents.length - 1);
            setContents(minus1);
          }
          break;
        case "+":
          if (contents.length < 8) {
            let plus1 = contents.map(copyShape);
            plus1.push(createSquare());
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
        case 0:
          return styles.focus1;
        case 1:
          return styles.focus2;
        case 2:
          return styles.focus3;
        case 3:
          return styles.focus4;
        case 4:
          return styles.focus5;
        case 5:
          return styles.focus6;
        case 6:
          return styles.focus7;
        case 7:
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
          <Swither key={i} shape={x} />
        ))}
      </div>
    </div>
  );
}
