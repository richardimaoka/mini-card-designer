import { Shape } from "../shapes/definitions/shapes";
import styles from "./SourceCodeViewer.module.css";

type Props = {
  rootShape: Shape;
};

function divString() {
  const children = `<div>dddd</div>`;
  return `<div class={styles.component}>${children}</div>`;
}

export function SourceCodeViewer(props: Props) {
  return (
    <div className={styles.component}>
      <pre>
        <code>{divString()}</code>
      </pre>
    </div>
  );
}
