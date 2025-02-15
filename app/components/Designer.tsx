"use client";

import { Card as HorizontalCard } from "./horizontal/2-items/auto-1fr/Card";
import { Card as VerticalCard } from "./vertical/2-items/auto-1fr/Card";
import styles from "./Designer.module.css";
import { JSX, useEffect, useState } from "react";

type Props = {};

type Mode = "horizontal" | "vertical";

function SwitchCard({ mode }: { mode: Mode }): JSX.Element {
  switch (mode) {
    case "horizontal":
      return <HorizontalCard />;
    case "vertical":
      return <VerticalCard />;
  }
}

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

  // argument `e` is NOT React.KeyboardEvent as it's passed to document.addEventListner
  function onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "v":
        setMode("vertical");
        break;
      case "h":
        setMode("horizontal");
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
      <SwitchCard mode={mode} />
    </div>
  );
}
