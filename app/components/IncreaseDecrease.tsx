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
    console.log("onKeyDown", numItems);
    switch (e.key) {
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
      default:
        break;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [
    // State variables are necessary dependencies, othwerwise,
    // onKeydown callback always uses the initial (stale) state.
    numItems,
  ]);

  const children = Array.from(Array(numItems).keys());

  return (
    <div className={styles.component}>
      <div
        className={styles.card}
        style={{ gridTemplateColumns: `repeat(${numItems}, auto)` }}
      >
        {children.map((_, i) => (
          <Square key={i} />
        ))}
      </div>
    </div>
  );
}
