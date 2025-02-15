"use client";

import { useEffect, useState } from "react";
import styles from "./Designer.module.css";
import { Mode, NumItems } from "./types";
import { SwitchCard } from "./switch/SwitchCard";

type Props = {};

function switchStyle(mode: Mode): string {
  switch (mode) {
    case "horizontal":
      return styles.horizontal;
    case "vertical":
      return styles.vertical;
  }
}

export function Designer(props: Props) {
  const [mode, setMode] = useState<Mode>("horizontal");
  const [numItems, setNumItems] = useState<NumItems>("2");

  // argument `e` is NOT React.KeyboardEvent as it's passed to document.addEventListner
  function onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "v":
        setMode("vertical");
        break;
      case "h":
        setMode("horizontal");
        break;
      case "2":
        setNumItems("2");
        break;
      case "3":
        setNumItems("3");
        break;
      case "4":
        setNumItems("4");
        break;
      case "5":
        setNumItems("5");
        break;
      case "6":
        setNumItems("6");
        break;
      case "7":
        setNumItems("7");
        break;
      case "8":
        setNumItems("8");
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const styleSizing = switchStyle(mode);

  return (
    <div className={styles.component + " " + styleSizing}>
      <SwitchCard mode={mode} numItems={numItems} />
    </div>
  );
}
