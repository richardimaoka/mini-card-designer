import styles from "./Root.module.css";
import { Container1DHorizontal } from "./shapes/Container1D";
import {
  Contanier1DShape,
  copyContainer1D,
  copyShape,
  createCircle,
  createContainer1D,
} from "./shapes/definitions/shapes";

type Props = {};

function to3Elems(shape: Contanier1DShape): Contanier1DShape {
  const newShape = copyContainer1D(shape);

  // Children size to be 3
  newShape.children = [];
  for (let i = 0; i < 3; i++) {
    if (i < shape.children.length - 1) {
      newShape.children[i] = copyShape(shape.children[i]);
    } else {
      newShape.children[i] = createCircle(16);
    }
  }

  // Change track size
  newShape.trackSizes = ["auto", "auto", "auto"];

  return newShape;
}

export function Root(props: Props) {
  const circle = createCircle(16);
  const rootShape = createContainer1D("horizontal", "white", [circle]);

  const newShape = to3Elems(rootShape);

  return (
    <div className={styles.component}>
      <Container1DHorizontal {...newShape} path={[]} />
    </div>
  );
}
