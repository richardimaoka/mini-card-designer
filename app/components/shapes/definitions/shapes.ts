export type Path = string[];

export type trackSize = "auto" | "1fr";

export type Padding = {
  topPx: number;
  bottomPx: number;
  leftPx: number;
  rightPx: number;
};

export type Direction = "vertical" | "horizontal";

export type BgColor = "white" | "#e6e6e6";

export type Contanier1DShape = {
  shapeType: "container1D";
  id: string;

  direction: Direction;
  trackSizes: trackSize[];

  widthPx?: number;
  heightPx?: number;

  padding: Padding;
  gapPx: number;

  backgroundColor?: BgColor;

  children: Shape[];
};

export type CircleShape = {
  shapeType: "circle";
  id: string;
  radiusPx: number;
};
// type Square = {};

// type Square = {};
// type Card1dHorizontal = {};
// type Card1dVertical = {};
// type Card2d
// type List

export type Shape = CircleShape | Contanier1DShape;
export type StandaloneShape = CircleShape;
export type ContainerShape = Contanier1DShape;

export type FocusProps = {
  parentPath: Path;
  focusPath?: Path;
};

type ShapeModel = {
  root: Contanier1DShape;
  focus?: Path;
};

function replace(model: ShapeModel, path: Path, shape: Shape) {}
function append(model: ShapeModel, path: Path, shape: Shape) {}
function prefix(model: ShapeModel, path: Path, shape: Shape) {}
function insert(model: ShapeModel, path: Path, at: number, shape: Shape) {}
function remove(model: ShapeModel, path: Path, at: number, shape: Shape) {}
function focus(model: ShapeModel, path: Path) {}

// replace to Circle, Rectangle, Square, Card...

function replace1(container: Contanier1DShape, at: number, shape: Shape) {}
function wrap(shape: Shape) {}

/////////////////////////////////////////////////////////////////
// Path functions
/////////////////////////////////////////////////////////////////

export function pathAppend(path: Path, pathElement: string) {
  return [...path, pathElement];
}

export function pathMatched(path1: Path, path2: Path) {
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
        case "container1D":
          const child = shape.children.find((c) => c.id === remainingPath[1]);
          return child;
        case "circle":
          return undefined;
      }
    default:
      switch (shape.shapeType) {
        case "container1D":
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

export function parentPath(path: Path): Path {
  const newPath = [...path];
  newPath.pop();
  return newPath;
}

export function focusInside(path: Path, rootShape: Shape): Path {
  const shape = findShape(rootShape, path);
  if (!shape) {
    return path; // not found, return the unchanged path
  }

  switch (shape.shapeType) {
    case "container1D":
      const childInside = shape.children[0];
      return [...path, childInside.id];
    case "circle":
      return path;
  }
}

export function focusOutside(path: Path, shape: Shape): Path {
  if (path.length <= 1) {
    return path;
  } else {
    return parentPath(path);
  }
}

export function focusNext(path: Path, rootShape: Shape): Path {
  const parent = findShape(rootShape, parentPath(path));

  if (!parent) {
    return path; // not found, return the unchanged path
  }

  switch (parent.shapeType) {
    case "container1D":
      const pathEnd = path[path.length - 1];
      const currentIndex = parent.children.findIndex((c) => c.id === pathEnd);

      if (currentIndex < parent.children.length - 1) {
        const next = parent.children[currentIndex + 1];
        return [...parentPath(path), next.id];
      } else {
        return path; // no more next child, return the unchanged path
      }
    case "circle":
      return path; // parent is not container (impossible?) return the unchanged path
  }
}

export function focusPrev(path: Path, rootShape: Shape): Path {
  const parent = findShape(rootShape, parentPath(path));

  if (!parent) {
    return path; // not found, return the unchanged path
  }

  switch (parent.shapeType) {
    case "container1D":
      const pathEnd = path[path.length - 1];
      const currentIndex = parent.children.findIndex((c) => c.id === pathEnd);

      if (0 < currentIndex) {
        const prev = parent.children[currentIndex - 1];
        return [...parentPath(path), prev.id];
      } else {
        return path; // no prev child, return the unchanged path
      }
    case "circle":
      return path; // parent is not container (impossible?) return the unchanged path
  }
}

/////////////////////////////////////////////////////////////////
// Container1D  functions
/////////////////////////////////////////////////////////////////

export function createContainer1D(
  direction: Direction,
  bgColor: BgColor,
  children: Shape[]
): Contanier1DShape {
  const id = crypto.randomUUID();

  return {
    shapeType: "container1D",
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

export function updateContainerWidth(
  shape: Contanier1DShape,
  widthPx: number
): Contanier1DShape {
  const updatedShape = copyContainer1D(shape);
  updatedShape.widthPx = widthPx;

  return updatedShape;
}

export function updateContainerHeight(
  shape: Contanier1DShape,
  heightPx: number
): Contanier1DShape {
  const updatedShape = copyContainer1D(shape);
  updatedShape.heightPx = heightPx;

  return updatedShape;
}

export function updateContainerWidthHeight(
  shape: Contanier1DShape,
  widthPx: number,
  heightPx: number
): Contanier1DShape {
  const updatedShape = copyContainer1D(shape);
  updatedShape.widthPx = widthPx;
  updatedShape.heightPx = heightPx;

  return updatedShape;
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

export function copyShape(s: Shape): Shape {
  switch (s.shapeType) {
    case "circle":
      return { ...s };
    case "container1D":
      return {
        ...s,
        children: s.children.map(copyShape),
      };
  }
}

export function copyContainer1D(s: Contanier1DShape): Contanier1DShape {
  return {
    ...s,
    children: s.children.map(copyShape),
  };
}
