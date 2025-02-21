import path from "path";

export type Path = string[];

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
