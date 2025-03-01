import { useEffect, useState } from "react";
import { Container1DHorizontal } from "./shapes/Container1D";
import {
  changeChildrenSize,
  createContainer1D,
  createEmptyShape,
  findRightPath,
  focusInside,
  focusNext,
  focusOutside,
  focusPrev,
  Path,
  setDirection,
  setTrackSizeAt,
  Shape,
  unwrap,
  wrapIntoContainer1D,
} from "./shapes/definitions/shapes";
import path from "path";

type Props = {};

type HotKeyMode = "default" | "trackSize" | "select" | "direction";

export function Root(props: Props) {
  const emptyShape = createEmptyShape();
  const container = createContainer1D("horizontal", "white", [emptyShape]);
  container.widthPx = 600;

  const [rootShape, setRootShape] = useState<Shape>(container);
  const [focusPath, setFocusPath] = useState<Path>([rootShape.id]);
  const [hotKeyMode, setHotKeyMode] = useState<HotKeyMode>("default");
  const [selection, setSelection] = useState<Path[]>([]);

  // const focused = ...
  // const focusParent: Container1D | null = ...
  // const focusIndex

  // argument `e` is NOT React.KeyboardEvent as it's passed to document.addEventListner
  function onKeyUp(e: KeyboardEvent) {
    if (hotKeyMode === "select") {
      switch (e.key) {
        case "Shift":
          setSelection([]);
      }
    }
  }

  // argument `e` is NOT React.KeyboardEvent as it's passed to document.addEventListner
  function onKeyDown(e: KeyboardEvent) {
    switch (hotKeyMode) {
      case "direction":
        switch (e.key) {
          case "v": {
            console.log("change direction to v");
            //change the current focused container to vertical 1D
            const [newRootShape, newFocusPath] = setDirection(
              rootShape,
              focusPath,
              "vertical"
            );
            setRootShape(newRootShape);
            setFocusPath(newFocusPath);
            setHotKeyMode("default");
            break;
          }
          case "h": {
            //change the current focused container to horizontal 1D
            const [newRootShape, newFocusPath] = setDirection(
              rootShape,
              focusPath,
              "horizontal"
            );
            setRootShape(newRootShape);
            setFocusPath(newFocusPath);
            setHotKeyMode("default");
            break;
          }
          default:
            setHotKeyMode("default");
        }

      case "trackSize":
        switch (e.key) {
          ///////////////////////////////
          // Change mode hot key
          ///////////////////////////////
          case "Escape":
            setHotKeyMode("default");
            break;
          case "f": {
            const [newRootShape, newFocusPath] = setTrackSizeAt(
              rootShape,
              focusPath,
              "1fr"
            );
            setRootShape(newRootShape);
            setFocusPath(newFocusPath);
            setHotKeyMode("default");
            break;
          }
          case "a": {
            const [newRootShape, newFocusPath] = setTrackSizeAt(
              rootShape,
              focusPath,
              "auto"
            );
            setRootShape(newRootShape);
            setFocusPath(newFocusPath);
            setHotKeyMode("default");
            break;
          }
        }
        break;

      case "select":
        switch (e.key) {
          ///////////////////////////////
          // Focus move hot keys
          ///////////////////////////////
          case "h":
            break;
          case "l":
            break;
        }

      case "default":
        switch (e.key) {
          ///////////////////////////////
          // Change mode hot key
          ///////////////////////////////
          case "t":
            setHotKeyMode("trackSize");
            break;
          case "d":
            setHotKeyMode("direction");
            break;
          case "Shift":
            setHotKeyMode("select");
            setSelection([focusPath]);
            break;

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
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9": {
            const num = Number(e.key);

            //change the number of elements
            const [newRootShape] = changeChildrenSize(
              rootShape,
              focusPath,
              num
            );
            setRootShape(newRootShape);
            break;
          }
        }

        break;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keydown", onKeyUp);
    };
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
