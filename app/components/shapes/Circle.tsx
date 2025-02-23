import styles from "./Circle.module.css";
import {
  CircleShape,
  FocusProps,
  NestProps,
  pathAppend,
  pathMatched,
} from "./definitions/shapes";

type Props = CircleShape & FocusProps & NestProps;

export function Circle(props: Props) {
  const path = pathAppend(props.parentPath, props.id);
  const focused = props.focusPath && pathMatched(path, props.focusPath);

  return (
    <div
      className={styles.component}
      style={{
        border: focused ? "solid 2px yellow" : undefined,
      }}
    ></div>
  );
}
