import { Grid1D } from "../Grid1D";

export type Path = string[];

export type TrackSize = "auto" | "1fr";

export type Padding = {
  topPx: number;
  bottomPx: number;
  leftPx: number;
  rightPx: number;
};

export type Direction = "vertical" | "horizontal";

export type BgColor = "white" | "#e6e6e6";

export type Grid1DShape = {
  shapeType: "grid1D";
  id: string;

  direction: Direction;
  trackSizes: TrackSize[];

  widthPx?: number;
  heightPx?: number;

  padding: Padding;
  gapPx: number;

  backgroundColor?: BgColor;

  children: Shape[];

  className?: string;
};

export type EmptyShape = {
  shapeType: "empty";
  id: string;
};

export type CircleShape = {
  shapeType: "circle";
  id: string;
  radiusPx: number;
};

// type TextShape
// type IconShape

// type Square = {};

// type Square = {};
// type Card1dHorizontal = {};
// type Card1dVertical = {};
// type Card2d
// type List

export type Shape = StandaloneShape | GridShape;
export type StandaloneShape = CircleShape | EmptyShape;
export type GridShape = Grid1DShape;

export type FocusProps = {
  parentPath: Path;
  focusPath?: Path;
};

export type NestProps = {
  nestLevel: number;
};

type ShapeModel = {
  root: Grid1DShape;
  focus?: Path;
};

function replace(model: ShapeModel, path: Path, shape: Shape) {}
function append(model: ShapeModel, path: Path, shape: Shape) {}
function prefix(model: ShapeModel, path: Path, shape: Shape) {}
function insert(model: ShapeModel, path: Path, at: number, shape: Shape) {}
function remove(model: ShapeModel, path: Path, at: number, shape: Shape) {}
function focus(model: ShapeModel, path: Path) {}

// replace to Circle, Rectangle, Square, Card...

function replace1(grid: Grid1DShape, at: number, shape: Shape) {}
function wrap(shape: Shape) {}

/////////////////////////////////////////////////////////////////
// Path functions
/////////////////////////////////////////////////////////////////

export function pathAppend(path: Path, pathElement: string): Path {
  return [...path, pathElement];
}

export function pathMatched(path1: Path, path2: Path): boolean {
  if (path1.length !== path2.length) {
    // if length is different, early return false
    return false;
  }

  // check each element
  for (let index = 0; index < path1.length; index++) {
    if (path1[index] !== path2[index]) {
      // if any element is different, return false
      return false;
    }
  }

  // all elements are matched, then return true
  return true;
}

function findShapeRecursive(
  shape: Shape,
  remainingPath: Path
): Shape | undefined {
  switch (remainingPath.length) {
    case 0:
      return undefined;
    case 1:
      return remainingPath[0] === shape.id ? shape : undefined;
    case 2:
      switch (shape.shapeType) {
        case "grid1D":
          return shape.children.find((c) => c.id === remainingPath[1]);
        case "circle":
          return undefined;
      }
    default:
      switch (shape.shapeType) {
        case "grid1D":
          const child = shape.children.find((c) => c.id === remainingPath[1]);
          if (!child) {
            return undefined;
          } else {
            return findShapeRecursive(child, [...remainingPath].slice(1));
          }
        case "circle":
          return undefined;
      }
  }
}

export function findShape(rootShape: Shape, path: Path): Shape | undefined {
  return findShapeRecursive(rootShape, path);
}

export function getParentPath(path: Path): Path {
  const newPath = [...path];
  newPath.pop();
  return newPath;
}

export function pathEnd(path: Path): string {
  return path[path.length - 1];
}

export function focusInside(path: Path, rootShape: Shape): Path {
  const shape = findShape(rootShape, path);
  if (!shape) {
    return path; // not found, return the unchanged path
  }

  switch (shape.shapeType) {
    case "grid1D":
      const childInside = shape.children[0];
      return [...path, childInside.id];
    case "circle":
      return path;
    case "empty":
      return path;
  }
}

export function focusOutside(path: Path, shape: Shape): Path {
  if (path.length <= 1) {
    return path;
  } else {
    return getParentPath(path);
  }
}

export function moveFocusLeft(path: Path, rootShape: Shape): Path {
  if (path.length <= 1) {
    return path; // path is empty or the root. return the unchanged path
  }

  const parent = findShape(rootShape, getParentPath(path));
  if (!parent) {
    return path; // not found, return the unchanged path
  }

  switch (parent.shapeType) {
    case "grid1D":
      switch (parent.direction) {
        case "horizontal":
          const pathEnd = path[path.length - 1];
          const currentIndex = parent.children.findIndex(
            (c) => c.id === pathEnd
          );

          if (0 < currentIndex) {
            const prev = parent.children[currentIndex - 1];
            return [...getParentPath(path), prev.id];
          } else {
            return path; // unchanged path
          }
        case "vertical":
          return path; // unchanged path
      }
    case "circle":
      throw new Error(
        "focusPrev: parent is not a grid - this must be impossible!"
      );
    case "empty":
      throw new Error(
        "focusPrev: parent is not a grid - this must be impossible!"
      );
  }
}

export function moveFocusRight(path: Path, rootShape: Shape): Path {
  if (path.length <= 1) {
    return path; // path is empty or the root. return the unchanged path
  }

  const parent = findShape(rootShape, getParentPath(path));
  if (!parent) {
    return path; // not found, return the unchanged path
  }

  switch (parent.shapeType) {
    case "grid1D":
      switch (parent.direction) {
        case "horizontal":
          const pathEnd = path[path.length - 1];
          const currentIndex = parent.children.findIndex(
            (c) => c.id === pathEnd
          );

          if (currentIndex < parent.children.length - 1) {
            const next = parent.children[currentIndex + 1];
            return [...getParentPath(path), next.id];
          } else {
            return path; // unchanged path
          }
        case "vertical":
          return path; // unchanged path
      }
    case "circle":
      throw new Error(
        "focusPrev: parent is not a grid - this must be impossible!"
      );
    case "empty":
      throw new Error(
        "focusPrev: parent is not a grid - this must be impossible!"
      );
  }
}

export function moveFocusUp(path: Path, rootShape: Shape): Path {
  if (path.length <= 1) {
    return path; // path is empty or the root. return the unchanged path
  }

  const parent = findShape(rootShape, getParentPath(path));
  if (!parent) {
    return path; // not found, return the unchanged path
  }

  switch (parent.shapeType) {
    case "grid1D":
      switch (parent.direction) {
        case "vertical":
          const pathEnd = path[path.length - 1];
          const currentIndex = parent.children.findIndex(
            (c) => c.id === pathEnd
          );

          if (0 < currentIndex) {
            const prev = parent.children[currentIndex - 1];
            return [...getParentPath(path), prev.id];
          } else {
            return path; // unchanged path
          }
        case "horizontal":
          return path; // unchanged path
      }
    case "circle":
      throw new Error(
        "focusPrev: parent is not a grid - this must be impossible!"
      );
    case "empty":
      throw new Error(
        "focusPrev: parent is not a grid - this must be impossible!"
      );
  }
}

export function moveFocusDown(path: Path, rootShape: Shape): Path {
  if (path.length <= 1) {
    return path; // path is empty or the root. return the unchanged path
  }

  const parent = findShape(rootShape, getParentPath(path));
  if (!parent) {
    return path; // not found, return the unchanged path
  }

  switch (parent.shapeType) {
    case "grid1D":
      switch (parent.direction) {
        case "vertical":
          const pathEnd = path[path.length - 1];
          const currentIndex = parent.children.findIndex(
            (c) => c.id === pathEnd
          );

          if (currentIndex < parent.children.length - 1) {
            const next = parent.children[currentIndex + 1];
            return [...getParentPath(path), next.id];
          } else {
            return path; // unchanged path
          }
        case "horizontal":
          return path; // unchanged path
      }
    case "circle":
      throw new Error(
        "focusPrev: parent is not a grid - this must be impossible!"
      );
    case "empty":
      throw new Error(
        "focusPrev: parent is not a grid - this must be impossible!"
      );
  }
}
/////////////////////////////////////////////////////////////////
// Grid functions
/////////////////////////////////////////////////////////////////

export function createGrid1D(
  direction: Direction,
  bgColor: BgColor | undefined,
  children: Shape[]
): Grid1DShape {
  const id = crypto.randomUUID();

  return {
    shapeType: "grid1D",
    direction: direction,

    id: id,
    trackSizes: ["auto"],

    padding: {
      topPx: 8,
      bottomPx: 8,
      leftPx: 8,
      rightPx: 8,
    },

    gapPx: 8,

    backgroundColor: bgColor,

    children: children,
  };
}

export function isGrid1D(shape: Shape): shape is Grid1DShape {
  return shape.shapeType === "grid1D";
}

export function updateGridWidth(
  shape: Grid1DShape,
  widthPx: number
): Grid1DShape {
  const updatedShape = copyGrid1D(shape);
  updatedShape.widthPx = widthPx;

  return updatedShape;
}

export function updateGridHeight(
  shape: Grid1DShape,
  heightPx: number
): Grid1DShape {
  const updatedShape = copyGrid1D(shape);
  updatedShape.heightPx = heightPx;

  return updatedShape;
}

export function updateGridWidthHeight(
  shape: Grid1DShape,
  widthPx: number,
  heightPx: number
): Grid1DShape {
  const updatedShape = copyGrid1D(shape);
  updatedShape.widthPx = widthPx;
  updatedShape.heightPx = heightPx;

  return updatedShape;
}

export function changeGrid1DSize(
  shape: Grid1DShape,
  numChildren: number
): Grid1DShape {
  const newShape = copyGrid1D(shape);

  // Children size to be numChildren
  newShape.children = [];
  newShape.trackSizes = [];
  for (let i = 0; i < numChildren; i++) {
    if (i < shape.children.length) {
      newShape.children[i] = copyShape(shape.children[i]);
      newShape.trackSizes.push(shape.trackSizes[i]);
    } else {
      newShape.children[i] = createEmptyShape();
      newShape.trackSizes.push("auto");
    }
  }

  return newShape;
}

export function findChildIndex(shape: Grid1DShape, targetId: string): number {
  for (let index = 0; index < shape.children.length; index++) {
    const c = shape.children[index];
    if (c.id === targetId) {
      return index;
    }
  }

  return -1;
}

export function setTrackSize(
  shape: Grid1DShape,
  targetId: string,
  trackSize: TrackSize
): Grid1DShape {
  const targetIndex = findChildIndex(shape, targetId);
  if (targetIndex < 0) {
    return shape; // return unchanged shape
  }

  const newShape = shallowCopyShape(shape);
  newShape.trackSizes = [];
  for (let i = 0; i < shape.trackSizes.length; i++) {
    if (i === targetIndex) {
      newShape.trackSizes.push(trackSize);
    } else {
      newShape.trackSizes.push(shape.trackSizes[i]);
    }
  }

  return newShape;
}

export function setTrackSizes(
  shape: Grid1DShape,
  targetId: string,
  trackSizes: TrackSize[]
): Grid1DShape {
  const targetIndex = findChildIndex(shape, targetId);
  if (targetIndex < 0) {
    return shape; // return unchanged shape
  }

  if (trackSizes.length !== shape.trackSizes.length) {
    return shape; // return unchanged shape
  }

  const newShape = shallowCopyShape(shape);
  newShape.trackSizes = [...trackSizes];

  return newShape;
}

export function changeDirection(
  shape: Grid1DShape,
  direction: Direction
): Grid1DShape {
  const newShape = shallowCopyShape(shape);
  newShape.direction = direction;

  return newShape;
}

/////////////////////////////////////////////////////////////////
// Root shape functions
/////////////////////////////////////////////////////////////////

// make it grid1D specific, and the root component have context-specific hotkey branches?
export function replaceShape(
  rootShape: Shape,
  focusPath: Path,
  newShape: Shape
): [Shape, Path] {
  // If focusPath is on the root, simply returning the newShape will make replacement
  if (focusPath.length === 1) {
    return [newShape, focusPath];
  }

  const newRootShape = copyShape(rootShape);

  const target = findShape(newRootShape, focusPath);
  const parent = findShape(newRootShape, getParentPath(focusPath));
  if (!target || !parent) {
    return [rootShape, focusPath]; // failed to find target or parent, return unchanged rootShape
  }

  switch (parent.shapeType) {
    case "grid1D":
      const targetIndex = findChildIndex(parent, target.id);
      if (targetIndex < 0) {
        return [rootShape, focusPath]; // failed to find target or parent, return unchanged rootShape;
      } else {
        parent.children[targetIndex] = newShape;
        const newPath = pathAppend(getParentPath(focusPath), newShape.id);
        return [newRootShape, newPath];
      }
    case "circle":
      return [rootShape, focusPath]; // return unchanged rootShape
    case "empty":
      return [rootShape, focusPath]; // return unchanged rootShape
  }
}

export function setDirection(
  rootShape: Shape,
  focusPath: Path,
  direction: Direction
): [Shape, Path] {
  const target = findShape(rootShape, focusPath);
  if (!target) {
    return [rootShape, focusPath]; // failed to find target, return unchanged rootShape
  }

  switch (target.shapeType) {
    case "grid1D":
      const changed = changeDirection(target, direction);
      return replaceShape(rootShape, focusPath, changed);
    case "circle":
      return [rootShape, focusPath]; // return unchanged rootShape
    case "empty":
      return [rootShape, focusPath]; // return unchanged rootShape
  }
}

export function wrapIntoGrid1D(
  rootShape: Shape,
  focusPath: Path
): [Shape, Path] {
  const target = findShape(rootShape, focusPath);
  if (!target) {
    return [rootShape, focusPath]; // failed to find target or parent, return unchanged rootShape
  }

  const wrapped = createGrid1D("horizontal", undefined, [target]);
  return replaceShape(rootShape, focusPath, wrapped);
}

// make it grid1D specific, and the root component have context-specific hotkey branches?
export function unwrap(rootShape: Shape, focusPath: Path): [Shape, Path] {
  const target = findShape(rootShape, focusPath);
  if (!target) {
    return [rootShape, focusPath]; // failed to find target or parent, return unchanged rootShape
  }

  switch (target.shapeType) {
    case "grid1D":
      if (target.children.length !== 1) {
        return [rootShape, focusPath]; // failed to unwrap, return unchanged rootShape
      } else {
        const child = target.children[0];
        return replaceShape(rootShape, focusPath, child);
      }
    case "circle":
      return [rootShape, focusPath]; // return unchanged rootShape
    case "empty":
      return [rootShape, focusPath]; // return unchanged rootShape
  }
}

// make it grid1D specific, and the root component have context-specific hotkey branches?
export function changeChildrenSize(
  rootShape: Shape,
  focusPath: Path,
  numChildren: number
): [Shape, Path] {
  const target = findShape(rootShape, focusPath);
  if (!target) {
    return [rootShape, focusPath]; // failed to find target, return unchanged rootShape
  }

  switch (target.shapeType) {
    case "grid1D":
      const newTraget = changeGrid1DSize(target, numChildren);
      return replaceShape(rootShape, focusPath, newTraget);
    case "circle":
      return [rootShape, focusPath]; // return unchanged rootShape
    case "empty":
      return [rootShape, focusPath]; // return unchanged rootShape
  }
}

// make it grid1D specific, and the root component have context-specific hotkey branches?
export function setTrackSizeAt(
  rootShape: Shape,
  focusPath: Path,
  trackSize: TrackSize
): [Shape, Path] {
  const parentPath = getParentPath(focusPath);
  const parent = findShape(rootShape, parentPath);
  if (!parent) {
    return [rootShape, focusPath]; // failed to find target, return unchanged rootShape
  }

  switch (parent.shapeType) {
    case "grid1D":
      const targetId = pathEnd(focusPath);
      const newParent = setTrackSize(parent, targetId, trackSize);
      const [newRootShape] = replaceShape(rootShape, parentPath, newParent);
      return [newRootShape, focusPath];
    case "circle":
      return [rootShape, focusPath]; // return unchanged rootShape
    case "empty":
      return [rootShape, focusPath]; // return unchanged rootShape
  }
}

/////////////////////////////////////////////////////////////////
// Empty functions
/////////////////////////////////////////////////////////////////

export function createEmptyShape(): EmptyShape {
  const id = crypto.randomUUID();

  return {
    shapeType: "empty",
    id: id,
  };
}

/////////////////////////////////////////////////////////////////
// Circle functions
/////////////////////////////////////////////////////////////////

export function createCircle(radiusPx: number): CircleShape {
  const id = crypto.randomUUID();

  return {
    shapeType: "circle",
    id: id,
    radiusPx: radiusPx,
  };
}

/////////////////////////////////////////////////////////////////
// Shape functions
/////////////////////////////////////////////////////////////////

export function copyShape<S extends Shape>(s: S): S {
  switch (s.shapeType) {
    case "circle":
      return { ...s };
    case "empty":
      return { ...s };
    case "grid1D":
      return {
        ...s,
        children: s.children.map(copyShape),
      };
  }
}

export function shallowCopyShape<S extends Shape>(s: S): S {
  return { ...s };
}

export function copyGrid1D(s: Grid1DShape): Grid1DShape {
  return {
    ...s,
    children: s.children.map(copyShape),
  };
}
