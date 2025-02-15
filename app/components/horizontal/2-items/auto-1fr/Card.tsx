import styles from "./Card.module.css";

type Props = {};

export function Card(props: Props) {
  return (
    <div className={styles.component}>
      <div style={{ width: "30px", height: "30px" }}></div>
      <div style={{ height: "30px" }}></div>
    </div>
  );
}
