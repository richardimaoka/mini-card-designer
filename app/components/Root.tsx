import styles from "./Root.module.css";
import { Container1DHorizontal } from "./shapes/Container1D";
import { createCircle, createContainer1D } from "./shapes/definitions/shapes";

type Props = {};

export function Root(props: Props) {
  const circle = createCircle(16);
  const rootShape = createContainer1D("horizontal", "white", [circle]);

  return (
    <div className={styles.component}>
      <Container1DHorizontal {...rootShape} path={[]} />
    </div>
  );
}
