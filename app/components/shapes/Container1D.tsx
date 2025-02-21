import { JSX } from "react";
import { Circle } from "./Circle";
import styles from "./Container1D.module.css";
import { pathAppend, pathMatched } from "./definitions/path";
import { Contanier1DShape, FocusProps, Shape } from "./definitions/shapes";

type InnerSwitchProps = Shape & FocusProps;

// InnerSwitch component has to be in the same file as Container1DHorizontal/Vertical
// Otherwise, mutual import (i.e. cyclic reference) error.
export function InnerSwitch(props: InnerSwitchProps): JSX.Element {
  switch (props.shapeType) {
    case "circle":
      return <Circle {...props} />;
    case "container1D":
      switch (props.direction) {
        case "horizontal":
          return <Container1DHorizontal {...props} />;
        case "vertical":
          return <Container1DVertical {...props} />;
      }
  }
}

type Container1DProps = Contanier1DShape & FocusProps;

export function Container1DHorizontal(props: Container1DProps) {
  const focused = props.focusPath && pathMatched(props.path, props.focusPath);

  return (
    <div
      className={styles.component}
      style={{
        gridTemplateColumns: `${props.trackSizes.join(" ")}`,
        columnGap: `${props.gapPx}px`,

        paddingTop: `${props.padding.topPx}px`,
        paddingBottom: `${props.padding.bottomPx}px`,
        paddingLeft: `${props.padding.leftPx}px`,
        paddingRight: `${props.padding.rightPx}px`,

        backgroundColor: props.backgroundColor,
      }}
    >
      {props.children.map((childShape) => {
        const childPath = pathAppend(props.path, childShape.id);
        return (
          <InnerSwitch key={childShape.id} {...childShape} path={childPath} />
        );
      })}
    </div>
  );
}

export function Container1DVertical(props: Container1DProps) {
  const focused = props.focusPath && pathMatched(props.path, props.focusPath);

  return (
    <div
      className={styles.component}
      style={{
        gridTemplateRows: `${props.trackSizes.join(" ")}`,
        rowGap: `${props.gapPx}px`,

        paddingTop: `${props.padding.topPx}px`,
        paddingBottom: `${props.padding.bottomPx}px`,
        paddingLeft: `${props.padding.leftPx}px`,
        paddingRight: `${props.padding.rightPx}px`,

        backgroundColor: props.backgroundColor,
      }}
    >
      {props.children.map((childShape) => {
        const childPath = pathAppend(props.path, childShape.id);
        return (
          <InnerSwitch key={childShape.id} {...childShape} path={childPath} />
        );
      })}
    </div>
  );
}
