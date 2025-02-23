import { useEffect, useState } from "react";
import styles from "./Root.module.css";
import { Container1DHorizontal } from "./shapes/Container1D";
import {
  changeChildrenSize,
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
  Shape,
  unwrap,
  wrapIntoContainer1D,
} from "./shapes/definitions/shapes";

type Props = {};

type HotKeyMode = "default" | "focus" | "layout";

export function Root(props: Props) {
  const circle = createCircle(16);
  const container = createContainer1D("horizontal", "white", [circle]);
  container.widthPx = 600;

  const [rootShape, setRootShape] = useState<Shape>(container);
  const [focusPath, setFocusPath] = useState<Path>([rootShape.id]);
  const [hotKeyMode, setHotKeyMode] = useState<HotKeyMode>("default");

  // argument `e` is NOT React.KeyboardEvent as it's passed to document.addEventListner
  function onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      ///////////////////////////////
      // Focus move hot keys
      ///////////////////////////////
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

      ///////////////////////////////
      // Layout change hot keys
      ///////////////////////////////
      case "g": {
        const [newRootShape, newFocusPath] = wrapIntoContainer1D(
          rootShape,
          focusPath
        );
        setRootShape(newRootShape);
        setFocusPath(newFocusPath);
        break;
      }
      case "u": {
        const [newRootShape, newFocusPath] = unwrap(rootShape, focusPath);
        setRootShape(newRootShape);
        setFocusPath(newFocusPath);
        break;
      }
      case "v":
        //change the current focused container to vertical 1D
        break;
      case "h":
        //change the current focused container to horizontal 1D
        break;
      case "1": {
        //change the number of elements
        const [newRootShape] = changeChildrenSize(rootShape, focusPath, 1);
        setRootShape(newRootShape);
        break;
      }
      case "2": {
        //change the number of elements
        const [newRootShape] = changeChildrenSize(rootShape, focusPath, 2);
        setRootShape(newRootShape);
        break;
      }
      case "3": {
        //change the number of elements
        const [newRootShape] = changeChildrenSize(rootShape, focusPath, 3);
        setRootShape(newRootShape);
        break;
      }
      case "4": {
        //change the number of elements
        const [newRootShape] = changeChildrenSize(rootShape, focusPath, 4);
        setRootShape(newRootShape);
        break;
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [rootShape, focusPath, hotKeyMode]);

  switch (rootShape.shapeType) {
    case "container1D":
      return (
        <Container1DHorizontal
          {...rootShape}
          parentPath={[]}
          focusPath={focusPath}
          nestLevel={1}
        />
      );
    default:
      return <></>;
  }
}
