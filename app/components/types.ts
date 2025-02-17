export type Mode = "horizontal" | "vertical";
export type NumItems = "2" | "3";
// | "4" | "5" | "6" | "7" | "8";
export type Shape =
  | "circle"
  | "square"
  | "rectangle"
  | "square-rounded"
  | "rectangle-rounded";

export type Circle = {
  shape: "circle";
  radius: number;
};

export type Rectangle = {
  shape: "rectangle";
  width: number;
  height: number;
};

export type Square = {
  shape: "square";
  sideLength: number;
};

export type Card = {
  shape: "card";
  sideLength: number;
  children: ShapeStruct[];
};

export type ShapeStruct = Square | Circle | Rectangle | Card;

export function sw(s: ShapeStruct): number {
  switch (s.shape) {
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
