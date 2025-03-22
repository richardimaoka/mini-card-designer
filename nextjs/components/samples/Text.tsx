import styles from "./Text.module.css";

type Props = {
  text: string;
};

export function Text(props: Props) {
  return <div className={styles.component}>{props.text}</div>;
}
