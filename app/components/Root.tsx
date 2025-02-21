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

function layoutChange(key: string) {}

const mapping = [
  {
    keyCombo: "la",
  },
];

function changeChildrenSize(
  shape: Contanier1DShape,
  numChildren: number
): Contanier1DShape {
  const newShape = copyContainer1D(shape);

  // Children size to be numChildren
  newShape.children = [];
  for (let i = 0; i < numChildren; i++) {
    if (i < shape.children.length) {
      newShape.children[i] = copyShape(shape.children[i]);
    } else {
      newShape.children[i] = createCircle(16);
      newShape.trackSizes.push("auto");
    }
  }

  return newShape;
}

export function Root(props: Props) {
  const circle = createCircle(16);
  const rootShape = createContainer1D("horizontal", "white", [circle]);
  rootShape.widthPx = 600;

  const newShape = changeChildrenSize(rootShape, 5);
  return <Container1DHorizontal {...newShape} parentPath={[]} />;
}
