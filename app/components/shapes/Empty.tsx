import {
  EmptyShape,
  FocusProps,
  NestProps,
  pathAppend,
  pathMatched,
} from "./definitions/shapes";
import styles from "./Empty.module.css";

type Props = EmptyShape & FocusProps & NestProps;

export function Empty(props: Props) {
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
