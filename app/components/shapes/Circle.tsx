import styles from "./Circle.module.css";
import {
  CircleShape,
  FocusProps,
  pathAppend,
  pathMatched,
} from "./definitions/shapes";

type Props = CircleShape & FocusProps;

export function Circle(props: Props) {
  const path = pathAppend(props.parentPath, props.id);
  const focused = props.focusPath && pathMatched(path, props.focusPath);

  return <div className={styles.component}></div>;
}
