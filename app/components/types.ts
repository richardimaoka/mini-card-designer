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
  id: string;
  radius: number;
  focused?: boolean;
};

export type Rectangle = {
  shapeType: "rectangle";
  id: string;
  width: number;
  height: number;
  focused?: boolean;
};

export type Square = {
  shapeType: "square";
  id: string;
  sideLength: number;
  focused?: boolean;
};

export type Card = {
  shapeType: "card";
  id: string;
  focused?: boolean;
  children: {
    shape: Shape;
    focused?: boolean;
  }[];
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
  return { shapeType: "circle", id: crypto.randomUUID(), radius: 30 };
}

export function defaultSquare(): Square {
  return { shapeType: "square", id: crypto.randomUUID(), sideLength: 30 };
}

export function defaultRectangle(): Rectangle {
  return {
    shapeType: "rectangle",
    id: crypto.randomUUID(),
    width: 120,
    height: 30,
  };
}

export function defaultCard(child: Shape): Card {
  return {
    shapeType: "card",
    id: crypto.randomUUID(),
    children: [{ shape: child }],
  };
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
        children: s.children.map((c) => ({
          focased: c.focused,
          shape: copyShape(c.shape),
        })),
      };
  }
}
