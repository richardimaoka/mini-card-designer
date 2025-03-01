import { EmptyShape, FocusProps, NestProps } from "./definitions/shapes";
import styles from "./Empty.module.css";

type Props = EmptyShape & FocusProps & NestProps;

export function Empty(props: Props) {
  return <div className={styles.component}></div>;
}
