import { useEffect, useState } from "react";
import styles from "./IncreaseDecrease.module.css";
import { Square } from "./shapes/Square";

type Props = {};

export function IncreaseDecrease(props: Props) {
  const [numItems, setNumItems] = useState(1);
  console.log(`IncreaseDecrease numItems=${numItems}`);

  // argument `e` is NOT React.KeyboardEvent as it's passed to document.addEventListner
  function onKeyDown(e: KeyboardEvent) {
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
        setNumItems((n) => (n > 1 ? n - 1 : n));
        break;
      case "+":
        setNumItems((n) => (n < 8 ? n + 1 : n));
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

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
