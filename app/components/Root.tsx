import styles from "./Root.module.css";
import { Container1DHorizontal } from "./shapes/Container1D";
import { Contanier1DShape } from "./shapes/definitions/shapes";

type Props = {};

export function Root(props: Props) {
  const rootShape: Contanier1DShape = {
    shapeType: "container1D",
    direction: "horizontal",

    id: "a",
    trackSizes: ["auto"],

    padding: {
      topPx: 8,
      bottomPx: 8,
      leftPx: 8,
      rightPx: 8,
    },

    gapPx: 8,

    backgroundColor: "white",

    children: [
      {
        shapeType: "circle",
        id: "b",
        radiusPx: 16,
      },
    ],
  };

  return (
    <div className={styles.component}>
      <Container1DHorizontal {...rootShape} path={[]} />
    </div>
  );
}
