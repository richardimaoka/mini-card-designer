"use client";

import { IncreaseDecrease } from "./components/IncreaseDecrease";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.component}>
      <IncreaseDecrease />
    </div>
  );
}
