import styles from "./SourceCodeViewer.module.css";
import {
  CircleShape,
  EmptyShape,
  Grid1DShape,
  Shape,
} from "../shapes/definitions/shapes";

function innerSwitch(
  shape: Shape,
  indentLevel: number,
  indentBeginning: boolean
): string {
  switch (shape.shapeType) {
    case "grid1D":
      return grid1D(shape, indentLevel, indentBeginning);
    case "circle":
      return circle(shape, indentLevel, indentBeginning);
    case "empty":
      return empty(shape, indentLevel, indentBeginning);
  }
}

function empty(
  shape: EmptyShape,
  indentLevel: number,
  indentBeginning: boolean
): string {
  const indent = "  ".repeat(indentLevel);
  return indent + `<div className={styles.component}>empty</div>`;
}

function circle(
  shape: CircleShape,
  indentLevel: number,
  indentBeginning: boolean
): string {
  const indent = "  ".repeat(indentLevel);
  return indent + `<div className={styles.component}>circle</div>`;
}

function grid1D(
  shape: Grid1DShape,
  indentLevel: number,
  indentBeginning: boolean
): string {
  const indent = "  ".repeat(indentLevel);

  const childrenLines = "";
  //  shape.children.map((x) =>
  //   innerSwitch(x, indentLevel, indentBeginning)
  // );

  const lines = [
    `<div className={styles.component}>`,
    ...childrenLines,
    `</div>`,
  ];

  return lines
    .map((l, i) => (i !== 0 || indentBeginning ? indent + l : l))
    .join("\n");
}

type Props = {
  rootShape: Shape;
};

export function SourceCodeViewer(props: Props) {
  function childrenString(
    shape: Shape,
    indentLevel: number,
    indentBeginning: boolean = false
  ): string {
    switch (shape.shapeType) {
      case "grid1D":
        return grid1D(shape, indentLevel, indentBeginning);
      default:
        return "unavailable";
    }
  }

  const lines = [
    `import styles from "./Component.module.css"`, //
    ``,
    `type Props = {}`,
    ``,
    `export function Component(props: Props) {`,
    `  return (`,
    `    <div className={styles.component}>`,
    `      ${childrenString(props.rootShape, 3)}`,
    `    </div>`,
    `  )`,
    `}`,
  ];

  const sourceCodeString = lines.join("\n");

  return (
    <div className={styles.component}>
      <pre>
        <code>{sourceCodeString}</code>
      </pre>
    </div>
  );
}
