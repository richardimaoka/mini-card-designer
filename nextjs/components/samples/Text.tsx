import styles from "./Text.module.css";

type Props = {
  text: string;
  color?: string;
};

export function Text(props: Props) {
  const color = props.color || "black";

  return (
    <div className={styles.component} style={{ color: color }}>
      {props.text}
    </div>
  );
}
