import { ReactNode } from "react";
import styles from "./Card.module.css";

type Props = {
  child1?: ReactNode;
  child2?: ReactNode;
  child3?: ReactNode;
};

export function Card(props: Props) {
  return (
    <div className={styles.component}>
      {props.child1 || <div style={{ width: "30px", height: "30px" }}></div>}
      {props.child2 || <div style={{ width: "30px", height: "30px" }}></div>}
      {props.child3 || <div style={{ width: "30px" }}></div>}
    </div>
  );
}
