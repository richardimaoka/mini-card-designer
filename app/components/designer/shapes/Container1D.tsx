import { CSSProperties, JSX } from "react";
import { Circle } from "./Circle";
import styles from "./Container1D.module.css";
import {
  Contanier1DShape,
  FocusProps,
  NestProps,
  pathAppend,
  pathMatched,
  Shape,
} from "./definitions/shapes";
import { Empty } from "./Empty";

type InnerSwitchProps = Shape & FocusProps & NestProps;

// InnerSwitch component has to be in the same file as Container1DHorizontal/Vertical
// Otherwise, mutual import (i.e. cyclic reference) error.
export function InnerSwitch(props: InnerSwitchProps): JSX.Element {
  switch (props.shapeType) {
    case "circle":
      return <Circle {...props} />;
    case "empty":
      return <Empty {...props} />;
    case "container1D":
      return <Container1D {...props} />;
  }
}

function gridStyles(shape: Contanier1DShape): CSSProperties {
  switch (shape.direction) {
    case "horizontal":
      return {
        gridTemplateColumns: `${shape.trackSizes.join(" ")}`,
        columnGap: `${shape.gapPx}px`,
      };
    case "vertical":
      return {
        gridTemplateRows: `${shape.trackSizes.join(" ")}`,
        rowGap: `${shape.gapPx}px`,
      };
  }
}

type Container1DProps = Contanier1DShape & FocusProps & NestProps;

export function Container1D(props: Container1DProps) {
  const path = pathAppend(props.parentPath, props.id);
  const focused = props.focusPath && pathMatched(path, props.focusPath);

  const border = focused
    ? "solid 2px yellow"
    : props.nestLevel > 1
    ? "dashed 2px grey"
    : undefined;

  return (
    <div
      className={styles.component}
      style={{
        ...gridStyles(props),

        width: `${props.widthPx}px`,
        height: `${props.heightPx}px`,

        paddingTop: `${props.padding.topPx}px`,
        paddingBottom: `${props.padding.bottomPx}px`,
        paddingLeft: `${props.padding.leftPx}px`,
        paddingRight: `${props.padding.rightPx}px`,

        backgroundColor: props.backgroundColor,
        border: border,
      }}
    >
      {props.children.map((childShape) => {
        return (
          // <div className={styles.temp}>
          <InnerSwitch
            key={childShape.id}
            {...childShape}
            parentPath={path}
            focusPath={props.focusPath}
            nestLevel={props.nestLevel + 1}
          />
          // </div>
        );
      })}
    </div>
  );
}
