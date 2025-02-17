import { Card } from "../types";
import styles from "./HorizontalCardComponent.module.css";

type Props = Card;

export function HorizontalCardComponent(props: Props) {
  return (
    <div
      className={styles.component}
      style={{ gridAutoColumns: `repeat(${props.children.length}, auto)` }}
    ></div>
  );
}
