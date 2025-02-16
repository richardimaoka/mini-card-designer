import { Mode, NumItems } from "../types";

type Props = {
  mode: Mode;
  numItems: NumItems;
};

function compare(p1: Props, p2: Props) {
  return p1.mode === p2.mode && p1.numItems === p2.numItems;
}

function compareAll(p: Props) {
  const p1: Props = { mode: "vertical", numItems: "3" };
  const p2: Props = { mode: "vertical", numItems: "2" };
  if (compare(p1, p)) {
    return 1;
  }
}
