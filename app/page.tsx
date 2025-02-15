import { Designer } from "./components/Designer";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.component}>
      <Designer />
    </div>
  );
}
