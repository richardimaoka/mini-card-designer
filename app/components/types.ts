export type CircleShape = {
  shapeType: "circle";
  id: string;
  radius: number;
};

export type RectangleShape = {
  shapeType: "rectangle";
  id: string;
  width: number;
  height: number;
};

export type SquareShape = {
  shapeType: "square";
  id: string;
  sideLength: number;
};

export type CardShape = {
  shapeType: "card";
  id: string;
  focused?: boolean;
  children: Shape[];
};

export type Shape = SquareShape | CircleShape | RectangleShape | CardShape;

export function createCircle(): CircleShape {
  return { shapeType: "circle", id: crypto.randomUUID(), radius: 30 };
}

export function createSquare(): SquareShape {
  return { shapeType: "square", id: crypto.randomUUID(), sideLength: 30 };
}

export function createRectangle(): RectangleShape {
  return {
    shapeType: "rectangle",
    id: crypto.randomUUID(),
    width: 120,
    height: 30,
  };
}

export function crateCard(child: Shape): CardShape {
  return {
    shapeType: "card",
    id: crypto.randomUUID(),
    children: [child],
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
        children: s.children.map(copyShape),
      };
  }
}
