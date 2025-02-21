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
