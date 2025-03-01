import styles from "./SourceCodeViewer.module.css";
import { Grid1DShape, Shape } from "../shapes/definitions/shapes";

type Props = {
  rootShape: Shape;
};

function Grid1DJSX(
  shape: Grid1DShape,
  indentLevel: number,
  indentBeginning: boolean = false
): string {
  const indent = "  ".repeat(indentLevel);

  const childrenLines = shape.children.map(
    (x) => `<div className={styles.component}></div>`
  );

  const lines = [
    `<div className={styles.component}>`,
    ...childrenLines,
    `</div>`,
  ];

  return lines
    .map((l, i) => (i !== 0 || indentBeginning ? indent + l : l))
    .join("\n");
}

export function SourceCodeViewer(props: Props) {
  function childrenString(
    shape: Shape,
    indentLevel: number,
    indentBeginning: boolean = false
  ): string {
    switch (shape.shapeType) {
      case "grid1D":
        return Grid1DJSX(shape, indentLevel, indentBeginning);
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
    `      ${childrenString(props.rootShape, 4)}`,
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
