import { useEffect, useState } from "react";
import styles from "./IncreaseDecrease.module.css";
import { Square } from "./shapes/Square";

type Props = {};

export function IncreaseDecrease(props: Props) {
  const [numItems, setNumItems] = useState(1);
  const [focusMode, setFocusMode] = useState(false);
  const [focused, setFocused] = useState(1);

  // argument `e` is NOT React.KeyboardEvent as it's passed to document.addEventListner
  function onKeyDown(e: KeyboardEvent) {
    console.log("onKeyDown", numItems, e.key);
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
          if (focused < numItems) {
            setFocused(focused + 1);
          }
          break;
        case "1":
          setFocused(1);
          break;
        case "2":
          setFocused(2);
          break;
        case "3":
          setFocused(3);
          break;
        case "4":
          setFocused(4);
          break;
        case "5":
          setFocused(5);
          break;
        case "6":
          setFocused(6);
          break;
        case "7":
          setFocused(7);
          break;
        case "8":
          setFocused(8);
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
          if (numItems > 1) {
            setNumItems(numItems - 1);
          }
          break;
        case "+":
          if (numItems < 8) {
            setNumItems(numItems + 1);
          }
          break;
        case "1":
          setNumItems(1);
          break;
        case "2":
          setNumItems(2);
          break;
        case "3":
          setNumItems(3);
          break;
        case "4":
          setNumItems(4);
          break;
        case "5":
          setNumItems(5);
          break;
        case "6":
          setNumItems(6);
          break;
        case "7":
          setNumItems(7);
          break;
        case "8":
          setNumItems(8);
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
    numItems,
    focused,
    focusMode,
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

  const children = Array.from(Array(numItems).keys());

  return (
    <div className={styles.component}>
      <div
        className={styles.card + (focusMode ? " " + focusStyle() : "")}
        style={{ gridTemplateColumns: `repeat(${numItems}, auto)` }}
      >
        {children.map((_, i) => (
          <Square key={i} />
        ))}
      </div>
    </div>
  );
}
