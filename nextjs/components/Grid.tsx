import styles from "./Grid.module.css";
import { Text } from "./samples/Text";

type Props = {
  text: string;
};

export function Grid(props: Props) {
  return (
    <div className={styles.component}>
      <Text text={props.text} />
      {/* <Square />
      <Rectangle />
      <Square />
      <Square /> */}
    </div>
  );
}
