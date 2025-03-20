"use client";

import { SourceCodeViewer } from "./components/designer/code/SourceCodeViewer";
import { Designer } from "./components/designer/Designer";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.component}>
      <Designer />
    </div>
  );
}
