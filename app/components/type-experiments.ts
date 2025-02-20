type Path = string[];

type Circle = {};
type Square = {};
type Contanier1D = {};

// type Square = {};
// type Card1dHorizontal = {};
// type Card1dVertical = {};
// type Card2d
// type List

type Shape = Circle | Square | Contanier1D;
type StandaloneShape = Circle | Square;
type ContainerShape = Contanier1D;

type ShapeModel = {
  root: Contanier1D;
  focus?: Path;
};

function replace(model: ShapeModel, path: Path, shape: Shape) {}
function append(model: ShapeModel, path: Path, shape: Shape) {}
function prefix(model: ShapeModel, path: Path, shape: Shape) {}
function insert(model: ShapeModel, path: Path, at: number, shape: Shape) {}
function remove(model: ShapeModel, path: Path, at: number, shape: Shape) {}
function focus(model: ShapeModel, path: Path) {}

// replace to Circle, Rectangle, Square, Card...

function replace1(container: Contanier1D, at: number, shape: Shape) {}
function wrap(shape: Shape) {}
