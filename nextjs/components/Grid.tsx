import styles from "./Grid.module.css";
import { Rectangle } from "./Rectangle";
import { Square } from "./Square";

type Props = {};

export function Grid(props: Props) {
  return (
    <div className={styles.component}>
      <Square />
      <Rectangle />
      <Square />
      <Square />
    </div>
  );
}
