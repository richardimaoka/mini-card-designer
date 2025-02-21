"use client";

import { Root } from "./components/Root";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.component}>
      <Root />
    </div>
  );
}
