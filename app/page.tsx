"use client";

import { SwitchShape } from "./components/SwitchShape";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.component}>
      <SwitchShape />
    </div>
  );
}
