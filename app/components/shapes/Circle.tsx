import styles from "./Circle.module.css";
import { CircleShape, FocusProps } from "./definitions/shapes";

type Props = CircleShape & FocusProps;

export function Circle(props: Props) {
  return <div className={styles.component}></div>;
}
