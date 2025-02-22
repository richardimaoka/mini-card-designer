import { useEffect, useState } from "react";
import styles from "./Root.module.css";
import { Container1DHorizontal } from "./shapes/Container1D";
import {
  Contanier1DShape,
  copyContainer1D,
  copyShape,
  createCircle,
  createContainer1D,
  focusInside,
  focusNext,
  focusOutside,
  focusPrev,
  Path,
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
  const shape = createContainer1D("horizontal", "white", [circle]);
  shape.widthPx = 600;
  const newShape = changeChildrenSize(shape, 5);

  const [rootShape, setRootShape] = useState(newShape);
  const [focusPath, setFocusPath] = useState<Path>([]);

  // argument `e` is NOT React.KeyboardEvent as it's passed to document.addEventListner
  function onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "Escape":
        setFocusPath([]);
        break;
      case "f":
        setFocusPath([rootShape.id]);
        break;
      case "i":
        setFocusPath(focusInside(focusPath, rootShape));
        break;
      case "o":
        setFocusPath(focusOutside(focusPath, rootShape));
        break;
      case "h":
        setFocusPath(focusPrev(focusPath, rootShape));
        break;
      case "l":
        setFocusPath(focusNext(focusPath, rootShape));
        break;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [rootShape, focusPath]);

  return (
    <Container1DHorizontal
      {...rootShape}
      parentPath={[]}
      focusPath={focusPath}
    />
  );
}
