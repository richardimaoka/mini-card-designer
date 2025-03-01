import styles from "./Component.module.css";

type Props = {};

export function Component(props: Props) {
  return (
    <div className={styles.component}>
      <div className={styles.component}>
        <div className={styles.component}>
          <div className={styles.component}>empty</div>
          <div className={styles.component}>empty</div>
          <div className={styles.component}>
            <div className={styles.component}>empty</div>
            <div className={styles.component}>empty</div>
            <div className={styles.component}>empty</div>
            <div className={styles.component}>empty</div>
            <div className={styles.component}>empty</div>
            <div className={styles.component}>empty</div>
            <div className={styles.component}>empty</div>
            <div className={styles.component}>empty</div>
            <div className={styles.component}>empty</div>
          </div>
        </div>
        <div className={styles.component}>empty</div>
        <div className={styles.component}>empty</div>
      </div>
    </div>
  );
}
