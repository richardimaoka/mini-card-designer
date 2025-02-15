import { Card } from "./Card";
import styles from "./Designer.module.css";

type Props = {};

export function Designer(props: Props) {
  return (
    <div className={styles.component}>
      <div>designer</div>
      <Card />
    </div>
  );
}
