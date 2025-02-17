export type Mode = "horizontal" | "vertical";
export type NumItems = "2" | "3";
// | "4" | "5" | "6" | "7" | "8";
export type ShapeNameOriginal =
  | "circle"
  | "square"
  | "rectangle"
  | "square-rounded"
  | "rectangle-rounded";

export type Circle = {
  shapeType: "circle";
  radius: number;
};

export type Rectangle = {
  shapeType: "rectangle";
  width: number;
  height: number;
};

export type Square = {
  shapeType: "square";
  sideLength: number;
};

export type Card = {
  shapeType: "card";
  children: Shape[];
};

export type Shape = Square | Circle | Rectangle | Card;

export function sw(s: Shape): number {
  switch (s.shapeType) {
    case "rectangle":
      return s.height;
    case "circle":
      return s.radius;
    case "square":
      return s.sideLength;
    case "card":
      return 0;
  }
}

export function defaultCircle(): Circle {
  return { shapeType: "circle", radius: 30 };
}

export function defaultSquare(): Square {
  return { shapeType: "square", sideLength: 30 };
}

export function defaultRectangle(): Rectangle {
  return { shapeType: "rectangle", width: 120, height: 30 };
}

export function defaultCard(child: Shape): Card {
  return { shapeType: "card", children: [child] };
}

export function copyShape(s: Shape): Shape {
  switch (s.shapeType) {
    case "rectangle":
    case "circle":
    case "square":
      return { ...s };
    case "card":
      return {
        ...s,
        children: s.children.map(copyShape),
      };
  }
}
