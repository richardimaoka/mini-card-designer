import { Path } from "./path";

export type trackSize = "auto" | "1fr";

export type Padding = {
  topPx: number;
  bottomPx: number;
  leftPx: number;
  rightPx: number;
};

export type Contanier1DShape = {
  shapeType: "container1D";
  id: string;

  direction: "vertical" | "horizontal";
  trackSizes: trackSize[];

  padding: Padding;
  gapPx: number;

  backgroundColor: "white" | "#e6e6e6";

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
  path: Path;
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
